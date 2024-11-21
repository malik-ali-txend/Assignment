function getWordsStartingWithVowel(inputString) {
    const words = inputString.split(/\W+/); // function that will convert string to words
    const vowelWords = words.filter(word => /^[aeiou]/i.test(word));  // matching vowles with words + caseinsensitive
    return vowelWords;
}

const inputString = prompt("Enter a String to check its words starting from vowels.");
console.log("input string was: " + inputString);
console.log(getWordsStartingWithVowel(inputString));


const inputString2 = "The journey of life is not defined by the destination, but by the experiences and growth along the way.";
console.log(" Static input string was: " + inputString2);
console.log(getWordsStartingWithVowel(inputString2));



// task 2

//gettin ref by id's into var
const para = document.getElementById("changableText");
const btn = document.getElementById("clickableButton");

const paras = document.createElement("p");
const node = document.createTextNode(inputString2 + "\n" + "Vowels are: " + getWordsStartingWithVowel(inputString2));
const element = document.getElementById("div1");

paras.appendChild(node);
element.appendChild(paras);

btn.addEventListener("click", () => {

    para.textContent = "The color has been successfully updated!";

    document.body.style.backgroundColor = getRandomColor();
    btn.style.color = getRandomColor();
});

// Function to get a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF"; //Hexa Values
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
