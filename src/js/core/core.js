
let docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

let showModal = (templateHtml, callback) => {
    // let parser = new DOMParser();
    // let modal = parser.parseFromString(templateHtml, "text/html");

    // modal = modal.getElementsByTagName('div')[0];
    let modal = templateHtml
    document.body.appendChild(modal);
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        callback();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            callback();
        }
    }
}
export { docReady, showModal };