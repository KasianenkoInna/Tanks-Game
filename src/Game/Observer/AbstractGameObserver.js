'use strict';

module['exports'] = class AbstractGameObserver
{
    /**
    * @param {Game} game
    * @protected
    */
    update(game, changes)
    {
        throw new Error('Not implemented!');
    }

    /**
    * @param {Game} game
    */
    notifyGameStateChanged(game, changes)
    {
        this.update(game, changes);
    }
};
