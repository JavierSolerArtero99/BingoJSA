import { clearModal } from "../js/core/core";

export function endGame(restartGame) {
    let layout = `
    <div id="playersForm" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <h1>Volver a jugar?</h1>
            <button class="button">Si</button>
            <button class="button">No</button><br>
        </div>
    </div>`;

    let initializeLayout = () => {
        let parser = new DOMParser();
        layout = parser.parseFromString(layout, "text/html");
        layout = layout.getElementsByTagName('div')[0];

        let buttonRestartGame = layout.getElementsByTagName("button")[0];
        buttonRestartGame.addEventListener("click", handleRestartGame)
    }

    let handleRestartGame = () => {
        var modals = Array.prototype.slice.call(document.getElementsByClassName("modal"), 0);
        modals.forEach(modal => {
            modal.remove()
        });
        restartGame()
    }

    let render = () => {
        return layout
    }

    initializeLayout()

    return ({
        render: render
    })
}