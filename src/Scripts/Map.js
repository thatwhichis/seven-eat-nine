"use strict";

var Map = Map || {};

Map.a_matrix_master;
Map.a_matrix;

Map.fu_Initialize = function () {

    Map.a_matrix_master = [];
    Map.a_matrix = [];

    Map.fu_GenerateMaster();

    for (var i = 0; i < Map.a_matrix_master.length; i++) {

        Map.a_matrix[i] = [];
        for (var j = 0; j < Map.a_matrix_master[i].length; j++) {

            Map.a_matrix[i][j] = Map.a_matrix_master[i][j];
        }
    }

    Log('Map Initialized');
}

Map.fu_Update = function () {

    for (var i = 0; i < Map.a_matrix_master.length; i++) {
        for (var j = 0; j < Map.a_matrix_master[i].length; j++) {

            Map.a_matrix[i][j] = Map.a_matrix_master[i][j];
        }
    }
}

Map.fu_GenerateMaster = function () {

    for (var i_y = 0; i_y <= Constants.I_MAP_ROWS; i_y++) {

        Map.a_matrix_master[i_y] = [];
        for (var i_x = 0; i_x <= Constants.I_MAP_COLUMNS + 1; i_x++) {

            if (i_x == 0 || i_y == 0 || i_x == Constants.I_MAP_COLUMNS || i_y == Constants.I_MAP_ROWS) {
                Map.a_matrix_master[i_y][i_x] = Objects.S_WALL;
            } else if (i_x == Constants.I_MAP_COLUMNS + 1) {
                Map.a_matrix_master[i_y][i_x] = Objects.S_NLINE;
            } else {
                Map.a_matrix_master[i_y][i_x] = Objects.S_GRASS;
            }
        }
    }

    // ADD A STARTING POINT FOR REFERENCE
    Map.a_matrix_master[Constants.I_MAP_ROWS / 2][Constants.I_MAP_COLUMNS / 2] = Objects.S_START;
}