"use strict";

var Player = Player || {};

Player.i_y;
Player.i_x;
Player.i_refreshrate;
Player.s_type;

Player.fu_Initialize = function () {

    Player.i_y = Constants.I_MAP_ROWS / 2 + 1;
    Player.i_x = Constants.I_MAP_COLUMNS / 2 + 1;
    Player.i_refreshrate = Constants.I_REFRESHRATE_PLAYER;
    Player. s_type = Constants.TYPE.I_PLAYER

    Log('Player Initialized');
}

Player.fu_Update = function () {

    // SLOW THE PLAYER DOWN (HALF BULLET SPEED)
    if (Player.i_refreshrate <= 1) {

        // UPDATE PLAYER POSITION BASED ON CONTROL INPUT
        if (Control.a_buttons[Constants.BU_LEFT]) { Player.i_x-- }
        if (Control.a_buttons[Constants.BU_UP]) { Player.i_y-- }
        if (Control.a_buttons[Constants.BU_RIGHT]) { Player.i_x++ }
        if (Control.a_buttons[Constants.BU_DOWN]) { Player.i_y++ }
    
        Player.i_refreshrate = Constants.I_REFRESHRATE_PLAYER;
    } else {

        Player.i_refreshrate--;
    }

    // CHECK FOR COLLISION WITH INTERESTING OBJECTS
    Player.fu_CheckCollision();

    // CLAMP PLAYER TO MAP EDGES
    Player.fu_Clamp();

    // UPDATE MAP TO REFLECT PLAYER MOVEMENT
    Map.a_matrix[Player.i_y - 1][Player.i_x - 1] = Objects.S_PLAYER;
}

// FUNCTION TO CLAMP PLAYER TO MAP EDGES
Player.fu_Clamp = function () {

    if (Player.i_x < 2) { Player.i_x = 2 }
    if (Player.i_y < 2) { Player.i_y = 2 }
    if (Player.i_x > Constants.I_MAP_COLUMNS) { Player.i_x = Constants.I_MAP_COLUMNS }
    if (Player.i_y > Constants.I_MAP_ROWS) { Player.i_y = Constants.I_MAP_ROWS }
}

Player.fu_CheckCollision = function () {

    CivilianManager.fu_CheckCollision(Player);
    EnemyManager.fu_CheckCollision(Player);
}
