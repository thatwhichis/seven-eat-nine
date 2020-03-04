"use strict";

// HANDLER FOR CREATION, MOVEMENT, AND DELETION OF BULLETS

var BulletManager = BulletManager || {}

BulletManager.a_bullets;
BulletManager.i_bullets;

BulletManager.fu_Initialize = function () {

    BulletManager.a_bullets = [];
    BulletManager.i_bullets = 0;

    Log('Bullets Initialized');
}

BulletManager.fu_Update = function () {

    // ADD TO BULLET ARRAYS BASED ON CONTROL INPUT
    if ((Control.a_buttons[Constants.BU_A] || Control.a_buttons[Constants.BU_Q]) && (Control.a_buttons[Constants.BU_W] || Control.a_buttons[Constants.BU_Z])) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(-1, -1));
    } else if ((Control.a_buttons[Constants.BU_W] || Control.a_buttons[Constants.BU_Z]) && Control.a_buttons[Constants.BU_D]) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(1, -1));
    } else if (Control.a_buttons[Constants.BU_D] && Control.a_buttons[Constants.BU_S]) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(1, 1));
    } else if (Control.a_buttons[Constants.BU_S] && (Control.a_buttons[Constants.BU_A] || Control.a_buttons[Constants.BU_Q])) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(-1, 1));
    } else if (Control.a_buttons[Constants.BU_A] || Control.a_buttons[Constants.BU_Q]) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(-1, 0));
    } else if (Control.a_buttons[Constants.BU_W] || Control.a_buttons[Constants.BU_Z]) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(0, -1));
    } else if (Control.a_buttons[Constants.BU_D]) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(1, 0));
    } else if (Control.a_buttons[Constants.BU_S]) {
        BulletManager.fu_AddBullet(Player.i_x, Player.i_y, new Vec(0, 1));
    }

    // UPDATE BULLETS (REVERSE ITERATION FOR EASY REMOVAL)
    for (var i = BulletManager.i_bullets - 1; i >= 0; i--) {

        // SPLICE OUT DEAD BULLETS 
        if (BulletManager.a_bullets[i].b_delflag) {
            BulletManager.a_bullets.splice(i, 1);
            BulletManager.i_bullets--;
        } else {
            // UPDATE IF NOT FLAGGED FOR REMOVAL
            BulletManager.a_bullets[i].fu_Update();
        }
    }
}

// FUNCTION TO ADD A NEW BULLET
BulletManager.fu_AddBullet = function (x, y, v) {

    BulletManager.i_bullets++;
    BulletManager.a_bullets.push(new Bullet(x, y, v));
}
