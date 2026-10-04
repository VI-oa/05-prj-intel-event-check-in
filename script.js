// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 16;


// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Get form values
    const name = nameInput.value;
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    console.log(name, teamName);

    // Increment count
    count++;
    console.log("Total check-ins:", count);

    // Update attendance count
    const attendCount = document.getElementById("attendeeCount");
    attendCount.textContent = parseInt(attendCount.textContent) + 1;

    // Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage;

    // Update team counter
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

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
