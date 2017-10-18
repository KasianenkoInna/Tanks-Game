'use strict';

module['exports'] = class FireBall
{
    constructor(x, y, radius, color, speed)
    {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
        this._speed = speed;
    }

    getX()
    {
        return this._x;
    }

    getY()
    {
        return this._y;
    }

    getRadius()
    {
        return this._radius;
    }

    getColor()
    {
        return this._color;
    }

    getSpeed()
    {
        return this._speed;
    }

    moveUp()
    {
        this._y -= this._speed;
    }
};
