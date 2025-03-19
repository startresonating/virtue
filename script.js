// Global variables
let selectedProblems = [];
let casualMode = false;
let topVirtues = [];
let isRolling = false;
let currentFace = 0;
let lastPrompts = {}; // Track the last prompt shown for each virtue

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
    let randomProblems = getRandomItems(allProblems, 16);
    
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
    
    let randomProblems = getRandomItems(allProblems, 16);
    console.log("Selected random problems:", randomProblems);
    
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

// Function to refresh the problems grid
function refreshProblems() {
    // Clear selected problems
    selectedProblems = [];
    
    // Re-initialize the problem page
    initProblemPage();
    
    console.log("Problems refreshed");
}

// Get random items from an array
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Toggle selection of a problem
function toggleProblemSelection(element, problemKey) {
    element.classList.toggle('selected');
    
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
    
    // Update header to new simpler text
    document.getElementById('top-virtues').textContent = "These virtues might help:";
    
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

// Roll the dice and display result
function rollDice() {
    if (isRolling) return;
    isRolling = true;
    
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
    
    // Select a random face (0-5)
    const randomFaceIndex = Math.floor(Math.random() * 6);
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
    
    // Refresh problems
    document.getElementById('refresh-btn').addEventListener('click', refreshProblems);
    
    // Done button
    document.getElementById('done-btn').addEventListener('click', switchToDicePage);
    
    // Roll button
    document.getElementById('roll-btn').addEventListener('click', rollDice);
    
    // Back button (formerly Redo button)
    document.getElementById('back-btn').addEventListener('click', switchToProblemPage);
    
    // Help button
    document.getElementById('help-btn').addEventListener('click', showHelp);
    
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