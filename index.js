(function(global) {
    'use strict';

    const Game = require('./src/Game/Game');
    const TankFactory = require('./src/Tank/Factory/TankFactory');
    const TankArmyFactory = require('./src/Tank/Army/Factory/TankArmyFactory');
    const CanvasGameObserver = require('./src/Game/Observer/CanvasGameObserver');

    const KEY_CODE_ARROW_UP = 38;
    const KEY_CODE_ARROW_RIGHT = 39;
    const KEY_CODE_ARROW_LEFT = 37;

    class TanksGame
    {
        /**
        * @param {Game} game
        * @param {String} version
        */
        constructor(game, version)
        {
            this._game = game;
            this._version = version;
        }

        /**
        * @param {String} canvasHtmlId
        *
        * @returns {HTMLStylElement}
        */
        _createStyle(canvasHtmlId) {
            let style = document.createElement('style');
            style.appendChild(
                document.createTextNode(
                    `#${canvasHtmlId} {background-color: #c3e05e; padding: 20px;}`
                )
            );

            return style;
        };

        /**
        * @param {String} canvasHtmlId
        * @param {Number} width
        * @param {Number} height
        *
        * @returns {HTMLCanvasElement}
        */
        _createCanvas(canvasHtmlId, width, height) {
            let canvas = document.createElement('canvas');
            canvas.setAttribute('id', canvasHtmlId);
            canvas.setAttribute('width', `${width}px`);
            canvas.setAttribute('height', `${height}px`);

            return canvas;
        };

        _attachEventHandlers()
        {
            let game = this._game;
            window.onkeydown = function(e) {
                switch (e.keyCode) {
                    case KEY_CODE_ARROW_UP:
                        game.shoot();
                        break;
                    case KEY_CODE_ARROW_LEFT:
                        game.movePlayerTankToLeft();
                        break;
                    case KEY_CODE_ARROW_RIGHT:
                        game.movePlayerTankToRight();
                        break;
                    default:
                        break;
                }
                //requestAnimationFrame(window.onkeydown);
            };

            window.onkeyup = function() {
                // @todo implement for smoot tank flow
            };
        }

        /**
        * @param {String} canvasHtmlId
        */
        init(canvasHtmlId)
        {
            if (false === ('string' === typeof canvasHtmlId)) {
                console.warn('Provide  {String} <html #Id> for tank game Screen');
                return;
            }

            let canvas = this._createCanvas(canvasHtmlId, this._game.getWidth(), this._game.getHeight());
            document.getElementsByTagName('head')[0].appendChild(this._createStyle(canvasHtmlId));
            document.body.appendChild(canvas);
            this._game.attachObserver(new CanvasGameObserver(canvas));
            this._attachEventHandlers();
            this._game.start();
        };
    }

    let tankFactory = new TankFactory();
    let tankArmyFactory = new TankArmyFactory();
    let playerTank = tankFactory.create('tank.png', 'tank_fire.png', 0, 500, 5, 1);
    let enemyArmy = tankArmyFactory.create('tank.png', 'tank_fire.png', 5, 15, 1);
    let game = new Game(playerTank, enemyArmy);

    global.tanksGame = new TanksGame(game, '0.0.1');


})(window);
