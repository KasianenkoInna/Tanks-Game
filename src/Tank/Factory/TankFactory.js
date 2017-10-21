'use strict';

const Tank = require('../Tank');

module['exports'] = class TankFactory
{
    /**
     * @param {String }img
     * @param {Number} x
     * @param {Number} y
     * @param {Number} speed
     *
     * @returns {Tank}
     */
    create(tankImg, woundedImg, x, y, tankSpeed, lifesCount)
    {
        return new Tank(tankImg, woundedImg, x, y, tankSpeed, lifesCount);
    }
};
