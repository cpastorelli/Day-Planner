
const currentDay = document.querySelector('#currentDay');

const greeting = document.querySelector('.greeting');

const numOfBlocks = 24;
//I have this include minutes incase I wish to expand this program to include 30 or 15 min increments
const time = "H mm A"; 

var counter = 0;

var amPm = " AM";



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

    // splits time into array of three parts [0]Hour, [1]Min, [2]Am/Pm
    rightNow = rightNow.split(" ");

// if index[2] is AM, show good morning, else show good evening
if(rightNow[2] === "AM"){

    // Show Good Morning on screen
    greeting.innerHTML = "Good Morning!";   
} else {

    // Show Good Afternoon on screen
    greeting.innerHTML = "Good Afternoon!";
}

// return rightNow array that has been split into 3 parts
return rightNow;
}

// Create a function to show the time for each time block
function incHour() {

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



function setPlannerState($divArea, timeArray, plannerHour){

    var planArr = plannerHour.split(" ");

    planTime = Number(planArr[0]);

    var modTime = Number(timeArray[0]);
    
    modTime = (modTime % 12);

    if (timeArray[2] === "AM" && planArr[1] === "AM"){

        if(modTime === planTime){
            $divArea.addClass("present");
        }

        if(modTime < planTime && planTime != 12){
            $divArea.addClass("future");
        }

        if(modTime > planTime || planTime == 12){
            $divArea.addClass("past");
        }
    }else if (timeArray[2] === "PM" && planArr[1] === "PM") {

        if(modTime === planTime){
            $divArea.addClass("present");
        }

        if(modTime < planTime && planTime != 12){
            $divArea.addClass("future");
        }

        if(modTime > planTime || planTime == 12){
            $divArea.addClass("past");
        }  

    }else if (timeArray[2] === "AM" && planArr[1] === "PM"){
        $divArea.addClass("future");
    }else if (timeArray[2] === "PM" && planArr[1] === "AM"){
        $divArea.addClass("past");
    }
}



// Function to make the blocks of time
function createTimeBlock(timeblock) {

    var timeArr = getCurrentTime(time);

    for(var i = 0; i < timeblock; i++){

        //var timeOutput = theHour + timeArr[2]
        var showHour = incHour();

        //make a new div block and assign the class row to it
        $newTimeBlock = $("<div>").addClass("row"); 

        //take the time from array[0] and set to a new variable
        $timeText = $("<p>").text(showHour);

        //append the timeText <p> to the NewCol
        $newCol = $("<div>").addClass("col-2 align-middle").append($timeText);

        //create a textarea and set it to a larger area than the other sections
        $newTextArea = $("<textarea>").addClass("col-8 text-input").text("");

        //create save button at the end of the row, and give it the saveBtn class
        $newSaveBtn = $("<button>").addClass("saveBtn col-1").attr("id", "todo-input");

        //append all the sections to the New Time Block
        $newTimeBlock.append($newCol, $newTextArea, $newSaveBtn);
        
        //append all the previously appended blocks and put them in the container class in HTML
        $(".container").append($newTimeBlock)

        //call function to color in the rows according to how late it is in the day
        setPlannerState($newTextArea, timeArr, showHour);
    }
}


// call function to show the current day's date
todaysDate();

//call function to create rest of day planner
createTimeBlock(numOfBlocks);





function saveMe (){

    localStorage.setItem("ToDo", "DidThisWOrk");
    $(".saveBtn").click(function(){
        if(window.localStorage){
            localStorage.setItem("todo-item", $('#todo-input').val());
        }
    })
}

var saveBtn = document.querySelector(".saveBtn");
saveBtn.addEventListener('click', saveMe);



