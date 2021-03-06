
/**
     * Inicializa todas las funciones y atributos del modal player
     * @param {array} functions:
     *  functions[0] => addPlayer(): añade un nuevo jugador
     *  functions[1] => startBingo(): empieza una nueva partida del bingo con los jugadores introducidos
     */
export function modalPlayer(atributtes, functions) {

    /* DECLARACIONES */
    let newPlayer = "";     //valor del nuevo player
    let playerInput;        //input para introducir usuario
    //template HTML
    let layout = `
        <div id="playersForm" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h1>Bingo players</h1>
                    <form id="modalPardal">
                        <label for="fname">Add Players</label><br/>
                        <input type="text" id="fname" name="fname"><br/>
                    </form>
                    <button class="button">Add Player</button>
                    <button class="button">Start Game</button><br>
                    ${(atributtes[0].length > 0) ? (`<h2>Players</h2>`) : (``)}
                    ${atributtes[0].map((player, index) => {
                        return `<span>${index} - ${player}</span><br>`
                    })}
                </div>
            </div>`;

    /**
     * inicializa y prepara el layout que va a ser renderizado
     */
    let initializeLayout = () => {
        let parser = new DOMParser();

        /* Asignacion de eventos */
        layout = parser.parseFromString(layout, "text/html");
        layout = layout.getElementsByTagName('div')[0];

        // añadir jugador
        let buttonAddPlayer = layout.getElementsByTagName("button")[0];
        buttonAddPlayer.addEventListener("click", handleAddPlayer)

        // introducir jugador
        playerInput = layout.getElementsByTagName("input")[0];
        playerInput.addEventListener('input', handleInputPlayer)

        // empezar partida
        let buttonStartGame = layout.getElementsByTagName("button")[1];
        buttonStartGame.addEventListener("click", handleStartGame)
    }

    let handleInputPlayer = (e) => {
        newPlayer = playerInput.value
    }

    /**
     * maneja el evento del boton para añadir un nuevo jugador
     */
    let handleAddPlayer = (e) => {
        if (newPlayer.length >= 5) {
            if (!atributtes[0].includes(newPlayer)) {
                functions[0](newPlayer)
            } else {
                alert("No se puede añadir un usuario con el mismo nombre    ")
            }
        } else {
            alert("Introduce un usuario con más de 4 carácteres")
        }
    }

    let handleStartGame = (e) => {
        functions[1](layout)
    }

    /**
     * renderiza el template del modalPlayer
     */
    let render = () => {
        return layout
    }

    /* OPERACIONES */

    /* Inicializa el template del metodo render */
    initializeLayout();

    return {
        render: render
    }
}