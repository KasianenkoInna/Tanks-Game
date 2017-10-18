'use strict';

const AbstractTestCase = require('js-unit-test');
const TankArmyFactory = require('../src/Tank/Army/Factory/TankArmyFactory');

module['exports'] = class TankArmyFactoryTest extends AbstractTestCase
{
    testFactory()
    {
        let tankArmyFactory = new TankArmyFactory();
        let img = 'test.jpg';
        let speed = 5;
        let armySize = 50;

        let tankArmy = tankArmyFactory.create(img, speed, armySize);
        this.assertIsObject(tankArmy);
        this.assertEquals(50, tankArmy.getSize());

        let armyTanks = tankArmy.getTanks();
        for (let i = 0; i < armyTanks.length; i++) {
          let tank = armyTanks[i];
          this.assertEquals(img, tank.getImg());
          this.assertEquals(speed, tank.getSpeed());
        }
    }
};
