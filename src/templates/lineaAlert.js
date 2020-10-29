
export function lineaAlert(player) {
    let layout = `
        <div class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h1>Linea: ${player}</h1>
                    <img src="https://i.pinimg.com/originals/31/51/43/3151439d94dafd32b417e798a2b7649c.jpg" class="bingoImg" alt="Flowers in Chania">
                </div>  
            </div>`;
    let parser = new DOMParser();

    layout = parser.parseFromString(layout, "text/html");
    layout = layout.getElementsByTagName('div')[0];

    return layout
}