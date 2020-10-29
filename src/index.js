import './css/style.css';
import { docReady, showModal, clearModal, clearGame } from './js/core/core.js';
import './js/card.js';
import { Bombo } from './js/bombo.js';
import { BingoCard } from './js/card.js';
import { PubSub } from './js/core/pubSub.js';
// import { tl as templatePlayers } from './templates/modalPlayers.js'
import { modalPlayer, modalPlayer as ModalPlayer } from './templates/modalPlayers.js'
import { bingoAlert } from './templates/bingoAlert';
import { lineaAlert } from './templates/lineaAlert';
import { endGame } from './templates/endGame';

const app = (() => {
    let myApp;
    let bombo;
    let pubSub = new PubSub();
    let cardPlayers = [];
    let stateApp = "stop";
    let players = [];

    /* APP */

    let start = () => {
        let modalPlayer = ModalPlayer([players], [addPlayer, startBingo]);
        showModal(modalPlayer.render(), startBingo)
        console.log("vuelta a empezar");
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
                    clearGame()
                    players.forEach((player, index) => {
                        clearModal("bingoCard" + index)
                    });
                    players = []
                    showModal(endGame(start).render(), () =>{})
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

    let addPlayer = (newPlayer) => {
        players.push(newPlayer)
        clearModal("modal")
        let modalPlayer = ModalPlayer([players], [addPlayer, startBingo]);
        showModal(modalPlayer.render(), startBingo)
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