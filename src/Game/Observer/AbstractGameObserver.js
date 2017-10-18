'use strict';

module['exports'] = class AbstractGameObserver
{
    /**
    * @param {Game} game
    * @protected
    */
    update(game)
    {
        throw new Error('Not implemented!');
    }

    /**
    * @param {Game} game
    */
    notifyGameStateChanged(game)
    {
        this.update(game);
    }
};
