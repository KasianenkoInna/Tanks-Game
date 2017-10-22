'use strict';

const AbstractTestCase = require('js-unit-test');
const TankFactory = require('../src/Tank/Factory/TankFactory');

module['exports'] = class TankFactoryTest extends AbstractTestCase
{
    testFactory()
    {
        let tankFactory = new TankFactory();
        let tankImg = 'test.jpg';
        let x = 1;
        let y = 1;
        let tankSpeed = 5;
        let lifesCount = 1;

        let tank = tankFactory.create(tankImg, 'test2.jpg', x, y, tankSpeed, lifesCount);
        this.assertIsObject(tank);
        this.assertEquals(tankImg, tank.getImg());
        this.assertEquals(x, tank.getX());
        this.assertEquals(y, tank.getY());
        this.assertEquals(tankSpeed, tank.getSpeed());
        this.assertIsFalse(tank.isKilled());
    }

    testTankMove()
    {
        let tankFactory = new TankFactory();
        let tank = tankFactory.create('test.jpg', 'test2.jpg', 1, 1, 5, 1);

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

    testTankHit()
    {
        let tankFactory = new TankFactory();
        let tankImg = 'test.jpg';
        let woundedImg = 'wounded.jpg';
        let tankWithOneLife = tankFactory.create(tankImg, woundedImg, 1, 1, 5, 1);

        this.assertIsObject(tankWithOneLife);
        this.assertEquals(tankImg, tankWithOneLife.getImg());
        this.assertIsFalse(tankWithOneLife.isKilled());

        tankWithOneLife.hit();
        this.assertEquals(woundedImg, tankWithOneLife.getImg());
        this.assertIsTrue(tankWithOneLife.isKilled());

        let tankWithThreeLifes = tankFactory.create(tankImg, woundedImg, 1, 1, 5, 3);
        this.assertIsObject(tankWithThreeLifes);
        this.assertEquals(tankImg, tankWithThreeLifes.getImg());
        this.assertIsFalse(tankWithThreeLifes.isKilled());

        tankWithThreeLifes.hit();
        this.assertEquals(woundedImg, tankWithThreeLifes.getImg());
        this.assertIsFalse(tankWithThreeLifes.isKilled());

        tankWithThreeLifes.hit();
        this.assertEquals(woundedImg, tankWithThreeLifes.getImg());
        this.assertIsFalse(tankWithThreeLifes.isKilled());

        tankWithThreeLifes.hit();
        this.assertEquals(woundedImg, tankWithThreeLifes.getImg());
        this.assertIsTrue(tankWithThreeLifes.isKilled());
    }
};
