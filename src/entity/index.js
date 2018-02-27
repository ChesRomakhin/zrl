export default class Entity {

    constructor (game, x, y, char, color) {
        this._game = game;
        this._x = x;
        this._y = y;
        this._char = char;
        this._color = color;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    draw(display) {
        display.draw(this._x, this._y, this._char, this._color);
    }

    act() {
    }

}