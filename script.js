const generateSection = document.querySelector(".generated");
const copyPassword = document.querySelector("#copy");
const generateButton = document.querySelector("#generateBtn");
let passHistory = [];

function generatePassword(options = {length: 9, uppercase: true, lowercase: true, numbers: true, symbols: true }){
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numberSet = "0123456789";
    const symbolSet = "[]{}|;:,.<>?!@#$%^&*()_+";

    let possibleCombination = "";

    if(options.uppercase){
        possibleCombination += uppercaseLetters;
    }
    if(options.lowercase){
        possibleCombination += lowercaseLetters;
    }
    if(options.numbers){
        possibleCombination += numberSet;
    }
    if(options.symbols){
        possibleCombination += symbolSet;
    }

    if(possibleCombination.length === 0){
        alert("Please select at least one character type");
        return possibleCombination;
    }

    let password = "";
    for (let i = 0; i < options.length; i++) {
        const randomIdx = Math.floor(Math.random() * possibleCombination.length);
        password += possibleCombination[randomIdx];
    }

    return password;
}

generateButton.addEventListener("click" , () => {
    const length = document.getElementById('passLen').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('number').checked;
    const includeSymbols = document.getElementById('symbol').checked;

    const selectedOptions = {
        length: parseInt(length),
        uppercase: includeUppercase,
        lowercase: includeLowercase,
        numbers: includeNumbers,
        symbols: includeSymbols,
    };
    
    const password = generatePassword(selectedOptions);
    console.log(password);

    const para = generateSection.querySelector("p");
    para.textContent = password;
    para.style.color = "white";
    para.style.fontSize = "20px";
    para.style.fontFamily = "Chakra Petch";
    para.style.fontWeight = "500";
    para.style.letterSpacing = "2px";

    if(password.length > 0){
        addToHistory(password);
    }

});

function addToHistory(password){
    passHistory.unshift(password);

    if(passHistory.length > 7){
        passHistory.pop();
    }

    saveToHistory();
}

function copyToClipboard(password){
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard");
        }).catch(err =>{
            console.error("Error in copying to clipboard", err);
        });
}


function saveToHistory(){
    const historyList = document.getElementById("passHistory");
    historyList.innerHTML = "";

    passHistory.forEach((password, idx) => {
        const list = document.createElement("li");
        list.textContent = `${idx+1}. ${password}`;
        historyList.appendChild(list);
       
        // list.setAttribute("style", "color:white, font-size: 20px, font-famliy : Chakra Petch, list-style: none, padding: 4px ");
        list.style.color = "white";
        list.style.fontSize = "18px";
        list.style.fontFamily = "Chakra Petch";
        list.style.listStyle = "none";
        
        const copyBtn = document.createElement("button");
        let i = document.createElement("i");
        i.classList.add("fa-regular","fa-copy")
        copyBtn.appendChild(i);
        copyBtn.className = "copy-btn";
        copyBtn.style.padding = "20px";
        copyBtn.style.backgroundColor = "#1C2C1D";
        copyBtn.style.color = "rgb(255, 255, 255)";
        copyBtn.style.border = "none";
        
        
        copyBtn.addEventListener("click", () => {
            copyToClipboard(password);
            alert("Password copied to clipboard!");
        });

        list.appendChild(copyBtn);
        historyList.appendChild(list)
    });
}

copyPassword.addEventListener("click",copyToClipboard);


