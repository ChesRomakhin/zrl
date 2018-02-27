import ROT from 'rot-js';
import Entity from "./index";

export default class Player extends Entity {

    constructor(game, x, y) {
        super(game, x, y, '@', '#FF0');
    }

    act() {
        this._game.engine.lock();

        window.addEventListener('keydown', this);
    }

    _checkBox () {
        const key = this._x + "," + this._y;
        if (this._game.map[key] !== "*") {
            alert("There is no box here!");
        } else if (key === this._game.ananas) {
            alert("Hooray! You found an ananas and won this game.");
            this._game.engine.lock();
            window.removeEventListener("keydown", this);
        } else {
            alert("This box is empty :-(");
        }
    }

    handleEvent(e) {
        const keyMap = {};
        keyMap[38] = 0;
        keyMap[33] = 1;
        keyMap[39] = 2;
        keyMap[34] = 3;
        keyMap[40] = 4;
        keyMap[35] = 5;
        keyMap[37] = 6;
        keyMap[36] = 7;

        const code = e.keyCode;

        if (code === 13 || code === 32) {
            this._checkBox();
            return;
        }

        if (!(code in keyMap)) {
            return;
        }

        const diff = ROT.DIRS[8][keyMap[code]];
        const newX = this._x + diff[0];
        const newY = this._y + diff[1];

        const newKey = newX + "," + newY;
        if (!(newKey in this._game.map)) {
            return; /* cannot move in this direction */
        }

        this._x = newX;
        this._y = newY;
        this._game._drawWholeMap();
        window.removeEventListener("keydown", this);
        this._game.engine.unlock();
    }

}