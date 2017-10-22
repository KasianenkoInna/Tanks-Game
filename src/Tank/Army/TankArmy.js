'use strict';

const Tank = require('../Tank');

module['exports'] = class TankArmy
{
  constructor()
  {
      this._tanks = new Set();
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

      this._tanks.add(tank);

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

      return this._tanks.delete(tank);
  }

  /**
  * @returns {Tank[]}
  */
  getTanks()
  {
      return this._tanks.values();
  }

  /**
  * @returns {Number}
  */
  getSize()
  {
      return this._tanks.size;
  }
};
