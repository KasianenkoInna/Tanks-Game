'use strict';

const AbstractTestCase = require('js-unit-test');
const TankFactory = require('../src/Tank/Factory/TankFactory');

module['exports'] = class TankFactoryTest extends AbstractTestCase
{
    testFactory()
    {
        let tankFactory = new TankFactory();
        let img = 'test.jpg';
        let x = 1;
        let y = 1;
        let speed = 5;

        let tank = tankFactory.create(img, x, y, speed);
        this.assertIsObject(tank);
        this.assertEquals(img, tank.getImg());
        this.assertEquals(x, tank.getX());
        this.assertEquals(y, tank.getY());
        this.assertEquals(speed, tank.getSpeed());
    }

    testTank()
    {
      let tankFactory = new TankFactory();
      let tank = tankFactory.create('test.jpg', 1, 1, 5);

      this.assertIsObject(tank);
      this.assertEquals(1, tank.getX());
      tank.moveRight();
      this.assertEquals(6, tank.getX());
      tank.moveRight();
      tank.moveRight();
      this.assertEquals(16, tank.getX());
      tank.moveLeft();
      this.assertEquals(11, tank.getX());
      tank.moveLeft();
      tank.moveLeft();
      this.assertEquals(1, tank.getX());
    }
};
