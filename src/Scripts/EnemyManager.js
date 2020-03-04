"use strict";

// HANDLER FOR CREATION, MOVEMENT, AND DELETION OF ENEMIES

var EnemyManager = EnemyManager || {}

EnemyManager.a_enemies_six;
EnemyManager.i_enemies_six;
EnemyManager.a_enemies_five;
EnemyManager.i_enemies_five;

EnemyManager.fu_Initialize = function () {

    EnemyManager.a_enemies_six = [];
    EnemyManager.a_enemies_five = [];
    EnemyManager.i_enemies_six = Constants.I_NUM_ENEMIES_SIX / 4;
    EnemyManager.i_enemies_five = Constants.I_NUM_ENEMIES_FIVE / 4;

    for (var i = 0; i < EnemyManager.i_enemies_six; i++) {
        EnemyManager.a_enemies_six.push(new EnemySix(new PositionGen(Constants.QUAD.I_LEFT)));
        EnemyManager.a_enemies_six.push(new EnemySix(new PositionGen(Constants.QUAD.I_UP)));
        EnemyManager.a_enemies_six.push(new EnemySix(new PositionGen(Constants.QUAD.I_RIGHT)));
        EnemyManager.a_enemies_six.push(new EnemySix(new PositionGen(Constants.QUAD.I_DOWN)));
    }

    for (var i = 0; i < EnemyManager.i_enemies_five; i++) {
        EnemyManager.a_enemies_five.push(new EnemyFive(new PositionGen(Constants.QUAD.I_LEFT)));
        EnemyManager.a_enemies_five.push(new EnemyFive(new PositionGen(Constants.QUAD.I_UP)));
        EnemyManager.a_enemies_five.push(new EnemyFive(new PositionGen(Constants.QUAD.I_RIGHT)));
        EnemyManager.a_enemies_five.push(new EnemyFive(new PositionGen(Constants.QUAD.I_DOWN)));
    }

     EnemyManager.i_enemies_six = Constants.I_NUM_ENEMIES_SIX;
     EnemyManager.i_enemies_five = Constants.I_NUM_ENEMIES_FIVE;

     Log('Enemies Initialized');
}

EnemyManager.fu_Update = function () {

    // UPDATE ENEMIES (REVERSE ITERATION FOR EASY REMOVAL)
    for (var i = EnemyManager.i_enemies_six - 1; i >= 0; i--) {
        // SPLICE OUT DEAD ENEMIES
        if (EnemyManager.a_enemies_six[i].b_delflag) {
            EnemyManager.a_enemies_six.splice(i, 1);
            EnemyManager.i_enemies_six--;
        } else {
            // UPDATE IF NOT FLAGGED FOR REMOVAL
            EnemyManager.a_enemies_six[i].fu_Update();
        }    
    }
    for (var i = EnemyManager.i_enemies_five - 1; i >= 0; i--) {
        // SPLICE OUT DEAD ENEMIES
        if (EnemyManager.a_enemies_five[i].b_delflag) {
            EnemyManager.a_enemies_five.splice(i, 1);
            EnemyManager.i_enemies_five--;
        } else {
            // UPDATE IF NOT FLAGGED FOR REMOVAL
            EnemyManager.a_enemies_five[i].fu_Update();
        }
    }
}

// FUNCTION TO PARSE ENEMIES FOR COLLISION AND HANDLE ENEMY REACTION
EnemyManager.fu_CheckCollision = function (object) {

    this.object = object;
    this.b_collision = false;

    for (var i = EnemyManager.i_enemies_six - 1; i >= 0; i--) {
        if (this.object.i_x == EnemyManager.a_enemies_six[i].i_x && this.object.i_y == EnemyManager.a_enemies_six[i].i_y) {
            if (object.s_type == Constants.TYPE.I_PLAYER) {
                Elements.fu_SetState(Constants.STATE.I_OVER);
            } else if (object.s_type == Constants.TYPE.I_BULLET) {
                // TODO HEALTH--; ENEMY SELF-FLAGS FOR DELETION
                EnemyManager.a_enemies_six[i].b_delflag = true;
                UI.fu_AddEnemyScore();
            }
            this.b_collision = true;
        }
    }
    for (var i = EnemyManager.i_enemies_five - 1; i >= 0; i--) {
        if (this.object.i_x == EnemyManager.a_enemies_five[i].i_x && this.object.i_y == EnemyManager.a_enemies_five[i].i_y) {
            if (object.s_type == Constants.TYPE.I_PLAYER) {
                Elements.fu_SetState(Constants.STATE.I_OVER);
            }
            this.b_collision = true;
        }
    }

    return this.b_collision;
}
