'use strict';

module['exports'] = class Tank
{
    constructor(img, x, y, speed)
    {
        this._img = img;
        this._x = x;
        this._y = y;
        this._speed = speed;
    }

    getImg()
    {
        return this._img;
    }

    getX()
    {
        return this._x;
    }

    getY()
    {
        return this._y;
    }

    getSpeed()
    {
        return this._speed;
    }

    moveRight()
    {
        this._x += this._speed;
    }

    moveLeft()
    {
        this._x -= this._speed;
    }
};
