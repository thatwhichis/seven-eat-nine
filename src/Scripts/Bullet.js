"use strict";

// CLOSURE FOR BULLET OBJECTS

var Bullet = function (x, y, v) {

    this.b_delflag = false;
    this.i_x = x;
    this.i_y = y;
    this.s_type = Constants.TYPE.I_BULLET;
    this.vec = v;

    // CALLED FROM THE BULLET MANAGEMENT OBJECT 
    this.fu_Update = function () {

        // UPDATE BULLET POSITION
        this.i_x += this.vec.i_x;
        this.i_y += this.vec.i_y;

        this.b_delflag = EnemyManager.fu_CheckCollision(this);

        // CLAMP BULLETS TO CAMERA AND MAP AND FLAG FOR REMOVAL
        this.fu_Clamp();
        
        // UPDATE MAP TO REFLECT BULLET MOVEMENT UNLESS FLAGGED FOR DELETION
        if (!this.b_delflag) {
            Map.a_matrix[this.i_y - 1][this.i_x - 1] = Objects.S_BULLET;
        }
    }

    // FUNCTION TO CLAMP BULLETS TO CAMERA AND MAP AND FLAG FOR REMOVAL
    this.fu_Clamp = function () {
        if (this.i_x < 2 ||
            this.i_y < 2 ||
            this.i_x < Camera.i_x ||
            this.i_y < Camera.i_y ||
            this.i_x > Constants.I_MAP_COLUMNS ||
            this.i_y > Constants.I_MAP_ROWS ||
            this.i_x > Camera.i_x + Constants.I_CAMERA_ZOOM * 2 ||
            this.i_y > Camera.i_y + Constants.I_CAMERA_ZOOM * 2) {
                this.b_delflag = true;
        }
    }

}
