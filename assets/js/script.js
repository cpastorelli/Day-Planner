// Variables
const currentDayEl = document.querySelector('#currentDay');
const greeting = document.querySelector('.greeting');
const numOfHours = 24;
//I have this include minutes incase I wish to expand this program to include 30 or 15 min increments
const momentFormat = "H mm A"; 
var counter = 0;
var amPm = " AM";
var eventSchedules = [];
var eventTitles = [];

// show the current day's date
todaysDate();
//create timeslots for events
CreateHourBlock(numOfHours);

checkStorage();

function checkStorage() {
    let todaysEvents = localStorage.getItem("EventName");
    let todaysSchedules = localStorage.getItem("EventHour");
 

    if(todaysEvents && todaysSchedules) {
        let eventMadeName = JSON.parse(todaysEvents);
        let previouslyScheduled = JSON.parse(todaysSchedules);
        // console.log(eventMadeName[0]);
        // console.log(previouslyScheduled[0]);
        // populateToday(eventMadeName, previouslyScheduled);
    }
}

// function populateToday(eventsToday, timesToday) {
    

// }

//make functionshow current day with moment js
function todaysDate() { 
    var now = moment().format("dddd, MMM Do");
    currentDayEl.innerHTML = now;
}

// Function to make the blocks of time
function CreateHourBlock(numberOfHours) {
    var currentTime = getCurrentTime(momentFormat);

    for(var i = 0; i < numberOfHours; i++){

        var hourIncreased = increasePlannerHour();
        
        $newHourEl = $("<div>").addClass("row"); 
        //take the time from array[0] and set to a new variable
        $thisHour = $("<p>").text(hourIncreased);
        $newCol = $("<div>").addClass("col-2 align-middle").append($thisHour);

        //create a textarea and set it to a larger area than the other sections
        $newTextArea = $("<textarea>").addClass("col-8 text-input").text("");
        $newTextArea.addClass("eventItem");

        //create save button at the end of the row, and give it the saveBtn class
        $newSaveBtn = $("<button>").addClass("saveBtn col-1");
        $newSaveIcon = $("<img>").attr("src","./assets/images/save.png");
        $newSaveBtn.append($newSaveIcon);
        //append all the sections to the New Time Block
        $newHourEl.append($newCol, $newTextArea, $newSaveBtn);
        //append all the previously appended blocks and put them in the container class in HTML
        $(".container").append($newHourEl)
        //call function to color in the rows according to how late it is in the day
        setPlannerState($newTextArea, currentTime, hourIncreased);
    }
}

// Function to get the current time and color coordinate blocks of time
function getCurrentTime (getTime) {
   
    var rightNow = moment().format(getTime);
    // splits time into array of three parts [0]Hour, [1]Min, [2]Am/Pm
    rightNow = rightNow.split(" ");
    
    // if index[2] is AM, show good morning,ect
    if(rightNow[2] === "AM"){
        greeting.innerHTML = "Good Morning!"; 

    } else if (rightNow[2] === "PM" && rightNow[0] > 17){
        greeting.innerHTML = "Good Evening!";

    }else{
    greeting.innerHTML = "Good Afternoon!";
    }

    // return rightNow array that has been split into 3 parts
    return rightNow;
}

// This function is to increase the hour for the planner
function increasePlannerHour() {
    var printHour;

    if(counter === 0) {
        printHour = 12 + amPm;
        counter++;

    }else if(counter != 0 && counter < 12){
        printHour = counter + amPm;
        counter++;

    } else if(counter >= 12 && counter <= 24){
        amPm = " PM";

        if (counter === 12){
            printHour = counter + amPm;
            counter++;

        }else{
            printHour = counter - 12;
            printHour += amPm;
            counter++;
        }
    }

    return printHour;
}


function setPlannerState($divArea, currentTime, plannerTimeSlot){
    var planArr = plannerTimeSlot.split(" ");
    plannerHour = Number(planArr[0]);

    // currentTime is in HH MM AM/PM format
    var currentHour = Number(currentTime[0]);
    currentHour = (currentHour % 12);

    if (currentTime[2] === "AM" && planArr[1] === "AM"){
        setPlannerColors(currentHour, plannerHour, $divArea);

    }else if (currentTime[2] === "PM" && planArr[1] === "PM") {
        setPlannerColors(currentHour, plannerHour, $divArea);
 
    }else if (currentTime[2] === "AM" && planArr[1] === "PM"){
        $divArea.addClass("future");

    }else if (currentTime[2] === "PM" && planArr[1] === "AM"){
        $divArea.addClass("past .text-decoration-line-through");
    }
}

function setPlannerColors(currentHour, plannerHour, $divArea){

    if(currentHour > plannerHour || plannerHour == 12){
        $divArea.addClass("past .text-decoration-line-through");
    }

    if(currentHour === plannerHour){
        $divArea.addClass("present");
    }

    if(currentHour < plannerHour && plannerHour != 12){
        $divArea.addClass("future");
    }
}

$(".saveBtn").click( function saveInput(event){
    event.preventDefault();

    var eventTitle = event.currentTarget.parentNode.children[1].value;
    var eventHour = event.currentTarget.parentNode.children[0].innerText;

    if(window.localStorage){
        eventSchedules.push(eventHour);
        eventTitles.push(eventTitle);

        localStorage.setItem("EventName", JSON.stringify(eventTitles));
        localStorage.setItem("EventHour", JSON.stringify(eventSchedules));
    }
})
