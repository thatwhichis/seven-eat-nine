"use strict"; 

// HANDLER FOR CREATION, MOVEMENT, AND DELETION OF ENEMIES

var CivilianManager = CivilianManager || {}

CivilianManager.a_civilians;
CivilianManager.i_civilians;

CivilianManager.fu_Initialize = function () {
    CivilianManager.a_civilians = [];
    CivilianManager.i_civilians = Constants.I_NUM_CIVILIANS / 4;

    for (var i = 0; i < CivilianManager.i_civilians; i++) {
        CivilianManager.a_civilians.push(new CivilianNine(new PositionGen(Constants.QUAD.I_LEFT)));
        CivilianManager.a_civilians.push(new CivilianNine(new PositionGen(Constants.QUAD.I_UP)));
        CivilianManager.a_civilians.push(new CivilianNine(new PositionGen(Constants.QUAD.I_RIGHT)));
        CivilianManager.a_civilians.push(new CivilianNine(new PositionGen(Constants.QUAD.I_DOWN)));
    }

    CivilianManager.i_civilians = Constants.I_NUM_CIVILIANS;

    Log('Civilians Initialized');
}

CivilianManager.fu_Update = function () {

    // UPDATE CIVILIANS (REVERSE ITERATION FOR EASY REMOVAL)
    for (var i = CivilianManager.i_civilians - 1; i >= 0; i--) {
        // SPLICE OUT DEAD CIVILIANS
        if (CivilianManager.a_civilians[i].b_delflag) {
            CivilianManager.a_civilians.splice(i, 1);
            CivilianManager.i_civilians--;
            if (!CivilianManager.i_civilians) {
                Elements.fu_SetState(Constants.STATE.I_WIN);
            }
        } else {
            // UPDATE IF NOT FLAGGED FOR REMOVAL
            CivilianManager.a_civilians[i].fu_Update();
        }
    }
}

// FUNCTION TO PARSE CIVILIANS FOR COLLISION AND HANDLE CIVILIAN REACTION
CivilianManager.fu_CheckCollision = function (object) {
    this.object = object;
    this.b_collision = false;

    for (var i = CivilianManager.i_civilians - 1; i >= 0; i--) {
        if ((this.object.i_x == CivilianManager.a_civilians[i].i_x && this.object.i_y == CivilianManager.a_civilians[i].i_y) ||
            (this.object.i_x - 1 == CivilianManager.a_civilians[i].i_x && this.object.i_y == CivilianManager.a_civilians[i].i_y) ||
            (this.object.i_x + 1 == CivilianManager.a_civilians[i].i_x && this.object.i_y == CivilianManager.a_civilians[i].i_y) ||
            (this.object.i_x == CivilianManager.a_civilians[i].i_x && this.object.i_y - 1 == CivilianManager.a_civilians[i].i_y) ||
            (this.object.i_x == CivilianManager.a_civilians[i].i_x && this.object.i_y + 1 == CivilianManager.a_civilians[i].i_y)) {
            if (object.s_type == Constants.TYPE.I_PLAYER) {
                // TODO - SOUND?
                CivilianManager.a_civilians[i].b_delflag = true;
                UI.fu_AddCivilianScore();
            } else if (object.s_type == Constants.TYPE.I_ENEMY) {
                // TODO HEALTH--;
                // TODO - SOUND?
                CivilianManager.a_civilians[i].b_delflag = true;
            }
            this.b_collision = true;
        }
    }
    return this.b_collision;
}
