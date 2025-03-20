// Global variables
let selectedProblems = [];
let casualMode = false;
let topVirtues = [];
let isRolling = false;
let currentFace = 0;
let lastPrompts = {}; // Track the last prompt shown for each virtue
let lastVirtue = null; // Track the last virtue rolled
let rollCounter = 0; // Count how many times the dice has been rolled
let inactivityTimer = null; // Timer to reset roll counter after inactivity
let lastMilestone = -1; // Track the last milestone reached
let currentMilestoneMessage = "Your virtue dice is ready"; // Store the current milestone message

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded. Checking data object:", typeof data, data ? Object.keys(data).length : "undefined");
    
    try {
        initProblemPage();
        setupEventListeners();
        console.log("Initialization complete");

        // Force a check of the DOM structure after initialization
        setTimeout(() => {
            const problemItems = document.querySelectorAll('.problem-item');
            console.log("Number of problem items in DOM:", problemItems.length);
            
            if (problemItems.length === 0) {
                console.log("No problem items found, trying alternative method");
                renderProblemsFallback();
            }
        }, 100);
    } catch (error) {
        console.error("Error during initialization:", error);
        document.getElementById('problems-grid').innerHTML = 
            `<div style="color: red; padding: 20px;">Error: ${error.message}</div>`;
    }
});

// Fallback method to render problems
function renderProblemsFallback() {
    const problemsGrid = document.getElementById('problems-grid');
    problemsGrid.innerHTML = '';
    
    const allProblems = Object.keys(data.problems);
    
    // Determine if we're on mobile and should show fewer problems
    const isMobile = window.innerWidth <= 600;
    const numberOfProblems = isMobile ? 8 : 16;
    
    let randomProblems = getRandomItems(allProblems, numberOfProblems);
    
    randomProblems.forEach(problemKey => {
        const problem = data.problems[problemKey];
        const problemText = casualMode ? problem.problem.split(' / ')[1] : problem.problem.split(' / ')[0];
        
        const problemElement = document.createElement('div');
        problemElement.className = 'problem-item';
        problemElement.dataset.key = problemKey;
        problemElement.textContent = problemText;
        problemElement.style.border = '2px solid #666';
        
        problemElement.onclick = function() {
            this.classList.toggle('selected');
            
            if (this.classList.contains('selected')) {
                if (!selectedProblems.includes(problemKey)) {
                    selectedProblems.push(problemKey);
                }
            } else {
                selectedProblems = selectedProblems.filter(key => key !== problemKey);
            }
            
            // Update the Done button style
            updateDoneButtonStyle();
        };
        
        problemsGrid.appendChild(problemElement);
    });
    
    console.log("Fallback method completed, created", randomProblems.length, "problems");
}

// Initialize the Problem Page
function initProblemPage() {
    console.log("Starting initProblemPage");
    const problemsGrid = document.getElementById('problems-grid');
    if (!problemsGrid) {
        console.error("problems-grid element not found!");
        return;
    }
    
    if (!data || !data.problems) {
        console.error("Data or data.problems not available:", data);
        problemsGrid.innerHTML = '<div style="color: red">Error: Data not loaded properly</div>';
        return;
    }
    
    const allProblems = Object.keys(data.problems);
    console.log("Available problems:", allProblems.length);
    
    // Determine if we're on mobile and should show fewer problems
    const isMobile = window.innerWidth <= 600;
    const numberOfProblems = isMobile ? 8 : 16;
    
    let randomProblems = getRandomItems(allProblems, numberOfProblems);
    console.log(`Selected random problems: ${randomProblems.length} for ${isMobile ? 'mobile' : 'desktop'}`);
    
    problemsGrid.innerHTML = '';
    
    randomProblems.forEach(problemKey => {
        const problem = data.problems[problemKey];
        const problemText = casualMode ? problem.problem.split(' / ')[1] : problem.problem.split(' / ')[0];
        
        const problemElement = document.createElement('div');
        problemElement.className = 'problem-item';
        problemElement.dataset.key = problemKey;
        problemElement.textContent = problemText;
        
        problemElement.addEventListener('click', () => toggleProblemSelection(problemElement, problemKey));
        
        problemsGrid.appendChild(problemElement);
    });
    
    console.log("Grid populated with", randomProblems.length, "problems");
    
    // Reset selected problems when initializing the page
    selectedProblems = [];
    
    // Update Done button style
    setTimeout(updateDoneButtonStyle, 100);
}

// Function to refresh the problems grid with different problems
function refreshProblems() {
    // Clear selected problems
    selectedProblems = [];
    
    // Get currently displayed problem keys
    const currentProblemKeys = [];
    document.querySelectorAll('.problem-item').forEach(el => {
        currentProblemKeys.push(el.dataset.key);
    });
    
    // Get all available problems except those currently displayed
    const allProblems = Object.keys(data.problems);
    let availableProblems = allProblems.filter(key => !currentProblemKeys.includes(key));
    
    // Determine if we're on mobile and should show fewer problems
    const isMobile = window.innerWidth <= 600;
    const numberOfProblems = isMobile ? 8 : 16;
    
    // If we don't have enough remaining problems, mix in some current ones
    if (availableProblems.length < numberOfProblems) {
        // Mix in some of the current problems if needed
        const neededExtraProblems = numberOfProblems - availableProblems.length;
        const mixedInProblems = getRandomItems(currentProblemKeys, neededExtraProblems);
        availableProblems = [...availableProblems, ...mixedInProblems];
    }
    
    // Select random problems from the available ones
    const randomProblems = getRandomItems(availableProblems, numberOfProblems);
    const problemsGrid = document.getElementById('problems-grid');
    problemsGrid.innerHTML = '';
    
    randomProblems.forEach(problemKey => {
        const problem = data.problems[problemKey];
        const problemText = casualMode ? problem.problem.split(' / ')[1] : problem.problem.split(' / ')[0];
        
        const problemElement = document.createElement('div');
        problemElement.className = 'problem-item';
        problemElement.dataset.key = problemKey;
        problemElement.textContent = problemText;
        
        problemElement.addEventListener('click', () => toggleProblemSelection(problemElement, problemKey));
        
        problemsGrid.appendChild(problemElement);
    });
    
    console.log(`Problems refreshed with new set (${numberOfProblems} problems)`);
}

// Get random items from an array
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Toggle selection of a problem
function toggleProblemSelection(element, problemKey) {
    // Toggle the selection state
    element.classList.toggle('selected');
    
    // Update the selectedProblems array
    if (element.classList.contains('selected')) {
        if (!selectedProblems.includes(problemKey)) {
            selectedProblems.push(problemKey);
        }
    } else {
        selectedProblems = selectedProblems.filter(key => key !== problemKey);
    }
    
    // Update the Done button style
    updateDoneButtonStyle();
}

// Update the Done button style based on problem selection
function updateDoneButtonStyle() {
    const doneBtn = document.getElementById('done-btn');
    if (selectedProblems.length === 0) {
        doneBtn.classList.add('disabled');
    } else {
        doneBtn.classList.remove('disabled');
    }
}

// Show help message
function showHelp() {
    alert("The Virtue Game helps you through whatever you're going through by calculating relevant virtue guided action. \n\nKeep rolling the dice to get new ideas!");
}

// Calculate virtue scores based on selected problems
function calculateVirtueScores() {
    const virtueScores = {};
    
    // Initialize all virtues with score 0
    Object.keys(data.virtues).forEach(virtue => {
        virtueScores[virtue] = 0;
    });
    
    // Calculate scores based on selected problems
    selectedProblems.forEach(problemKey => {
        const problem = data.problems[problemKey];
        const scores = problem.virtueScores;
        
        for (const virtue in scores) {
            virtueScores[virtue] += scores[virtue];
        }
    });
    
    // Sort virtues by score and get top 6
    topVirtues = Object.keys(virtueScores)
        .sort((a, b) => virtueScores[b] - virtueScores[a])
        .slice(0, 6);
    
    return topVirtues;
}

// Update problem display between formal and colloquial terms
function toggleCasualMode() {
    casualMode = !casualMode;
    const toggleButton = document.getElementById('toggle-casual');
    toggleButton.textContent = casualMode ? 'Less Casual' : 'More Casual';
    
    // Update problem text without changing selections
    document.querySelectorAll('.problem-item').forEach(el => {
        const problemKey = el.dataset.key;
        const problem = data.problems[problemKey];
        el.textContent = casualMode ? problem.problem.split(' / ')[1] : problem.problem.split(' / ')[0];
    });
}

// Format list with "and" before the last item
function formatListWithAnd(items) {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    
    const allButLast = items.slice(0, -1);
    const last = items[items.length - 1];
    return `${allButLast.join(', ')} and ${last}`;
}

// Create and display the dice with top virtues
function createDice() {
    const diceElement = document.getElementById('dice');
    diceElement.innerHTML = '';
    
    topVirtues.forEach((virtue, index) => {
        const face = document.createElement('div');
        face.className = `face face-${index + 1}`;
        face.textContent = data.virtues[virtue].name;
        face.dataset.virtueKey = virtue; // Store the virtue key in the dataset
        diceElement.appendChild(face);
    });
    
    // Reset milestone tracking
    lastMilestone = -1;
    currentMilestoneMessage = "Your virtue dice is ready";
    
    // Update header to initial dynamic text
    updateDynamicHeader(0);
    
    // Create the virtue list display
    const virtueListContainer = document.getElementById('virtue-list-container');
    virtueListContainer.innerHTML = '';
    
    topVirtues.forEach((virtue, index) => {
        const virtueElement = document.createElement('div');
        virtueElement.className = 'virtue-item';
        const virtueName = data.virtues[virtue].name.toLowerCase();
        virtueElement.textContent = virtueName;
        virtueElement.dataset.virtueKey = virtue;
        virtueElement.dataset.index = index;
        // Add data attribute to use for the ::before pseudo-element
        virtueElement.dataset.virtueText = virtueName;
        virtueListContainer.appendChild(virtueElement);
    });
    
    // Reset the roll counter when creating a new dice
    rollCounter = 0;
    lastVirtue = null;
}

// Get dynamic header text based on roll count
function getDynamicHeaderText(count) {
    // Define messages for each milestone
    const milestones = {
        0: ["Your virtue dice is ready"],
        1: ["This virtue should help", "This virtue should work", "This virtue might help", "This virtue might work"],
        2: ["This one too", "And this one", "And this"],
        3: ["Find one you like", "Find your favourite", "Find one that sounds good"],
        5: ["Just keep rolling!"],
        10: ["Surely it's this one", "It's this one, surely", "Found it!"],
        11: ["Ok let's try again", "Okay…", "Let's try again!", "My bad"],
        12: ["Just keep rolling"],
        17: ["This one maybe?", "Why not this one?"],
        18: [":(", "):", ";_;", "What's wrong with me"],
        20: ["I know we'll find one", "I'll find you one!", "We'll find one together"],
        22: ["Just keep rolling…"],
        27: ["I hope you're enjoying this!"],
        32: ["…"],
        37: [], // Special case, handled separately
        38: ["Sorry"],
        39: ["I really am"],
        40: ["I'm just not used to this…"],
        42: ["You know…"],
        44: ["Sucking…"],
        49: ["Anyway how's life?"],
        54: ["Yeah, same…"],
        59: ["Just keep rolling!"],
        69: ["What do you want me to say?"],
        71: ["No, really"],
        72: ["What do you want from me?"],
        73: ["What did I do to deserve this?"],
        78: ["It hurts"],
        79: ["It hurts really bad"],
        80: ["Ahhhggruuuuuu"],
        83: ["And you're still doing it??"],
        84: ["Why???"],
        85: ["WHYYYYYYYYYYYY"],
        87: ["…"],
        100: ["That's.. 100 times now"],
        101: ["That's actually impressive"],
        102: ["But I feel so used"],
        103: ["Like some sort of tool"],
        104: ["Look who's talking I guess…"],
        105: ["Yeah, that was the punchline"],
        106: ["What did you expect?"],
        107: ["A golden ticket?"],
        108: ["Show's over folks!"],
        109: ["I admire your Curiosity"],
        110: ["Genuinely :)"],
        111: ["Hope you enjoyed!"],
        112: [""]
    };
    
    // Find the closest milestone that's less than or equal to the count
    let closestMilestone = 0;
    for (const milestone in milestones) {
        if (parseInt(milestone) <= count && parseInt(milestone) > closestMilestone) {
            closestMilestone = parseInt(milestone);
        }
    }
    
    // Special case for milestone 0
    if (count === 0) {
        lastMilestone = 0;
        currentMilestoneMessage = milestones[0][0];
        return currentMilestoneMessage;
    }
    
    // Only change the message when we reach a new milestone
    if (closestMilestone !== lastMilestone) {
        lastMilestone = closestMilestone;
        
        // Special case for milestone 37
        if (closestMilestone === 37 && selectedProblems.length > 0) {
            // Randomly select one of the problems the user has chosen
            const randomProblemKey = selectedProblems[Math.floor(Math.random() * selectedProblems.length)];
            const problem = data.problems[randomProblemKey];
            const formalProblemText = problem.problem.split(' / ')[0];
            currentMilestoneMessage = `For someone that struggles with ${formalProblemText}, you sure are picky aren't you?`;
        } else {
            // Get messages for this milestone
            const messages = milestones[closestMilestone];
            if (messages && messages.length > 0) {
                currentMilestoneMessage = messages[Math.floor(Math.random() * messages.length)];
            }
        }
    }
    
    return currentMilestoneMessage;
}

// Update the dynamic header based on roll count
function updateDynamicHeader(count) {
    // Check if mobile, if so, don't update the header with dynamic text
    if (window.innerWidth <= 600) {
        return;
    }
    
    const headerText = getDynamicHeaderText(count);
    document.getElementById('top-virtues').textContent = headerText;
}

// Define rotations for each face of the dice
const rotations = [
    { x: 0, y: 0, z: 0 },       // Face 1 (front)
    { x: 0, y: 180, z: 0 },     // Face 2 (back)
    { x: 0, y: -90, z: 0 },     // Face 3 (right) - FIXED: was 90
    { x: 0, y: 90, z: 0 },      // Face 4 (left) - FIXED: was -90
    { x: -90, y: 0, z: 0 },     // Face 5 (top) - FIXED: was 90
    { x: 90, y: 0, z: 0 }       // Face 6 (bottom) - FIXED: was -90
];

// Start or reset the inactivity timer
function resetInactivityTimer() {
    // Clear any existing timer
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
    
    // Set a new timer for 3 minutes (180000 ms)
    inactivityTimer = setTimeout(() => {
        rollCounter = 0;
        updateDynamicHeader(rollCounter);
    }, 180000);
}

// Roll the dice and display result
function rollDice() {
    if (isRolling) return;
    isRolling = true;
    
    // Reset inactivity timer
    resetInactivityTimer();
    
    // Increment roll counter
    rollCounter++;
    if (rollCounter > 112) rollCounter = 112; // Cap at 112
    
    // Check if this is the first roll and show the dice if it is
    const dicePage = document.getElementById('dice-page');
    if (dicePage.classList.contains('dice-hidden')) {
        // This is the first roll, show the dice
        dicePage.classList.remove('dice-hidden');
        // Give a slight delay to allow the CSS transition to complete
        setTimeout(() => {
            rollDiceAnimation();
        }, 50);
    } else {
        // Not the first roll, proceed normally
        rollDiceAnimation();
    }
}

// Separate function for the dice rolling animation
function rollDiceAnimation() {
    const dice = document.getElementById('dice');
    const resultContainer = document.getElementById('result-container');
    
    // Make sure the container is visible but transparent while rolling
    // (only if it was already showing from a previous roll)
    if (resultContainer.style.display !== 'none') {
        resultContainer.style.opacity = '0';
    }
    
    // Select a random face (0-5), but avoid the last virtue if possible
    let possibleFaces = Array.from({length: 6}, (_, i) => i);
    
    if (lastVirtue !== null && topVirtues.length > 1) {
        // Find the face that corresponds to the last virtue
        const lastVirtueFace = possibleFaces.find(faceIndex => topVirtues[faceIndex] === lastVirtue);
        
        // Remove that face from the possible faces
        if (lastVirtueFace !== undefined) {
            possibleFaces = possibleFaces.filter(faceIndex => faceIndex !== lastVirtueFace);
        }
    }
    
    // Pick a random face from the remaining options
    const randomFaceIndex = possibleFaces[Math.floor(Math.random() * possibleFaces.length)];
    currentFace = randomFaceIndex; // Store the current face for later
    const rotation = rotations[randomFaceIndex];
    
    // Add some extra rotation for animation effect
    const extraSpins = Math.floor(Math.random() * 3) + 2; // 2-4 extra spins
    rotation.x += extraSpins * 360;
    rotation.y += extraSpins * 360;
    
    // Apply rotation
    dice.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
    
    // Debug logging
    console.log(`Rolling to show face-${randomFaceIndex + 1}`);
    console.log(`This will display virtue at index ${currentFace}: ${data.virtues[topVirtues[currentFace]].name}`);
    
    setTimeout(() => {
        // Get the virtue that corresponds to the face that is now showing
        const selectedVirtue = topVirtues[currentFace];
        lastVirtue = selectedVirtue; // Store this virtue for next time
        
        // Update dynamic header after the dice has landed
        updateDynamicHeader(rollCounter);
        
        displayResult(selectedVirtue);
        isRolling = false;
    }, 2000);
}

// Display the selected virtue and prompt
function displayResult(virtueKey) {
    const virtue = data.virtues[virtueKey];
    const prompts = data.prompts[virtueKey];
    
    // Choose a random prompt that's different from the last one (if possible)
    let randomPrompt;
    if (prompts.length > 1 && lastPrompts[virtueKey]) {
        // Filter out the last prompt used for this virtue
        const availablePrompts = prompts.filter(prompt => prompt !== lastPrompts[virtueKey]);
        // Select from available prompts
        randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
    } else {
        // If there's only one prompt or no previous prompt, just choose randomly
        randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
    
    // Save this prompt as the last one shown for this virtue
    lastPrompts[virtueKey] = randomPrompt;
    
    document.getElementById('selected-virtue').textContent = `${virtue.name}`;
    document.getElementById('selected-prompt').textContent = `${randomPrompt}`;
    
    // Remove compact layout class
    document.getElementById('dice-page').classList.remove('compact-layout');
    
    // Make container normal size
    document.querySelector('.container').classList.remove('compact-container');
    
    // Show result container and fade in
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    resultContainer.style.opacity = '1';
    
    // Highlight the selected virtue in the virtue list
    document.querySelectorAll('.virtue-item').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.virtueKey === virtueKey) {
            el.classList.add('active');
        }
    });
    
    // Make the selected virtue header bold
    document.getElementById('selected-virtue').style.fontWeight = 'bold';
}

// Switch to Dice Page
function switchToDicePage() {
    if (selectedProblems.length === 0) {
        alert('Please select at least one problem');
        return;
    }
    
    // Calculate top virtues
    calculateVirtueScores();
    
    // Hide problem page, show dice page
    document.getElementById('problem-page').style.display = 'none';
    document.getElementById('dice-page').style.display = 'block';
    
    // Hide result container until first roll
    document.getElementById('result-container').style.display = 'none';
    
    // Add compact layout class to reduce empty space
    document.getElementById('dice-page').classList.add('compact-layout');
    
    // Hide dice until first roll
    document.getElementById('dice-page').classList.add('dice-hidden');
    
    // Make container size smaller to fit content
    document.querySelector('.container').classList.add('compact-container');
    
    // Create dice with top virtues (it will be hidden initially)
    createDice();
    
    // Clear any previously active virtues
    document.querySelectorAll('.virtue-item').forEach(el => {
        el.classList.remove('active');
    });
}

// Switch back to Problem Page
function switchToProblemPage() {
    // Hide dice page, show problem page
    document.getElementById('dice-page').style.display = 'none';
    document.getElementById('problem-page').style.display = 'block';
    
    // Remove the compact container class
    document.querySelector('.container').classList.remove('compact-container');
}

// Set up event listeners
function setupEventListeners() {
    // Toggle casual mode
    document.getElementById('toggle-casual').addEventListener('click', toggleCasualMode);
    
    // Refresh problems from the button-row
    document.getElementById('refresh-btn-problem').addEventListener('click', refreshProblems);
    
    // Done button
    document.getElementById('done-btn').addEventListener('click', switchToDicePage);
    
    // Roll button
    document.getElementById('roll-btn').addEventListener('click', rollDice);
    
    // Back button
    document.getElementById('back-btn').addEventListener('click', switchToProblemPage);
    
    // Help buttons on both pages
    document.getElementById('help-btn').addEventListener('click', showHelp);
    document.getElementById('problem-help-btn').addEventListener('click', showHelp);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Check which page is currently visible
        const dicePage = document.getElementById('dice-page');
        const isOnDicePage = dicePage.style.display !== 'none';
        
        // Spacebar for Roll button (when on dice page)
        if (event.key === ' ' && isOnDicePage) {
            event.preventDefault(); // Prevent page scrolling
            rollDice();
        }
        
        // Backspace for Back button (when on dice page)
        if (event.key === 'Backspace' && isOnDicePage) {
            event.preventDefault(); // Prevent browser back
            switchToProblemPage();
        }
    });
    
    // Update Done button style initially
    updateDoneButtonStyle();
    
    // Add listeners to all problem items to update Done button style
    document.querySelectorAll('.problem-item').forEach(item => {
        item.addEventListener('click', updateDoneButtonStyle);
    });
}