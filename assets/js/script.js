const saveBtn = document.querySelector('saveBtn');
const currentDay = document.querySelector('#currentDay');
const greeting = document.querySelector('.greeting');
const numOfBlocks = 12;
const time = "H mm A";
var amPM = "";

//make functionshow current day with moment js
function todaysDate() {
    
    //Create a moment object and set it to Weekday, Month date format  
    var now = moment().format("dddd, MMM Do");

    //Show current day in currentDay ID
    currentDay.innerHTML = now;
}

// Function to get the current time and color coordinate blocks of time
function getCurrentTime (getTime) {

    // grabs hour (24 hour format), minute (00-59), and AM/PM 
    var rightNow = moment().format(getTime);

    console.log(rightNow);

    // splits time into array of three parts [0]Hour, [1]Min, [2]Am/Pm
    rightNow = rightNow.split(" ");

    console.log(rightNow);

// if index[2] is AM, show good morning, else show good evening
if(rightNow[rightNow.length - 1] == "AM"){
    
    console.log("Good Morning!");

    greeting.innerHTML = "Good Morning!";
} else {
    console.log("Good Afternoon!");

    greeting.innerHTML = "Good Afternoon!";
}


}


// Function to make the blocks of time
function createTimeBlock(timeblock) {
getCurrentTime(time);


}



todaysDate();
createTimeBlock(numOfBlocks);
// loop to create hours for the day?



