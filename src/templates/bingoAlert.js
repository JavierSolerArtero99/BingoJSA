
export function bingoAlert(player) {
    let layout = `
        <div class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h1>Winner: ${player}</h1>
                    <img src="https://img2.rtve.es/v/3195161?w=1600&preview=1435838169208.jpg" class="bingoImg" alt="Flowers in Chania">
                </div>  
            </div>`;
    let parser = new DOMParser();

    layout = parser.parseFromString(layout, "text/html");
    layout = layout.getElementsByTagName('div')[0];

    return layout
}