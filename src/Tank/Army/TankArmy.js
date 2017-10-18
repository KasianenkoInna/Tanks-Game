'use strict';

const Tank = require('../Tank');

module['exports'] = class TankArmy
{
  constructor()
  {
      this._tanks = [];
  }

  /**
  * @param {Tank} tank
  *
  * @returns {boolean}
  */
  add(tank)
  {
      if (false === tank instanceof Tank) {
        throw new Error('instance of Tank expected');
      }

      if (this._tanks.indexOf(tank) >= 0) {
        return false;
      }

      this._tanks.push(tank);

      return true;
  }

  /**
  * @param {Tank} tank
  *
  * @returns {boolean}
  */
  removeTank(tank)
  {
      if (false === tank instanceof Tank) {
        throw new Error('instance of Tank expected');
      }

      let tankIndex = this._tanks.indexOf(tank);
      if (tankIndex < 0) {
        return false;
      }

      this._tanks.splice(tankIndex, 1);

      return true;
  }

  /**
  * @returns {Tank[]}
  */
  getTanks()
  {
      return this._tanks;
  }

  /**
  * @returns {Number}
  */
  getSize()
  {
      return this._tanks.length;
  }
};
