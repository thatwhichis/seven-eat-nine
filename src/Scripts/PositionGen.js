"use strict";

// FUNCTION TO GET APPROPRIATELY RANDOM POSITIONS
var PositionGen = function (s_quad) {
    switch (s_quad) {
        case Constants.QUAD.I_LEFT:
            this.i_x = Math.floor(((Math.random() * (Constants.I_MAP_COLUMNS - 2)) + 2) / 3);
            this.i_y = Math.floor((Math.random() * (Constants.I_MAP_ROWS - 2)) + 2);
            break;
        case Constants.QUAD.I_UP:
            this.i_x = Math.floor((Math.random() * (Constants.I_MAP_COLUMNS - 2)) + 2);
            this.i_y = Math.floor(((Math.random() * (Constants.I_MAP_ROWS - 2)) + 2) / 3);
            break;
        case Constants.QUAD.I_RIGHT:
            this.i_x = Math.floor(((Math.random() * (Constants.I_MAP_COLUMNS - 2)) + 2) / 3 + (Constants.I_MAP_COLUMNS * 2 / 3));
            this.i_y = Math.floor((Math.random() * (Constants.I_MAP_ROWS - 2)) + 2);
            break;
        case Constants.QUAD.I_DOWN:
            this.i_x = Math.floor((Math.random() * (Constants.I_MAP_COLUMNS - 2)) + 2);
            this.i_y = Math.floor(((Math.random() * (Constants.I_MAP_ROWS - 2)) + 2) / 3 + (Constants.I_MAP_ROWS * 2 / 3));
            break;
    }
}
