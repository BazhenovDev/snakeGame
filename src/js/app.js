import {Game} from "./modules/game.js";

class App {

    settings = {
        positionsCount: 30,
        positionsSize: 20,
    }

    constructor() {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', (this.settings.positionsCount * this.settings.positionsSize).toString());
        canvas.setAttribute('height', (this.settings.positionsCount * this.settings.positionsSize).toString());
        document.getElementById('container').append(canvas);

        const context = canvas.getContext('2d');

        new Game(context, this.settings);
    }

}

(new App());