'use strict';

const AbstractTestCase = require('js-unit-test');
const FireBallFactory = require('../src/FireBall/Factory/FireBallFactory');

module['exports'] = class FireBallFactoryTest extends AbstractTestCase
{
    testFactory()
    {
        let fireBallFactory = new FireBallFactory();
        let x = 1;
        let y = 100;
        let radius = 5;
        let color = 'red'
        let speed = 5;

        let fireBall = fireBallFactory.create(x, y, radius, color, speed);
        this.assertIsObject(fireBall);
        this.assertEquals(x, fireBall.getX());
        this.assertEquals(y, fireBall.getY());
        this.assertEquals(radius, fireBall.getRadius());
        this.assertEquals(color, fireBall.getColor());
        this.assertEquals(speed, fireBall.getSpeed());
    }

    testFireBall()
    {
      let fireBallFactory = new FireBallFactory();
      let fireBall = fireBallFactory.create(200, 200, 5, 'green', 5);

      this.assertIsObject(fireBall);
      this.assertEquals(200, fireBall.getX());
      this.assertEquals(200, fireBall.getY());
      this.assertEquals(5, fireBall.getRadius());
      this.assertEquals(5, fireBall.getSpeed());
      this.assertIsString(fireBall.getColor());
      this.assertEquals('green', fireBall.getColor());
    }
};
