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
    * @param {Number} tankSpeed
    * @param {Number} tanksQuantity
    *
    * @returns {TankArmy}
    */
    create(tankImg, tankSpeed, tanksQuantity)
    {
        let army = new TankArmy();
        for(let i = 0; i < tanksQuantity; i++){
            let x = (i % 5) * 100;
            let y = Math.floor(i / 5) * 100;
            army.add(this._tankFactory.create(tankImg, x, y, tankSpeed));
        }

        return army;
    }
};
