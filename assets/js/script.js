const saveBtn = document.querySelector('saveBtn');
const currentDay = document.querySelector('#currentDay');
const greeting = document.querySelector('.greeting');
const numOfBlocks = 24;
const time = "H mm A";
// var amPM = "";
var counter = 0;



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

return rightNow;
}

// function incHour(thisHour){
// if(thisHour > 12){
//     thisHour -= 12;
//     console.log("past 12")
//     //I feel like I need to add AM/PM HEre
//     }
// // else if(thisHour === 12){
// //     thisHour = 1;
// // //? meh..
// // }
// // else{
// //     thisHour++;
// // }

// }


function incHour() {

    var printHour;

    if(counter === 0) {
        printHour = 12 + "AM";
        counter++;
    }else if(counter != 0 && counter < 12){
        printHour = counter + "AM";
        counter++;
    } else if(counter >= 12 && counter <= 24){
        if (counter === 12){
            printHour = counter + "PM";
            counter++;
        }else{
            printHour = counter - 12;
            printHour += "PM";
            counter++;
        }

    }

    return printHour;
}



// Function to make the blocks of time
function createTimeBlock(timeblock) {

var timeArr = getCurrentTime(time);

//var theHour = Number(timeArr[0]);

//var theMin = Number(timeArr[1]);


for(var i = 0; i < timeblock; i++){

    //var timeOutput = theHour + timeArr[2]
    var showHour = incHour();

    console.log("timeOutput is :" + showHour);
    

    //make a new div block and assign the class row to it
    $newTimeBlock = $("<div>").addClass("row"); 

    //take the time from array[0] and set to a new variable
    $timeText = $("<p>").text(showHour);

    $newCol = $("<div>").addClass("col-2 align-middle").append($timeText);

    $newTextArea = $("<textarea>").addClass("col-8").text("");

    $newSaveBtn = $("<div>").addClass("saveBtn col-1");

    $newTimeBlock.append($newCol, $newTextArea, $newSaveBtn);
    $(".container").append($newTimeBlock)

    
    

    }


}



todaysDate();
createTimeBlock(numOfBlocks);
// loop to create hours for the day?



