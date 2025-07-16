const apiKey = "d548c09553ace00e637e2575";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#submit");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const exchangeBtn = document.querySelector("#exchange");



let totalExchangeRate = 0;
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`; 
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (event) => {
    event.preventDefault(); // To Avoid refresh of page when this button is clicked.
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
    


    const URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(URL).then(response=>response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        totalExchangeRate = (amtVal * exchangeRate ).toFixed(2);
        return totalExchangeRate;
    }).then(()=>{
        let msg = document.querySelector(".msg");
        msg.innerText = `${amtVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).then(status=>console.log("Success"));  
});


exchangeBtn.addEventListener("click",(event) => {
    event.preventDefault();
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value; 
    toCurrency.value = temp;
    updateFlag(fromCurrency);
    updateFlag(toCurrency);

});

