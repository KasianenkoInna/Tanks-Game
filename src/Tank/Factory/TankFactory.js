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
    create(img, x, y, speed)
    {
        return new Tank(img, x, y, speed);
    }
};
