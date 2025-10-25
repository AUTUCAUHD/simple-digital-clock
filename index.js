const convertBtn = document.querySelector('#convertBtn');

let militaryTime = localStorage.getItem('militaryTime');
// Retrieve militaryItem from localStarge

if (militaryTime === null){
    // If militaryTime is not in localStorage

    militaryTime = false;
    localStorage.setItem('militaryTime', 'false');
    // Saves militaryTime to localStorage

}else{
    // if militaryTime is in localStorage

    militaryTime = militaryTime === 'true'; // true/false
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function updateClock(){
    // initializing variables
    const now = new Date();
    let rawHours = now.getHours();
    let currentWeekDay = weekdays[now.getDay()]; // Retrieves by index
    let currentMonth = months[now.getMonth()]; // Retrieves by index
    let currentDay = now.getDate();
    let currentYear = now.getFullYear();
    let hours;
    let meridiem;


    if (militaryTime){
        hours = rawHours; // 24-hour format
        meridiem = '';
        convertBtn.textContent = 'Switch to 12-hour clock';
    }else{
        meridiem = rawHours >= 12 ? 'PM' : 'AM'; 
        hours = rawHours % 12 || 12; // 12-hour format
        convertBtn.textContent = 'Switch to 24-hour clock';
    }

    // String manipulation for clock display
    hours = hours.toString().padStart(2, 0);
    let minutes = now.getMinutes().toString().padStart(2, 0);
    let seconds = now.getSeconds().toString().padStart(2, 0);


    // Clock display
    let clockString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    document.getElementById('clockTime').textContent = clockString;

    // Date display
    document.getElementById('currentDate').textContent = `${currentWeekDay}, ${currentMonth} ${currentDay} ${currentYear}`;
}

function convertClock(){
    militaryTime = !militaryTime;

    localStorage.setItem('militaryTime', militaryTime.toString());
    // if true, set to false. if false, set to true

    updateClock();
}

updateClock();
setInterval(updateClock, 1000);