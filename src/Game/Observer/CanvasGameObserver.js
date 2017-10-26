'use strict';

const AbstractGameObserver = require('./AbstractGameObserver');
const Game = require('../Game');

module['exports'] = class CanvasGameObserver extends AbstractGameObserver
{
    /**
    * @param {HTMLCanvasElement} canvas
    */
    constructor(canvas)
    {
        super();
        this._canvas = canvas;
    }

    /**
    * @param {CanvasRenderingContext2D} context
    */
    _getContext2D()
    {
        return this._canvas.getContext('2d');
    }

    /**
    * @param {Number} x
    * @param {Number} y
    * @param {Number} width
    * @param {Number} height
    */
    _clearCanvasSector(x, y, width, height)
    {
        this._getContext2D().clearRect(x, y, width, height);
    }

    _clearWholeCanvas()
    {
        this._clearCanvasSector(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
    * @param {Tank} tank
    */
    _drawTank(tank)
    {
        let context = this._getContext2D();
        let image = new Image();
        image.src = tank.getImg();
        image.onload = function () {
            context.drawImage(image, tank.getX(), tank.getY());
        };
    }

    /**
    * @param {FireBall} fireBall
    */
    _drawFireBall(fireBall)
    {
        this._getContext2D().fillStyle = fireBall.getColor();
        this._getContext2D().beginPath();
        this._getContext2D().arc(fireBall.getX(), fireBall.getY(), fireBall.getRadius(), 0, Math.PI * 2, false);
        this._getContext2D().fill();
    }

    /**
    * @param {Game} game
    * @param {String} model
    * @protected
    */
    update(game, model)
    {
        if (false === game instanceof Game) {
          throw new Error('game must be instanceof Game');
        }

        switch(model) {
            case 'deletTank':
                this._clearCanvasSector(0, 0, this._canvas.width, this._canvas.height/2);
                for(let tank of game.getEnemyArmy().getTanks()) {
                    this._drawTank(tank);
                }
                return;
            case 'updateAll':
                this._clearWholeCanvas();
                this._drawTank(game.getPlayerTank());
                for(let tank of game.getEnemyArmy().getTanks()) {
                    this._drawTank(tank);
                }

                return;
            case 'updatePlayerTank':
                let tank = game.getPlayerTank();
                this._clearCanvasSector(tank.getSaveX(), tank.getSaveY(), 50, 60);
                this._drawTank(tank);
                return;
            case 'updateEnemyArmy':
                for(let tank of game.getEnemyArmy().getTanks()) {
                    this._clearCanvasSector(tank.getSaveX(), tank.getSaveY(), 50, 60);
                    this._drawTank(tank);
                }
                return;
            case 'updateFifeBall':
                for(let ball of game.getFireBalls()) {
                    this._clearCanvasSector(ball.getX() - ball.getRadius(), ball.getY() + ball.getSpeed(), ball.getRadius()*2, ball.getRadius()*2);
                    this._drawFireBall(ball);
                }
                return;
            default:
                break;
        }

        throw new Error(`Mode ${model} not supported`);
    }
};
