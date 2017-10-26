'use strict';

const AbstractTestCase = require('js-unit-test');
const TankFactory = require('../src/Tank/Factory/TankFactory');
const TankArmy = require('../src/Tank/Army/TankArmy');

module['exports'] = class TankArmyTest extends AbstractTestCase
{
    testAramy()
    {
        let tankFactory = new TankFactory();
        let tank1 = tankFactory.create('test.jpg', 'wunded.jpg', 2, 4, 5);
        let tank2 = tankFactory.create('test.jpg', 'wunded.jpg', 6, 8, 5);
        let tankArmy = new TankArmy();

        tankArmy.add(tank1);
        tankArmy.add(tank2)

        this.assertIsObject(tankArmy.getTanks());
        this.assertCount(2, tankArmy.getTanks());
        this.assertEquals(2, tankArmy.getSize());

        this.assertEquals(2, tankArmy.getMinX());
        this.assertEquals(6, tankArmy.getMaxX());
        this.assertEquals(4, tankArmy.getMinY());
        this.assertEquals(8, tankArmy.getMaxY());

        this.assertEquals(true, tankArmy.removeTank(tank1));
        this.assertEquals(false, tankArmy.removeTank(tank1));
        this.assertEquals(1, tankArmy.getSize());
        this.assertCount(1, tankArmy.getTanks());

        this.assertEquals(true, tankArmy.removeTank(tank2));
        this.assertEquals(false, tankArmy.removeTank(tank2));
        this.assertEquals(0, tankArmy.getSize());
        this.assertCount(0, tankArmy.getTanks());
    }
};
