/**
 *
 * Created by Chris 06/16/2016
 *
 * This is the entry point to the entire game application
 *
 * A lot more logic is supposed to be here in order to properly
 * initialize the game but we can figure that out in the future
 *
 */

requirejs.config({
    baseUrl: './js/.',
    paths: {
        collision: 'util/objects/collision',
        constants: 'util/static/constants',
        dialogue: 'util/objects/dialogue',
        game: 'game',
        http: 'util/objects/http',
        interact: 'util/objects/interact',
        interactions: 'config/interactions',
        levels: 'config/levels',
        object: 'entity/object',
        screen: 'util/objects/screen',
        stage: 'entity/stage',
        utility: 'util/static/utility'
    }
});

define(['utility', 'levels', 'game', 'interact', 'screen', 'stage'], function (utility, levels, game, interact, screen, stage) {

    // Initialize D-FRAG game
    var startButton = document.createElement('button');

    utility.waitUntil(utility.domLoaded, [], function() {

        window.scrollTo(0, 0);

        startButton.setAttribute('id', 'start-game');
        startButton.textContent = 'Start Game';
        startButton.innerText = 'Start Game';
        startButton.onclick = function () {
            startButton.parentNode.removeChild(startButton);
            startGame();
        };
        document.body.appendChild(startButton);
    }, []);

    var startGame = function () {

        game.load(levels.load('LEVEL_ONE_INTRODUCTION'));
        utility.waitUntil(game.finishedLoading, [], function () {
            game.play();
            interact.init();
            screen.lockOn(stage.getObject('main-character'));
        }, []);
    };
});