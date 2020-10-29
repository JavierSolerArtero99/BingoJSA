

export class Bombo {
    constructor(rootElement) {
        let boles = Array.from({ length: 90 }, (_, i) => i + 1);
        let bolesExtracted = [];
        let shuffle = () => boles.sort((a, b) => Math.random() - 0.5);
        this.getExtractedNumbers = () => bolesExtracted;
        this.getRemainingBoles = () => boles;
        this.pickNumber = () => {
            shuffle();
            boles[0] && bolesExtracted.push(boles[0]);
            if (boles[0]) render(boles[0])
            return (boles.length > 0 && boles.splice(0, 1)) ? bolesExtracted[bolesExtracted.length - 1] : false;
        }

        let render = (num) => {
            console.log(num);
            let numbers = Array.from({ length: 90 }, (_, i) => i + 1);

            numbers = numbers.map((item) => {
                let className = "bingoBallEmpty"
                if (bolesExtracted.includes(item))
                    className = 'bingoBall';
                return {
                    class: className,
                    number: item
                }
            })

            let out = `
                ${numbers.map(element => {
                return `<div class="${element.class}">
                        ${element.number}
                </div>`
            }).join('')}`


            rootElement.innerHTML = out;

        }
    }
}