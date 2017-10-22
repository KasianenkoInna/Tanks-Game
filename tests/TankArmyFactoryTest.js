'use strict';

const AbstractTestCase = require('js-unit-test');
const TankArmyFactory = require('../src/Tank/Army/Factory/TankArmyFactory');

module['exports'] = class TankArmyFactoryTest extends AbstractTestCase
{
    testFactory()
    {
        let tankArmyFactory = new TankArmyFactory();
        let tankImg = 'test.jpg';
        let woundedImg = 'test.jpg';
        let speed = 5;
        let armySize = 50;
        let lifesCount = 1;

        let tankArmy = tankArmyFactory.create(tankImg, woundedImg, speed, armySize, lifesCount);
        this.assertIsObject(tankArmy);
        this.assertEquals(armySize, tankArmy.getSize());
        this.assertCount(armySize, tankArmy.getTanks());
        for(let tank of tankArmy.getTanks()) {
            this.assertIsObject(tank);
            this.assertEquals(tankImg, tank.getImg());
        }
    }
};
