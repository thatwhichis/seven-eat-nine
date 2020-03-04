"use strict";

// TODO - FIX TRIAGE
var UI = UI || {};

UI.a_score;
UI.i_count;
UI.i_count_timer;
UI.i_score;
UI.i_x_score;
UI.i_y_score;
UI.s_count;
UI.s_score;

UI.a_over;
UI.i_x_over;
UI.i_y_over;
UI.s_over;

UI.a_start;
UI.i_x_start;
UI.i_y_start;
UI.s_start;

UI.a_restart;
UI.i_x_restart;
UI.i_y_restart;
UI.s_restart;

UI.fu_Initialize = function () {
    UI.a_score = [];
    UI.a_over = [];
    UI.a_start = [];
    UI.a_restart = [];
    UI.i_score = 0;
    UI.s_start = "PRESS R TO START";
    UI.s_restart = "PRESS R TO RESTART";
    UI.s_over = "GAME OVER ";
    UI.s_score = "Score: 0";
    UI.i_x_over = 0;
    UI.i_y_over = 0;
    UI.i_x_score = 0;
    UI.i_y_score = 0;
    UI.i_x_start = 0;
    UI.i_y_start = 0;
    UI.i_x_restart = 0;
    UI.i_y_restart = 0;

    UI.fu_Start();

    Log('UI Initialized');
}

UI.fu_Start = function () {

    UI.i_count = 3;
    // TODO - MOVE TO CONSTANTS
    UI.i_count_timer = 90;
    UI.s_count = UI.i_count + " ";
}

UI.fu_Update = function () {
    
    // UPDATE SCORE
    UI.fu_UpdateScore();

    // UPDATE USER STATE NOTIFICATION ELEMENTS
    UI.fu_UpdateStatus();
}

UI.fu_UpdateScore = function () {

    UI.s_score = "Score: " + UI.i_score; 

    if (UI.s_score.length % 2) { UI.s_score = UI.s_score + " " }

    UI.i_y_score = Camera.i_y + 1;
    UI.i_x_score = Math.floor((Camera.i_x + Constants.I_CAMERA_ZOOM) - (UI.s_score.length / 4));

    UI.a_score = UI.s_score.match(/.{1,2}/g);

    for (var i = 0; i < UI.a_score.length; i++) {
        Map.a_matrix[UI.i_y_score][UI.i_x_score + i] = UI.a_score[i];
    }
}

UI.fu_UpdateStatus = function () {

    switch (Elements.s_state) {

        case Constants.STATE.I_START:

            UI.i_y_start = Camera.i_y + Constants.I_CAMERA_ZOOM - 4;
            UI.i_x_start = Math.floor((Camera.i_x + Constants.I_CAMERA_ZOOM) - (UI.s_start.length / 4));

            UI.a_start = UI.s_start.match(/.{1,2}/g);

            for (var i = 0; i < UI.s_start.length / 2; i++) {
                Map.a_matrix[UI.i_y_start][UI.i_x_start + i + 1] = UI.a_start[i];
            }

            break;

        case Constants.STATE.I_COUNT:

            UI.i_count_timer--;

            if (UI.i_count_timer > 60) {
                UI.s_count = "3 ";
            } else if (UI.i_count_timer > 30) {
                UI.s_count = "2 ";
            } else if (UI.i_count_timer > 0) {
                UI.s_count = "1 ";
            } else if (UI.i_count_timer <= 0) {
                Elements.fu_SetState(Constants.STATE.I_RUNNING);
            }

            Map.a_matrix[Constants.I_MAP_ROWS / 2 - 4][Constants.I_MAP_COLUMNS / 2] = UI.s_count;

            break;

        case Constants.STATE.I_OVER:

            UI.i_y_over = Camera.i_y + Constants.I_CAMERA_ZOOM;
            UI.i_x_over = Math.floor((Camera.i_x + Constants.I_CAMERA_ZOOM) - (UI.s_over.length / 4));

            UI.i_y_restart = Camera.i_y + Constants.I_CAMERA_ZOOM - 4;
            UI.i_x_restart = Math.floor((Camera.i_x + Constants.I_CAMERA_ZOOM) - (UI.s_restart.length / 4));

            UI.a_over = UI.s_over.match(/.{1,2}/g);
            UI.a_restart = UI.s_restart.match(/.{1,2}/g);

            for (var i = 0; i < UI.s_over.length / 2; i++) {
                Map.a_matrix[UI.i_y_over][UI.i_x_over + i + 1] = UI.a_over[i];
            }

            for (var i = 0; i < UI.s_restart.length / 2; i++) {
                Map.a_matrix[UI.i_y_restart][UI.i_x_restart + i + 1] = UI.a_restart[i];
            }

            break;
    }
}

UI.fu_AddEnemyScore = function () {

    // SCORES MULTIPLY BY ROUND - LONGER GAMES MEAN HIGHER SCORES
    UI.i_score += (Constants.I_SCORE_ENEMY * Elements.i_round);
}

UI.fu_AddCivilianScore = function () {

    // SCORES MULTIPLY BY ROUND - LONGER GAMES MEAN HIGHER SCORES
    UI.i_score += (Constants.I_SCORE_CIVILIAN * Elements.i_round);
}
