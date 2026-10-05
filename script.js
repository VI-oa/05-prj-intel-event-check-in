// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = Number(localStorage.getItem("totalCount")) || 0;
const maxCount = 16;

// Restore saved attendance counts
document.getElementById("attendeeCount").textContent = count;
document.getElementById("waterCount").textContent =
    Number(localStorage.getItem("waterCount")) || 0;
document.getElementById("zeroCount").textContent =
    Number(localStorage.getItem("zeroCount")) || 0;
document.getElementById("powerCount").textContent =
    Number(localStorage.getItem("powerCount")) || 0;
document.getElementById("progressBar").style.width =
    Math.round((count / maxCount) * 100) + "%";


// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Get form values
    const name = nameInput.value;
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    const attendanceList = document.getElementById("attendanceList");
    const emptyRoster = attendanceList.querySelector(".empty-roster");
    
    if (emptyRoster) {
        emptyRoster.remove();
    }

    const attendeeRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const teamCell = document.createElement("td");
    const teamLabel = document.createElement("span");

    nameCell.textContent = name;
    teamLabel.textContent = teamName;
    teamLabel.className = `team-label ${team}`;
    teamCell.appendChild(teamLabel);
    attendeeRow.appendChild(nameCell);
    attendeeRow.appendChild(teamCell);
    attendanceList.appendChild(attendeeRow);
    console.log(name, teamName);

    // Increment count
    count++;
    console.log("Total check-ins:", count);

    // Update attendance count
    const attendCount = document.getElementById("attendeeCount");
    attendCount.textContent = count;
    localStorage.setItem("totalCount", count);

    // Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage;

    // Update team counter
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent, 10) + 1;
    localStorage.setItem(team + "Count", teamCounter.textContent);

    // Show welcome message
    const message = `Welcome , ${name} from ${teamName}!`;
    document.getElementById("greeting").style.display = "block";
    document.getElementById("greeting").textContent = message;

    if (count === maxCount) {
        const waterCount = parseInt(document.getElementById("waterCount").textContent, 10);
        const zeroCount = parseInt(document.getElementById("zeroCount").textContent, 10);
        const powerCount = parseInt(document.getElementById("powerCount").textContent, 10);

        let winningTeam = "Team Water Wise";
        let winningCount = waterCount;

        if (zeroCount > winningCount) {
            winningTeam = "Team Net Zero";
            winningCount = zeroCount;
        }

        if (powerCount > winningCount) {
            winningTeam = "Team Renewables";
            winningCount = powerCount;
        }

        const celebrationMessage = document.getElementById("celebrationMessage");
        celebrationMessage.textContent = `Congratulations! ${winningTeam} wins with ${winningCount} check-ins!`;
        celebrationMessage.hidden = false;
    }
    form.reset();
});
