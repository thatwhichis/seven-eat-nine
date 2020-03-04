"use strict";

// CLOSURE FOR CIVILIAN OBJECTS

var CivilianNine = function (pos) {

    this.b_delflag = false;
    this.i_refreshrate = Constants.I_REFRESHRATE_CIVILIAN;
    this.i_x = pos.i_x;
    this.i_y = pos.i_y;
    this.s_type = Constants.TYPE.I_CIVILIAN;
    this.vec = new Vec(Math.random() < 0.5 ? 1 : -1, Math.random() < 0.5 ? 1 : -1);

    // CALLED FROM THE CIVILIAN MANAGEMENT OBJECT 
    this.fu_Update = function () {

        // SLOW THE CIVILIAN DOWN (ONE EIGHTH BULLET SPEED)
        if (this.i_refreshrate <= 1) {

            // UPDATE CIVILIAN POSITION
            this.i_x += this.vec.i_x;
            this.i_y += this.vec.i_y;

            this.i_refreshrate = Constants.I_REFRESHRATE_ENEMY;
        } else {
            this.i_refreshrate--;
        }

        // CLAMP CIVILIAN TO MAP 
        this.fu_Clamp();

        // UPDATE MAP TO REFLECT CIVILIAN MOVEMENT UNLESS FLAGGED FOR DELETION
        if (!this.b_delflag) {
            Map.a_matrix[this.i_y - 1][this.i_x - 1] = Objects.S_CIVILIANNINE;
        }
    }

    // FUNCTION TO CLAMP CIVILIANS TO MAP
    this.fu_Clamp = function () {
        if (this.i_x < 3) { this.vec.i_x = 1; }
        if (this.i_y < 3) { this.vec.i_y = 1; } 
        if (this.i_x > Constants.I_MAP_COLUMNS - 1) { this.vec.i_x = -1; }
        if (this.i_y > Constants.I_MAP_ROWS - 1) { this.vec.i_y = -1; }
    }

}
