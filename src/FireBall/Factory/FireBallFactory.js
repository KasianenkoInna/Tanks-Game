'use strict';

const FireBall = require('../FireBall');

module['exports'] = class FireBallFactory
{
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @param {String} color
     * @param {Number} speed
     *
     * @returns {FireBall}
     */
    create(x, y, radius, color, speed)
    {
        return new FireBall(x, y, radius, color, speed);
    }
};
