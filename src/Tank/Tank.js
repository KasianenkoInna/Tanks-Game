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
        this._saveX = x;
        this._saveY = y;
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

    getSaveX()
    {
        return this._saveX;
    }

    getSaveY()
    {
        return this._saveY;
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
        this._saveX = this._x;
        this._x += this._speed;
    }

    moveLeft()
    {
        this._saveX = this._x;
        this._x -= this._speed;
    }
};
