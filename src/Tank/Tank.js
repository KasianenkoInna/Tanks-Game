'use strict';

module['exports'] = class Tank
{
    constructor(img, woundedImg, x, y, speed, lifesCount)
    {
        this._img = img;
        this._woundedImg = woundedImg;
        this._x = x;
        this._y = y;
        this._speed = speed;
        this._lifesCount = lifesCount;
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

    hit()
    {
        this._lifesCount -= 1;
        this._img = this._woundedImg;
    }

    isKilled()
    {
        return this._lifesCount <= 0;
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
