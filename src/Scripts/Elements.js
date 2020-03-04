"use strict";

// TODO - MOVE AWAY FROM MANAGER PARADIGM
// ALL GAME ACTORS CAN BE GENERIC/SELF MANAGING 
// WITH LIFECYCLE EVENTS CALLED FROM HERE
var Elements = Elements || {}

Elements.i_round;
Elements.s_state;

Elements.fu_Initialize = function () {

    // INITIALIZE CONTROL ARRAYS
    Control.fu_Initialize();

    // INITIALIZE MAP
    Map.fu_Initialize();

    // INITIALIZE GAME ELEMENTS
    Elements.fu_ReInitialize();

    // SET STATE RUNNING
    Elements.fu_SetState(Constants.STATE.I_START);
}

Elements.fu_Update = function () {

    switch (Elements.s_state) {

        case Constants.STATE.I_OVER:

            // UPDATE MAP
            Map.fu_Update();
            
        // FALL THROUGH TO STATE.I_START
        case Constants.STATE.I_START:

            // PLAYER HIT 'R'?
            if (Control.a_buttons[Constants.BU_R]) {
                Elements.fu_ReInitialize();
                Elements.fu_SetState(Constants.STATE.I_COUNT);
            }

            UI.fu_Update();

            break;

        case Constants.STATE.I_WIN:

            // UPDATE MAP
            Map.fu_Update();

            Elements.i_round++;
            Elements.fu_ReStart();
            Elements.fu_SetState(Constants.STATE.I_COUNT);

            break;

        case Constants.STATE.I_RUNNING:

            // UPDATE MAP (FIRST)
            Map.fu_Update();

            // UPDATE PLAYER POSITION
            Player.fu_Update();

            // UPDATE BULLETS
            BulletManager.fu_Update();

            // UPDATE ENEMY
            EnemyManager.fu_Update();

            // UPDATE CIVILIANS
            CivilianManager.fu_Update();

            // UPDATE CAMERA (AFTER MAP AND PLAYER)
            Camera.fu_Update();

            // UPDATE UI (AFTER CAMERA IN STATE.I_RUNNING:)
            UI.fu_Update();

            break;

        case Constants.STATE.I_COUNT:

            // UPDATE MAP
            Map.fu_Update();

            // UPDATE MAP
            UI.fu_Update();

            break;
    }
}

Elements.fu_Draw = function () {

    // CAMERA HANDLES HTML INSERTION
    Camera.fu_Draw();
};

// REINITIALIZE THE ELEMENTS NEEDED TO RESTART THE GAME
Elements.fu_ReInitialize = function () {

    // CALL RESTART
    Elements.fu_ReStart();

    // INITIALIZE UI SYSTEM
    UI.fu_Initialize();

    Elements.i_round = 1;
}

// REINITIALIZE ONLY THE ELEMENTS NEEDED TO RESTART THE ROUND
Elements.fu_ReStart = function () {

    // INITIALIZE PLAYER
    Player.fu_Initialize();

    // INITIALIZE BULLET MANAGER
    BulletManager.fu_Initialize();

    // INITIALIZE ENEMIES (AFTER PLAYER; PLAYER POSITION DEPENDENT)
    EnemyManager.fu_Initialize();

    // INITIALIZE CIVILIANS 
    CivilianManager.fu_Initialize();

    // INITIALIZE CAMERA (AFTER MAP AND PLAYER)
    Camera.fu_Initialize();

    // RESTART UI SYSTEM BUT PRESERVE ROUND DATA
    UI.fu_Start();
}

// STATE CONTROLLER
Elements.fu_SetState = function (s_state) {

    Elements.s_state = s_state;
}
