"use strict";

var Constants = Constants || {};

Constants.B_DEBUG = true;
Constants.F_FPS = 30;

// LEFT, UP, RIGHT, DOWN, A, W, D, S, Q, Z, R
// INCLUDE Q, Z FOR ALTERNATE KEYBOARD LAYOUTS
Constants.BUTTONS = [37, 38, 39, 40, 65, 87, 68, 83, 81, 90, 82];
Constants.BU_LEFT = 0;
Constants.BU_UP = 1;
Constants.BU_RIGHT = 2;
Constants.BU_DOWN = 3;
Constants.BU_A = 4;
Constants.BU_W = 5;
Constants.BU_D = 6;
Constants.BU_S = 7;
Constants.BU_Q = 8;
Constants.BU_Z = 9;
Constants.BU_R = 10;

Constants.I_CAMERA_ZOOM = 20;
Constants.I_MAP_ROWS = 50;
Constants.I_MAP_COLUMNS = 50;
Constants.I_NUM_CIVILIANS = 10;
Constants.I_NUM_ENEMIES_SIX = 40;
Constants.I_NUM_ENEMIES_FIVE = 20;
Constants.I_REFRESHRATE_PLAYER = 2;
Constants.I_REFRESHRATE_CIVILIAN = 16;
Constants.I_REFRESHRATE_ENEMY = 8;
Constants.I_SCORE_ENEMY = 10;
Constants.I_SCORE_CIVILIAN = 50;

// AVOID 0 CASE IN ENUMERATIONS FOR JS COMPARISON EDGE CASES
Constants.QUAD = {
    I_UP: 1,
    I_RIGHT: 2,
    I_DOWN: 3,
    I_LEFT: 4
}

Constants.STATE = {
    I_START: 1,
    I_COUNT: 2,
    I_RUNNING: 3,
    I_WIN: 4,
    I_OVER: 5
}

Constants.TYPE = {
    I_PLAYER: 1,
    I_BULLET: 2,
    I_CIVILIAN: 3,
    I_ENEMY: 4
}
