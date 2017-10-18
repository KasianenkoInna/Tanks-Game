'use strict';

const FireBallFactory = require('../FireBall/Factory/FireBallFactory');
const FireBall = require('../FireBall/FireBall');
const Tank = require('../Tank/Tank');
const TankArmy = require('../Tank/Army/TankArmy');
const AbstractGameObserver = require('./Observer/AbstractGameObserver');

const TANK_HARDCODE_WIDTH = 41;
const TANK_HARDCODE_HEIGHT = 52;

module['exports'] = class Game
{
    /**
    * @param {Tank} playerTank
    * @param {TankArmy} enemyArmy
    */
    constructor(playerTank, enemyArmy, canvas)
    {
        if (false === playerTank instanceof Tank) {
            throw new Error('playerTank must be instanceof Tank');
        }

        if (false === enemyArmy instanceof TankArmy) {
            throw new Error('enemyArmy must be instanceof TankArmy');
        }
        this._canvas = canvas;
        this._fireBallFactory = new FireBallFactory();
        this._fireBalls = [];
        this._playerTank = playerTank;
        this._enemyArmy = enemyArmy;

        this._observers = [];
    }

    getPlayerTank()
    {
        return this._playerTank;
    }

    getEnemyArmy()
    {
        return this._enemyArmy;
    }

    /**
    * @param {FireBall[]}
    */
    getFireBalls()
    {
        return this._fireBalls;
    }

    // ****************************** //
    // Game Logic                     //
    // ****************************** //

    _moveEnemyArmy()
    {
        for(let tank in this.getEnemyArmy()){
            if(this.getEnemyArmy()[tank].getX()+10 >= this._canvas.width)
            this.getEnemyArmy()[tank].moveLeft();
            if(this.getEnemyArmy()[tank].getX() < 10)
            this.getEnemyArmy()[tank].moveRight();
        }
    }


    /**
    * @returns {boolean}
    */
    _isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return (x1 < x2 + w2
            && x1 + w1 > x2
            && y1 < y2 + h2
            && h1 + y1 > y2
        );
    }

    /**
    * @param {FireBall} fireBall
    *
    * @returns {boolean}
    */
    _doesFireBallHitTank(tank, fireBall){
        return this._isCollision(
            fireBall.getX(),
            fireBall.getY(),
            fireBall.getRadius() * 2,
            fireBall.getRadius() * 2,
            tank.getX(),
            tank.getY(),
            TANK_HARDCODE_WIDTH,
            TANK_HARDCODE_HEIGHT
        );
    }

    /**
    * @param {Tank} tank
    * @param {FireBall} fireBall
    *
    * @returns {boolean}
    */
    _onTankKilled(tank, fireBall)
    {
        this._enemyArmy.removeTank(tank);
        this._removeFireball(fireBall);
        this._triggerStateCanged();
    }

    /**
    * @param {FireBall} fireBall
    */
    _onFireBallMoved(fireBall)
    {
        this._triggerStateCanged();
        for (let tank of this._enemyArmy.getTanks()) {
            if (this._doesFireBallHitTank(tank, fireBall)) {
                this._onTankKilled(tank, fireBall);
            }
        }
    }

    /**
    * @param {FireBall} fireBall
    *
    * @returns {boolean}
    */
    _removeFireball(fireBall)
    {
        let index = this._fireBalls.indexOf(fireBall);
        if (index < 0) {
          return false;
        }

        this._fireBalls.splice(index, 1);

        return true;
    }

    // ****************************** //
    // Event Related                  //
    // ****************************** //

    shoot()
    {
        let fireBall = this._fireBallFactory.create(
            this._playerTank.getX() + 20,
            this._playerTank.getY() - 15,
            10,
            'yellow',
            5
        );

        this._fireBalls.push(fireBall);
        let self = this;

        let fireBallWalk = function() {
            fireBall.moveUp();
            self._onFireBallMoved(fireBall);
            if (fireBall.getY() <= 0) {
                self._removeFireball(fireBall);
                return;
            }

            setTimeout(fireBallWalk, 200);
        };

        fireBallWalk();
    }

    movePlayerTankToRight()
    {
        this._playerTank.moveRight();
        this._triggerStateCanged();
    }

    movePlayerTankToLeft()
    {
        this._playerTank.moveLeft();
        this._triggerStateCanged();
    }

    // ****************************** //
    // Observer Logic                 //
    // ****************************** //

    _triggerStateCanged()
    {
        for(let o of this._observers) {
          o.notifyGameStateChanged(this);
        }
    }

    /**
    * @param {AbstractGameObserver} observer
    *
    * @returns {boolean}
    */
    attachObserver(observer)
    {
        if (false === observer instanceof AbstractGameObserver) {
          throw new Error('observer must be instanceof AbstractGameObserver');
        }

        let index = this._observers.indexOf(observer);
        if (index >= 0) {
          return false;
        }

        this._observers.push(observer);
        this._triggerStateCanged();

        return true;
    }

    /**
    * @param {AbstractGameObserver} observer
    *
    * @returns {boolean}
    */
    detachObserver(observer)
    {
        if (false === observer instanceof AbstractGameObserver) {
          throw new Error('observer must be instanceof AbstractGameObserver');
        }

        let index = this._observers.indexOf(observer);
        if (index < 0) {
          return false;
        }

        this._observers.splice(index, 1);

        return true;
    }
};
