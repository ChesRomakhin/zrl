import ROT from 'rot-js';

export default class Renderer {

    constructor(domNode, mapFunction, entitiesFunction) {
        this.domNode = domNode;

        this.getMap = mapFunction;
        this.getEntities = entitiesFunction;

        let {innerHeight,innerWidth} = window;
        this.height = Math.floor(innerHeight / 16);
        this.width = Math.floor(innerWidth / 16);

        this.display = new ROT.Display({
            width: this.width,
            height: this.height,
            fontSize: 16,
            forceSquareRatio: true,
            fontFamily: 'Square'
        });

        domNode.appendChild(this.display.getContainer());
    }

    render() {
        this.display.clear();

        const map = this.getMap();

        for (let key in map) {
            let parts = key.split(",");
            let x = parseInt(parts[0]);
            let y = parseInt(parts[1]);
            this.display.draw(x, y, map[key]);
        }

        const entities = this.getEntities();

        entities.forEach((entity) => {
            entity.draw(this.display);
        });
    }

}