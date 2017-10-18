'use strict';

const AbstractTestCase = require('js-unit-test');
const TankFactory = require('../src/Tank/Factory/TankFactory');
const TankArmy = require('../src/Tank/Army/TankArmy');

module['exports'] = class TankArmyTest extends AbstractTestCase
{
    testAramy()
    {
        let tankFactory = new TankFactory();
        let tank1 = tankFactory.create('test.jpg', 1, 1, 5);
        let tank2 = tankFactory.create('test.jpg', 2, 2, 5);
        let tankArmy = new TankArmy();

        this.assertEquals(true, tankArmy.add(tank1));
        this.assertEquals(false, tankArmy.add(tank1));
        this.assertEquals(true, tankArmy.add(tank2));
        this.assertEquals(false, tankArmy.add(tank2));

        let tanks = tankArmy.getTanks();

        this.assertIsObject(tanks);
        this.assertEquals(true, tanks instanceof Array);

        this.assertEquals(2, tanks.length);
        this.assertEquals(true, tankArmy.removeTank(tank1));
        this.assertEquals(false, tankArmy.removeTank(tank1));
        this.assertEquals(1, tankArmy.getTanks().length);

        this.assertEquals(true, tankArmy.removeTank(tank2));
        this.assertEquals(false, tankArmy.removeTank(tank2));
        this.assertEquals(0, tankArmy.getTanks().length);
    }
};
