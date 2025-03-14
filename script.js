const currencyEl_one = document.querySelector("#currency-one");
const amountEl_one = document.querySelector("#amount-one");
const currencyEl_two = document.querySelector("#currency-two");
const amountEl_two = document.querySelector("#amount-two");
const rateEl = document.querySelector("#rate");
const swap = document.querySelector("#swap");

async function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    try{
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${currency_one}`
        );

        const data = await response.json();
        const rate = data.rates[currency_two]

        rateEl.innerHTML =`1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value *rate).toFixed(2);
    } catch(error){
        console.log(error);
    }  
}

currencyEl_one.addEventListener("change",calculate);
currencyEl_two.addEventListener("change",calculate);
amountEl_one.addEventListener("input",calculate);
amountEl_two.addEventListener("input",calculate);

swap.addEventListener("click",()=>{
    const temp  = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})


calculate();