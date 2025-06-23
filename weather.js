// http://api.weatherapi.com/v1/current.json?key=78f5e32a0e5940f18ee152347252206&q=Jamshedpur&aqi=no


const temperatureField=document.querySelector(".temp");
const locationField=document.querySelector(".time-location p");
const dateAndTimeField=document.querySelector(".time-location h5");
const searchField=document.querySelector(".Search-area");
const form=document.querySelector("form");


form.addEventListener('submit',searchForLocation);

let target="Delhi";
const fetchResults=async(targetLocation)=>{
    let url=`http://api.weatherapi.com/v1/current.json?key=78f5e32a0e5940f18ee152347252206&q=${targetLocation}&aqi=no`;

    const res=await fetch(url);
    const data=await res.json();
    console.log(data);


    let locationName=data.location.name;
    let time=data.location.localtime;
    let temp=data.current.temp_c;
    
    updateDetails(temp,locationName,time);

}
function updateDetails(temp,locationName,time){

let splitDate=time.split(' ')[0]

let splitTime=time.split(' ')[1]

let currentDay=getDayName(new Date(splitDate).getDay());

    temperatureField.innerHTML=temp;
    locationField.innerHTML=locationName;
    dateAndTimeField.innerHTML=`${splitDate} ${currentDay} ${splitTime}`;
    
}


function searchForLocation(e){
    e.preventDefault()
    target=searchField.value
    fetchResults(target);

}

fetchResults(target);

function getDayName(number){
    switch(number){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}