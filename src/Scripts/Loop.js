"use strict";

var Loop = Loop || {};

Loop.f_fps;

Loop.fu_Initialize = function () {

    Log('Loop Initializing');

    // INITIALIZE GAME ELEMENTS
    Elements.fu_Initialize();

    // CALC FRAME UPDATE TIME
    Loop.f_fps = 1000 / Constants.F_FPS;

    // SET LOOP UPDATE RUNNING
    Loop.fu_SetRefresh();
    Log('Loop Initialized');
};

Loop.fu_SetRefresh = function () {

    // SET WINDOW REFRESH RATE (DIRTY)
    setInterval(Loop.fu_Update, Loop.f_fps);
}

Loop.fu_Update = function () {

    // UPDATE GAME ELEMENTS
    Elements.fu_Update();

    // DRAW CALL (DIRTY)
    Loop.fu_Draw();
}

Loop.fu_Draw = function () {

    // DRAW GAME ELEMENTS
    Elements.fu_Draw();
};

// SCENE HANDLING
// STRETCH GOAL - AUDIO HANDLER
// STRETCH GOAL - MORE ENEMY TYPES
// STRETCH GOAL - LEADERBOARD?