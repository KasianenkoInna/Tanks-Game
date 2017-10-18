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

    _clearCanvas()
    {
        this._getContext2D().clearRect(0, 0, this._canvas.width, this._canvas.height);
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
    * @protected
    */
    update(game)
    {
        if (false === game instanceof Game) {
          throw new Error('game must be instanceof Game');
        }

        this._clearCanvas();
        this._drawTank(game.getPlayerTank());
        for(let tank of game.getEnemyArmy().getTanks()) {
            this._drawTank(tank);
        }

        for(let ball of game.getFireBalls()) {
            this._drawFireBall(ball);
        }
    }
};
