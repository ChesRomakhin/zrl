import Entity from "./index";
import ROT from 'rot-js';

export default class Pedro extends Entity {

    constructor(game, x, y) {
        super(game, x, y, 'P', 'red');
    }

    act() {
        const x = this._game.getEntities()[0].getX();
        const y = this._game.getEntities()[0].getY();
        const passableCallback = (x, y) => {
            return (x+","+y in this._game.getMap());
        };
        const astar = new ROT.Path.AStar(x, y, passableCallback, {topology:4});

        const path = [];
        const pathCallback = (x, y) => {
            path.push([x, y]);
        };
        astar.compute(this._x, this._y, pathCallback);

        path.shift(); /* remove Pedro's position */
        if (path.length === 1) {
            this._game._drawWholeMap();
            this._game.engine.lock();
            alert("Game over - you were captured by Pedro!");
        } else {
            const x = path[0][0];
            const y = path[0][1];
            this._x = x;
            this._y = y;
            this._game._drawWholeMap();
        }
    }

}