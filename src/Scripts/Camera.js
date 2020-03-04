"use strict";

var Camera = Camera || {};

Camera.i_y;
Camera.i_x;
Camera.a_matrix;
Camera.s_html;

Camera.fu_Initialize = function () {

    Camera.i_y = Player.i_y - Constants.I_CAMERA_ZOOM - 1;
    Camera.i_x = Player.i_x - Constants.I_CAMERA_ZOOM - 1;

    Log('Camera Initialized');
}

Camera.fu_Update = function () {

    // GET CAMERA COORDS
    Camera.i_y = Player.i_y - Constants.I_CAMERA_ZOOM - 1;
    Camera.i_x = Player.i_x - Constants.I_CAMERA_ZOOM - 1;

    // CLAMP CAMERA TO MAP EDGES
    Camera.fu_Clamp();
}

// HANDLER TO INSERT STRINGIFIED MATRIX INTO HTML; CALLED FROM LOOP
Camera.fu_Draw = function () {

    // FLUSH CAMERA DATA
    Camera.a_matrix = [];

    // STRINGIFY MAP FOR HTML INSERTION
    for (var i_y = Camera.i_y; i_y < Camera.i_y + Constants.I_CAMERA_ZOOM * 2 + 1; i_y++) {
        Camera.a_matrix.push(Objects.S_NLINE);
        for (var i_x = Camera.i_x; i_x < Camera.i_x + Constants.I_CAMERA_ZOOM * 2 + 1; i_x++) {
            Camera.a_matrix.push(Map.a_matrix[i_y][i_x]);
        }
    }
    Camera.s_html = Camera.a_matrix.join('');

    // INSERT HTML
    document.getElementById("canvas").innerHTML = Camera.s_html;
}

// CLAMP CAMERA TO MAP EDGES
Camera.fu_Clamp = function () {
    if (Camera.i_y < 0) { Camera.i_y = 0; }
    if (Camera.i_x < 0) { Camera.i_x = 0; }
    if (Camera.i_x + Constants.I_CAMERA_ZOOM * 2 + 1 > Constants.I_MAP_COLUMNS + 1) {
        Camera.i_x = Constants.I_MAP_COLUMNS - (Constants.I_CAMERA_ZOOM * 2);
    }
    if (Camera.i_y + Constants.I_CAMERA_ZOOM * 2 + 1 > Constants.I_MAP_ROWS + 1) {
        Camera.i_y = Constants.I_MAP_ROWS - (Constants.I_CAMERA_ZOOM * 2);
    }
}
