const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";
let dropdowns=document.querySelectorAll(".dropdown select");
let flags=document.querySelectorAll(".flag");
let fromcountry=dropdowns[0];
let tocountry=dropdowns[1];
let input=document.querySelector("#inbox");
let output=document.querySelector("#outbox");
let replace=document.querySelector("#sign");
output.disabled="true";
document.addEventListener("load",()=>{
    getExchangeRate();
})
for(let select of dropdowns)
{
for(let currcode in countryList)
{
   let newoption=document.createElement("option");
   newoption.value=currcode;
   newoption.innerText=currcode;
   select.append(newoption);
   fromcountry.value="USD";
   tocountry.value="INR";
}
} 
fromcountry.addEventListener("change",()=>{
    flags[0].src=`https://flagsapi.com/${countryList[fromcountry.value]}/shiny/64.png`;
    });
tocountry.addEventListener("change",()=>{
    flags[1].src=`https://flagsapi.com/${countryList[tocountry.value]}/shiny/64.png`;
})
input.addEventListener("input", async (evt)=>{
    output.disabled="false";
    getExchangeRate();
});
dropdowns.forEach((dropdown)=>{
dropdown.addEventListener("change",()=>{
    getExchangeRate();
})
})
const getExchangeRate=async () => {
    output.disabled="false";
    let response=await fetch(BASE_URL);
    let currencies=await response.json();
    let inputvalue=input.value;
    let input_In_Eur=(inputvalue/(currencies.eur[(fromcountry.value).toLowerCase()]));
    output.value=(input_In_Eur*(currencies.eur[(tocountry.value).toLowerCase()]));
}
replace.addEventListener("click",()=>
{
let temp=fromcountry.value;
fromcountry.value=tocountry.value;
tocountry.value=temp;
flags[0].src=`https://flagsapi.com/${countryList[fromcountry.value]}/shiny/64.png`;
flags[1].src=`https://flagsapi.com/${countryList[tocountry.value]}/shiny/64.png`;
getExchangeRate();
});