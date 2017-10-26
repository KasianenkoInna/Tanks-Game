'use strict';

const Tank = require('../Tank');

module['exports'] = class TankArmy
{
    constructor()
    {
        this._tanks = new Set();
    }

    /**
    * @param {Tank} tank
    *
    * @returns {boolean}
    */
    add(tank)
    {
        if (false === tank instanceof Tank) {
        throw new Error('instance of Tank expected');
        }

        this._tanks.add(tank);

        return true;
    }

    /**
    * @param {Tank} tank
    *
    * @returns {boolean}
    */
    removeTank(tank)
    {
        if (false === tank instanceof Tank) {
        throw new Error('instance of Tank expected');
        }

        return this._tanks.delete(tank);
    }

    /**
    * @returns {Tank[]}
    */
    getTanks()
    {
        return this._tanks.values();
    }

    /**
    * @returns {Number}
    */
    getSize()
    {
        return this._tanks.size;
    }

    moveLeft()
    {
        this._tanks.forEach(tank => tank.moveLeft());
    }

    moveRight()
    {
        this._tanks.forEach(tank => tank.moveRight());
    }

    /**
    * @returns {Number|null}
    */
    getMaxX()
    {
        if (0 >= this.getSize()) {
            return null;
        }

        return Array.from(this._tanks).reduce((a, tank) => { return a.getX() > tank.getX() ? a : tank }).getX();
    }

    /**
    * @returns {Number|null}
    */
    getMinX()
    {
        if (0 >= this.getSize()) {
            return null;
        }

        return Array.from(this._tanks).reduce((a, tank) => { return a.getX() < tank.getX() ? a : tank }).getX();
    }

    /**
    * @returns {Number|null}
    */
    getMinY()
    {
        if (0 >= this.getSize()) {
            return null;
        }

        return Array.from(this._tanks).reduce((a, tank) => { return a.getY() < tank.getY() ? a : tank }).getY();
    }

    /**
    * @returns {Number|null}
    */
    getMaxY()
    {
        if (0 >= this.getSize()) {
            return null;
        }

        return Array.from(this._tanks).reduce((a, tank) => { return a.getY() > tank.getY() ? a : tank }).getY();
    }
};
