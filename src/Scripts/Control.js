"use strict";

var Control = Control || {};

Control.a_buttons;

Control.fu_Initialize = function () {

    Control.a_buttons = [];

    for (var i = 0; i < Constants.BUTTONS.length; i++) {
        Control.a_buttons[i] = false;
    }

    Log('Control Initialized');
}

Control.fu_KeyDown = function (e) {

    var event = window.event ? window.event : e;

    for (var i = 0; i < Constants.BUTTONS.length; i++) {
        if (event.keyCode === Constants.BUTTONS[i]) {
            Control.a_buttons[i] = true;
        }
    }
}

Control.fu_KeyUp = function (e) {

    var event = window.event ? window.event : e;

    for (var i = 0; i < Constants.BUTTONS.length; i++) {
        if (event.keyCode === Constants.BUTTONS[i]) {
            Control.a_buttons[i] = false;
        }
    }
}

document.onkeydown = Control.fu_KeyDown;
document.onkeyup = Control.fu_KeyUp;
