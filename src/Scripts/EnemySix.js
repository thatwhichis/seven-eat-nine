"use strict";

// CLOSURE FOR ENEMY OBJECTS

var EnemySix = function (pos) {

    this.b_delflag = false;
    this.i_refreshrate = Constants.I_REFRESHRATE_ENEMY;
    this.i_x_old = this.i_x = pos.i_x;
    this.i_y_old = this.i_y = pos.i_y;
    this.s_type = Constants.TYPE.I_ENEMY;
    this.vec = new Vec(Player.i_x > this.i_x ? 1 : -1, Player.i_y > this.i_y ? 1 : -1);

    // CALLED FROM THE ENEMY MANAGEMENT OBJECT 
    this.fu_Update = function () {

        // SLOW THE ENEMY DOWN (ONE FOURTH BULLET SPEED)
        if (this.i_refreshrate <= 1) {

            // STORE LAST POSITION FOR COLLISION CHECKS
            this.i_x_old = this.i_x;
            this.i_y_old = this.i_y;

            // ADJUST VECTOR TOWARD PLAYER
            this.vec = new Vec(Player.i_x > this.i_x ? 1 : -1, Player.i_y > this.i_y ? 1 : -1);

            // UPDATE ENEMY POSITION
            this.i_x += this.vec.i_x;
            this.i_y += this.vec.i_y;

            this.fu_CheckCollision();

            this.i_refreshrate = Constants.I_REFRESHRATE_ENEMY;
        } else {

            this.i_refreshrate--;
        }

        // CLAMP ENEMIES TO MAP 
        this.fu_Clamp();

        // UPDATE MAP TO REFLECT ENEMY MOVEMENT UNLESS FLAGGED FOR DELETION
        if (!this.b_delflag) {

            Map.a_matrix[this.i_y - 1][this.i_x - 1] = Objects.S_ENEMYSIX;
        }
    }

    // FUNCTION TO CLAMP ENEMIES TO MAP
    this.fu_Clamp = function () {

        if (this.i_x < 2 ||
            this.i_y < 2 ||
            this.i_x > Constants.I_MAP_COLUMNS - 1 ||
            this.i_y > Constants.I_MAP_ROWS - 1) {

            this.b_delflag = true;
        }
    }

    this.fu_CheckCollision = function () {

        // CHECK COLLISION WITH OTHER ENEMIES
        if (Map.a_matrix[this.i_y - 1][this.i_x - 1] == Objects.S_ENEMYSIX || Map.a_matrix[this.i_y - 1][this.i_x - 1] == Objects.S_ENEMYFIVE) {
            this.i_x = this.i_x_old;
            this.i_y = this.i_y_old;
        }

        // CHECK COLLISION WITH CIVILIANS
        CivilianManager.fu_CheckCollision(this);
    }
}
