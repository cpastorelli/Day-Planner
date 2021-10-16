const saveBtn = document.querySelector('saveBtn');
const currentDay = document.querySelector('#currentDay');


//make functionshow current day with moment js
function today() {
    
    //Create a moment object and set it to Weekday, Month date format  
    var now = moment().format("dddd, MMM Do");

    currentDay.innerHTML = now;
}


today();
// loop to create hours for the day?



