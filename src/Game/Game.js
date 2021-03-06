'use strict';

const FireBallFactory = require('../FireBall/Factory/FireBallFactory');
const FireBall = require('../FireBall/FireBall');
const Tank = require('../Tank/Tank');
const TankArmy = require('../Tank/Army/TankArmy');
const AbstractGameObserver = require('./Observer/AbstractGameObserver');

const TANK_HARDCODE_WIDTH = 41;
const TANK_HARDCODE_HEIGHT = 52;

const GAME_FIELD_WIDTH = 900;
const GAME_FIELD_HEIGHT = 600;

module['exports'] = class Game
{
    /**
    * @param {Tank} playerTank
    * @param {TankArmy} enemyArmy
    */
    constructor(playerTank, enemyArmy)
    {
        if (false === playerTank instanceof Tank) {
            throw new Error('playerTank must be instanceof Tank');
        }

        if (false === enemyArmy instanceof TankArmy) {
            throw new Error('enemyArmy must be instanceof TankArmy');
        }

        this._fireBallFactory = new FireBallFactory();
        this._fireBalls = new Set();
        this._playerTank = playerTank;
        this._enemyArmy = enemyArmy;
        this._observers = new Set();
    }

    /**
    * @param {Number}
    */
    getWidth()
    {
        return GAME_FIELD_WIDTH;
    }

    /**
    * @param {Number}
    */
    getHeight()
    {
        return GAME_FIELD_HEIGHT;
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
        return this._fireBalls.values();
    }

    // ****************************** //
    // Game Logic                     //
    // ****************************** //

    start() {
        let directions = [
            this._enemyArmy.moveRight.bind(this._enemyArmy),
            this._enemyArmy.moveLeft.bind(this._enemyArmy)
        ];
        let self = this;

        let moveEnemyArmy = function() {
            if (self._enemyArmy.getMinX() < 0 || self._enemyArmy.getMaxX() > GAME_FIELD_WIDTH) {
                directions.reverse();
            }

            if (self._enemyArmy.getSize() <= 0) {
                return;
            }

            directions[0]();
            self._triggerStateCanged('updateEnemyArmy');

            setTimeout(moveEnemyArmy, 500);
        };

        moveEnemyArmy();
    };

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
    */
    _onTankHited(tank){
        if(tank.isKilled()) {
            this._enemyArmy.removeTank(tank);
            this._triggerStateCanged('deletTank');

            return;
        }

        tank.hit();
        this._triggerStateCanged('updateEnemyArmy');
    }

    /**
    * @param {FireBall} fireBall
    */
    _onFireBallMoved(fireBall)
    {
        for (let tank of this._enemyArmy.getTanks()) {
            if (this._doesFireBallHitTank(tank, fireBall)) {
                fireBall.stop();
                this._onTankHited(tank);
                this._removeFireball(fireBall);

            }
        }

        this._triggerStateCanged('updateFifeBall');
    }

    /**
    * @param {FireBall} fireBall
    *
    * @returns {boolean}
    */
    _removeFireball(fireBall)
    {
        return this._fireBalls.delete(fireBall);
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

        this._fireBalls.add(fireBall);
        let self = this;

        let fireBallWalk = function() {
            fireBall.moveUp();
            self._onFireBallMoved(fireBall);
            if (fireBall.getY() <= 0) {
                fireBall.stop();
            }

            if (true === fireBall.isStopped()) {
                self._removeFireball(fireBall);
                self._triggerStateCanged('updateFifeBall');
                return;
            }

            setTimeout(fireBallWalk, 100);
        };

        fireBallWalk();
    }

    movePlayerTankToRight()
    {
        this._playerTank.moveRight();
        this._triggerStateCanged('updatePlayerTank');
    }

    movePlayerTankToLeft()
    {
        this._playerTank.moveLeft();
        this._triggerStateCanged('updatePlayerTank');
    }

    // ****************************** //
    // Observer Logic                 //
    // ****************************** //

    _triggerStateCanged(changes)
    {
        for(let o of this._observers) {
          o.notifyGameStateChanged(this, changes);
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

        this._observers.add(observer);
        this._triggerStateCanged('updateAll');

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

        return this._observers.delete(observer);
    }
};
