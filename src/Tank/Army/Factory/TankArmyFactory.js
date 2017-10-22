'use strict';

const TankArmy = require('../TankArmy');
const TankFactory = require('../../Factory/TankFactory');

module['exports'] = class TankArmyFactory
{
    constructor()
    {
        this._tankFactory = new TankFactory();
    }

    /**
    * @param {String} tankImg
    * @param {String} woundedImg
    * @param {Number} tankSpeed
    * @param {Number} tanksQuantity
    * @param {Number} lifesCount
    * @returns {TankArmy}
    */
    create(tankImg, woundedImg, tankSpeed, tanksQuantity, lifesCount)
    {
        let army = new TankArmy();
        for(let i = 0; i < tanksQuantity; i++){
            let x = (i % 5) * 100;
            let y = Math.floor(i / 5) * 100;
            army.add(this._tankFactory.create(tankImg, woundedImg, x, y, tankSpeed, lifesCount));
        }

        return army;
    }
};
