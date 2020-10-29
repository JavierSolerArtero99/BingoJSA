import './css/style.css';
import { docReady, showModal } from './js/core/core.js';
import './js/card.js';
import { Bombo } from './js/bombo.js';
import { BingoCard } from './js/card.js';
import { PubSub } from './js/core/pubSub.js';
// import { tl as templatePlayers } from './templates/modalPlayers.js'
import { modalPlayer, modalPlayer as ModalPlayer } from './templates/modalPlayers.js'
import { bingoAlert } from './templates/bingoAlert';
import { lineaAlert } from './templates/lineaAlert';

const app = (() => {
    let myApp;
    let bombo;
    let pubSub = new PubSub();
    let cardPlayers = [];
    let stateApp = "stop";
    let players = ["Paco"];

    /* APP */

    let start = () => {
        let modalPlayer = ModalPlayer([addPlayer, startBingo]);
        showModal(modalPlayer.render(), startBingo)
    };

    let startBingo = (layout) => {
        if (players.length > 0) {
            layout.style.display = "none";
            bombo = new Bombo(document.getElementById('balls'));
            stateApp = "run";

            pubSub.subscribe("LINIA", (player) => {
                pubSub.unsubscribe("LINIA");
                stop();
                showModal(lineaAlert(player), function () {
                    myApp = setInterval(play, 20);
                })
            });
            pubSub.subscribe("BINGO", (player) => {
                stop();
                pubSub.unsubscribe("BINGO");
                showModal(bingoAlert(player), function () {
                    let modal = modalPlayer([addPlayer, startBingo]);
                    showModal(modal.render(), app.start)
                    players = []
                })
            });

            for (let i = 0; i < players.length; i++) {
                let newNode = document.createElement('div');
                let className = "bingoCard" + i;
                newNode.classList.add(className);
                document.body.appendChild(newNode);
                cardPlayers.push(new BingoCard(players[i], newNode, pubSub))
            }

            myApp = setInterval(play, 20);
        } else {
            alert("Es necesario añadir algun jugador")
        }
    }

    let play = () => {
        let num = bombo.pickNumber();

        if (num) {
            pubSub.publish("New Number", bombo.getExtractedNumbers());

        } else {
            stop();
        }
    };

    let stop = () => {
        stateApp = "stop";
        clearInterval(myApp);
    };

    /* BINGO UTILS */

    let addPlayer = (newPlayer, clearNewPlayer) => {
        players.push(newPlayer)
        clearNewPlayer();
    }

    return {
        start: start,
        toggle: () => {
            (stateApp == "run") ? stop() : start();
        },
    };

})();

docReady(app.start);


export { app };