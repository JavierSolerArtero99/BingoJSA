
let docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

let showModal = (templateHtml, callback) => {
    let modal = templateHtml
    document.body.appendChild(modal);
    modal.style.display = "block";

    let span = document.getElementsByClassName("close")[0];
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

let clearModal = (templateToClear) => {
    document.getElementsByClassName(templateToClear)[0].remove()
}

let clearGame = () => {
    let bodyContent = document.getElementById("balls")
    console.log(bodyContent);
    var first = bodyContent.firstElementChild;
    while (first) {
        first.remove();
        first = bodyContent.firstElementChild;
    }
}

export { docReady, showModal, clearModal, clearGame };