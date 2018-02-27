import ROT from "rot-js";
import Player from "./entity/Player";
import Pedro from "./entity/Pedro";
import Renderer from "./renderer";

export default class Game {

    constructor(domNode) {
        this.domNode = domNode;
    }

    getMap() {
        return this.map;
    }

    getEntities() {
        return this.entities;
    }

    _generateMap() {
        this.map = {};
        const digger = new ROT.Map.Digger(this.width, this.height);
        const freeCells = [];

        const digCallback = (x, y, value) => {
            if (value) {
                return;
            }
            /* do not store walls */

            const key = x + "," + y;
            freeCells.push(key);
            this.map[key] = ".";
        };
        digger.create(digCallback);

        this._generateBoxes(freeCells);
        this.entities = [];
        this.entities.push(this._createEntity(Player, freeCells));
        this.entities.push(this._createEntity(Pedro, freeCells));
    };

    _generateBoxes(freeCells) {
        for (let i = 0; i < 10; i++) {
            const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            const key = freeCells.splice(index, 1)[0];
            this.map[key] = "*";
            if (!i) {
                this.ananas = key;
            }
        }
    };

    _createEntity(what, freeCells) {
        const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        const key = freeCells.splice(index, 1)[0];
        const parts = key.split(",");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        return new what(this, x, y);
    }

    _drawWholeMap() {
        this.renderer.render();
    }

    init() {
        this._generateMap();
        this.renderer = new Renderer(this.domNode, () => this.getMap(), () => this.getEntities());

        let scheduler = new ROT.Scheduler.Simple();
        this.entities.forEach((e) => scheduler.add(e, true));
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();

        this.renderer.render();
    }

}