// Master Recipe Templates (Categorized with standard ingredients)
// NOTE: every ingredient string below matches exactly one inventory button
// in index.html — this is required for the game to be completable.
const recipeTemplates = [
    // --- Teas & Tea Lattes ---
    {
        baseName: "FULL-LEAF BREWED TEA",
        baseIngredients: ["Sachet", "Hot Water", "Steep Tea", "Sugar Cane", "Ice"]
    },
    {
        baseName: "PURE MATCHA LATTE",
        baseIngredients: ["Milk", "Matcha Powder", "Sugar Cane"]
    },
    {
        baseName: "CHAI TEA LATTE",
        baseIngredients: ["Chai Concentrate", "Hot Water", "Milk"]
    },
    {
        baseName: "ICED BLACK TEA LATTE",
        baseIngredients: ["Sugar Cane", "Black Tea Concentrate", "Milk", "Ice"]
    },
    {
        baseName: "SHAKEN ICED TEA",
        baseIngredients: ["Black Tea Concentrate", "Water", "Sugar Cane", "Ice"]
    },
    {
        baseName: "SHAKEN ICED BLACK TEA W/ GFS",
        baseIngredients: ["Ruby Grapefruit Sauce", "Teavana Black Tea", "Water", "Sugar Cane", "Ice"]
    },

    // --- Frappuccinos & Blended Bevs ---
    {
        baseName: "COFFEE FRAPPUCCINO",
        baseIngredients: ["Frappuccino Roast", "Milk", "Syrup", "Coffee Frapp Syrup Base", "Ice", "Whipped Cream"]
    },
    {
        baseName: "CARAMEL FRAPPUCCINO",
        baseIngredients: ["Frappuccino Roast", "Milk", "Caramel Drink Base", "Sugar Cane", "Coffee Frapp Syrup Base", "Ice", "Whipped Cream", "Caramel Drizzle"]
    },
    {
        baseName: "MOCHA FRAPPUCCINO",
        baseIngredients: ["Frappuccino Roast", "Milk", "Mocha Sauce", "Coffee Frapp Syrup Base", "Ice", "Whipped Cream"]
    },
    {
        baseName: "JAVA CHIP FRAPP",
        baseIngredients: ["Frappuccino Roast", "Milk", "Mocha Sauce", "Coffee Frapp Syrup Base", "Frapp Chips", "Ice", "Whipped Cream", "Mocha Drizzle"]
    },
    {
        baseName: "MATCHA CREAM FRAPP",
        baseIngredients: ["Milk", "Matcha Powder", "Sugar Cane", "Frapp Cream Base", "Ice", "Whipped Cream"]
    },
    {
        baseName: "STRAWBERRIES AND CREAM FRAPP",
        baseIngredients: ["Milk", "Strawberry Base", "Frapp Cream Base", "Ice", "Whipped Cream"]
    },

    // --- Refreshers ---
    {
        baseName: "STRAWBERRY ACAI REFRESHER",
        baseIngredients: ["Strawberry Base", "Water", "Lemonade", "Sugar Cane", "Dried Strawberry", "Ice"]
    },
    {
        baseName: "PINK DRINK",
        baseIngredients: ["Strawberry Base", "Water", "Coconut Milk", "Sugar Cane", "Dried Strawberry", "Ice"]
    },
    {
        baseName: "MANGO DRAGONFRUIT LEMONADE",
        baseIngredients: ["Mango Dragonfruit Base", "Water", "Lemonade", "Sugar Cane", "Dried Mango", "Ice"]
    },
    {
        baseName: "DRAGON DRINK",
        baseIngredients: ["Mango Dragonfruit Base", "Water", "Coconut Milk", "Sugar Cane", "Dried Mango", "Ice"]
    },

    // --- Espresso & Hot Bar ---
    {
        baseName: "CAFFE LATTE",
        baseIngredients: ["Espresso Shot", "Milk", "Syrup"]
    },
    {
        baseName: "ICED CAFFE LATTE",
        baseIngredients: ["Espresso Shot", "Milk", "Ice"]
    },
    {
        baseName: "CAFFE MOCHA",
        baseIngredients: ["Espresso Shot", "Mocha Sauce", "Milk", "Whipped Cream"]
    },
    {
        baseName: "CARAMEL MACCHIATO",
        baseIngredients: ["Vanilla Syrup", "Milk", "Espresso Shot", "Caramel Drizzle"]
    },
    {
        baseName: "ICED CARAMEL MACCHIATO",
        baseIngredients: ["Vanilla Syrup", "Milk", "Ice", "Espresso Shot", "Caramel Drizzle"]
    }
];

const cupSizes = ["Tall Cup", "Grande Cup", "Venti Cup"];
const BEST_SCORE_KEY = "baristaBestScore";

// Maps every ingredient to a visual "family" so it renders as the right
// colored layer in the cup (cream for milk, roast brown for coffee, etc).
const INGREDIENT_FAMILY = {
    "Milk": "milk", "Oat Milk": "milk", "Almond Milk": "milk", "Coconut Milk": "milk",
    "Breve": "milk", "Water": "milk", "Lemonade": "milk", "Coconut Water": "milk",
    "Sachet": "tea", "Hot Water": "tea", "Steep Tea": "tea", "Teavana Black Tea": "tea",
    "Black Tea Concentrate": "tea", "Hibiscus Tea Concentrate": "tea", "Chai Concentrate": "tea", "Cold Brew": "tea",
    "Strawberry Base": "fruit", "Mango Dragonfruit Base": "fruit", "Ruby Grapefruit Sauce": "fruit",
    "Pearls": "fruit", "Coffee Jelly": "fruit", "Dried Strawberry": "fruit", "Dried Mango": "fruit",
    "Vanilla Syrup": "syrup", "Caramel Syrup": "syrup", "Hazelnut Syrup": "syrup", "Sugar Cane": "syrup", "Syrup": "syrup",
    "Matcha Powder": "coffee", "Mocha Powder": "coffee", "Frappuccino Roast": "coffee",
    "Espresso Shot": "coffee", "Ristretto Shots": "coffee", "Coffee": "coffee",
    "Coffee Frapp Syrup Base": "frapp", "Frapp Cream Base": "frapp", "Caramel Drink Base": "frapp",
    "Mocha Sauce": "frapp", "Frapp Chips": "frapp", "Blend": "frapp",
    "Ice": "topping", "Whipped Cream": "topping", "Sweet Whipped Cream": "topping",
    "Caramel Drizzle": "topping", "Mocha Drizzle": "topping", "Matcha Premix": "topping"
};

function familyOf(name) {
    return INGREDIENT_FAMILY[name] || "other";
}

// Filters inventory buttons live as the person types in a sidebar search box.
// scope is 'game' or 'sim'; hides whole categories once none of their items match.
function filterIngredients(scope, query) {
    const containerId = scope === 'sim' ? 'inventory-scroll-sim' : 'inventory-scroll-game';
    const noResultsId = scope === 'sim' ? 'no-results-sim' : 'no-results-game';
    const container = document.getElementById(containerId);
    const noResults = document.getElementById(noResultsId);
    if (!container) return;

    const q = query.trim().toLowerCase();
    let anyVisible = false;

    container.querySelectorAll('.inventory-category').forEach(category => {
        let categoryHasMatch = false;
        category.querySelectorAll('.ingredient-btn').forEach(btn => {
            const matches = q === '' || btn.textContent.toLowerCase().includes(q);
            btn.style.display = matches ? '' : 'none';
            if (matches) categoryHasMatch = true;
        });
        category.style.display = categoryHasMatch ? '' : 'none';
        if (categoryHasMatch) anyVisible = true;
    });

    if (noResults) noResults.style.display = anyVisible ? 'none' : 'block';
}

function cupSizeFrom(name) {
    if (name === "Tall Cup") return "tall";
    if (name === "Grande Cup") return "grande";
    if (name === "Venti Cup") return "venti";
    return null;
}

// Game State Variables
let score = 0;
let streak = 0;
let bestScore = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
let timeLeft = 150;
let timerInterval = null;
let gameActive = false;
let currentOrderIndex = 0;
let currentOrder = null;
let playerBuild = [];
let simBuild = [];

// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const scoreDisplay = document.getElementById('score-display');
const streakDisplay = document.getElementById('streak-display');
const bestDisplay = document.getElementById('best-display');
const ticketDrinkName = document.getElementById('ticket-drink-name');
const ticketRecipeList = document.getElementById('ticket-recipe-list');
const orderCounter = document.getElementById('order-counter');
const buildSlots = document.getElementById('build-slots');
const cupShell = document.getElementById('cup-shell');
const cupSizeLabel = document.getElementById('cup-size-label');
const workbenchProgress = document.getElementById('workbench-progress');
const startModal = document.getElementById('start-modal');
const gameoverModal = document.getElementById('gameover-modal');
const finalStatsText = document.getElementById('final-stats-text');
const ticketCard = document.getElementById('ticket-card');
const workspaceArea = document.getElementById('workspace-area');
const gameStatsHeader = document.getElementById('game-stats-header');
const simBuildSlots = document.getElementById('sim-build-slots');
const simCupShell = document.getElementById('sim-cup-shell');
const simCupSizeLabel = document.getElementById('sim-cup-size-label');
const simResultBox = document.getElementById('sim-result-box');
const recipeGuideGrid = document.getElementById('recipe-guide-grid');

// View Switcher Function (event passed explicitly, no reliance on implicit global)
function switchView(viewName, evt) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.add('active');
    if (evt && evt.currentTarget) evt.currentTarget.classList.add('active');

    gameStatsHeader.style.display = viewName === 'game' ? 'flex' : 'none';

    if (viewName === 'learn') {
        renderRecipeGuide();
    }
}

// Render Learn Page Guide Cards
function renderRecipeGuide() {
    recipeGuideGrid.innerHTML = '';
    recipeTemplates.forEach((template) => {
        const card = document.createElement('div');
        card.className = 'recipe-guide-card';

        let stepsHTML = `<li>1. [Tall / Grande / Venti] Cup</li>`;
        template.baseIngredients.forEach((ing, i) => {
            stepsHTML += `<li>${i + 2}. ${ing}</li>`;
        });

        card.innerHTML = `
            <h3>${template.baseName}</h3>
            <ol>${stepsHTML}</ol>
        `;
        recipeGuideGrid.appendChild(card);
    });
}

function updateBestDisplay() {
    if (bestDisplay) bestDisplay.textContent = bestScore;
}

function startGame() {
    startModal.style.display = 'none';
    score = 0;
    streak = 0;
    timeLeft = 150;
    currentOrderIndex = 1;
    gameActive = true;
    updateStats();
    updateTimerDisplay();
    updateBestDisplay();
    loadNewOrder();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(Math.max(timeLeft, 0) / 60);
    const seconds = Math.max(timeLeft, 0) % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (timeLeft <= 20) {
        timerDisplay.style.color = 'var(--error-red)';
    } else {
        timerDisplay.style.color = '';
    }
}

function updateStats() {
    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;
    orderCounter.textContent = `Order #${currentOrderIndex}`;
}

// Randomize Order with Dynamic TGV Cup Sizes
function loadNewOrder() {
    const randomTemplate = recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)];
    const randomCup = cupSizes[Math.floor(Math.random() * cupSizes.length)];
    const sizePrefix = randomCup.replace(" Cup", "").toUpperCase();

    currentOrder = {
        name: `${sizePrefix} ${randomTemplate.baseName}`,
        ingredients: [randomCup, ...randomTemplate.baseIngredients]
    };

    ticketDrinkName.textContent = currentOrder.name;
    ticketRecipeList.innerHTML = '';

    currentOrder.ingredients.forEach((ing, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${ing}`;
        ticketRecipeList.appendChild(li);
    });

    clearWorkbench();
    updateStats();
}

// Training Game Build Logic
function addIngredient(itemName) {
    if (!gameActive) return;
    playerBuild.push(itemName);
    renderWorkbench();
}

function removeIngredient(index) {
    if (!gameActive) return;
    playerBuild.splice(index, 1);
    renderWorkbench();
}

function clearWorkbench() {
    playerBuild = [];
    renderWorkbench();
}

// Shared renderer: draws a stack of ingredients as cup "layers".
// - items: the array of ingredient names built so far
// - expectedOrder: the correct ingredient list to compare against (or null for freeform sandbox mode)
// - bodyEl / shellEl / labelEl: the DOM nodes for this cup instance
// - removeFnName: name of the global function to call when a layer's × is clicked
function renderCup(items, expectedOrder, bodyEl, shellEl, labelEl, removeFnName, emptyText) {
    bodyEl.innerHTML = '';

    // The first item, if it's a cup size, controls the cup's size/label instead
    // of rendering as a layer — everything after it stacks bottom-to-top.
    const hasLeadingCup = items.length > 0 && cupSizeFrom(items[0]) !== null;
    const size = hasLeadingCup ? cupSizeFrom(items[0]) : null;

    shellEl.dataset.size = size || 'none';
    labelEl.textContent = size ? items[0].replace(' Cup', '').toUpperCase() : 'Select a cup';

    const layerItems = hasLeadingCup ? items.slice(1) : items;

    if (layerItems.length === 0 && !hasLeadingCup) {
        bodyEl.innerHTML = `<span class="empty-slot-text">${emptyText}</span>`;
        return;
    }
    if (layerItems.length === 0) {
        bodyEl.innerHTML = '<span class="empty-slot-text">Now add ingredients, in order.</span>';
        return;
    }

    layerItems.forEach((item, i) => {
        const realIndex = hasLeadingCup ? i + 1 : i;
        const layerDiv = document.createElement('div');
        let statusClass = '';
        let statusIcon = '';
        if (expectedOrder) {
            const expected = expectedOrder[realIndex];
            if (expected === item) {
                statusClass = 'layer-correct';
                statusIcon = '<span class="layer-status">✓</span>';
            } else {
                statusClass = 'layer-wrong';
                statusIcon = '<span class="layer-status">✕</span>';
            }
        }
        layerDiv.className = `cup-layer family-${familyOf(item)} ${statusClass}`;
        layerDiv.innerHTML = `
            <span class="layer-step">${realIndex + 1}</span>
            <span class="layer-name">${item}</span>
            ${statusIcon}
            <button class="layer-remove" onclick="${removeFnName}(${realIndex})">×</button>
        `;
        bodyEl.appendChild(layerDiv);
    });
}

function renderWorkbench() {
    renderCup(playerBuild, currentOrder ? currentOrder.ingredients : null, buildSlots, cupShell, cupSizeLabel, 'removeIngredient', 'Your cup is empty. Click inventory items to build.');
    if (workbenchProgress) {
        const total = currentOrder ? currentOrder.ingredients.length : 0;
        workbenchProgress.textContent = `${playerBuild.length} / ${total} steps`;
    }
}

function submitOrder() {
    if (!gameActive) return;

    const isCorrect =
        playerBuild.length === currentOrder.ingredients.length &&
        playerBuild.every((val, idx) => val === currentOrder.ingredients[idx]);

    if (isCorrect) {
        score += 100 + (streak * 10);
        streak++;
        currentOrderIndex++;
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem(BEST_SCORE_KEY, String(bestScore));
            updateBestDisplay();
        }

        workspaceArea.classList.add('flash-success');
        setTimeout(() => workspaceArea.classList.remove('flash-success'), 400);

        loadNewOrder();
    } else {
        streak = 0;
        updateStats();

        ticketCard.classList.add('shake');
        setTimeout(() => ticketCard.classList.remove('shake'), 400);
    }
}

// Simulator / Sandbox Mode Logic
function addSimIngredient(itemName) {
    simBuild.push(itemName);
    renderSimWorkbench();
}

function removeSimIngredient(index) {
    simBuild.splice(index, 1);
    renderSimWorkbench();
}

function clearSimWorkbench() {
    simBuild = [];
    simResultBox.textContent = '';
    renderSimWorkbench();
}

function renderSimWorkbench() {
    renderCup(simBuild, null, simBuildSlots, simCupShell, simCupSizeLabel, 'removeSimIngredient', 'Workspace empty. Build your custom drink!');
}

function testSimRecipe() {
    if (simBuild.length === 0) {
        simResultBox.style.color = 'var(--error-red)';
        simResultBox.textContent = 'Please add ingredients to your simulator workspace first!';
        return;
    }

    const matchedTemplate = recipeTemplates.find(template => {
        const fullRecipe = [simBuild[0], ...template.baseIngredients];
        return fullRecipe.length === simBuild.length &&
               fullRecipe.every((val, idx) => val === simBuild[idx]);
    });

    if (matchedTemplate) {
        simResultBox.style.color = 'var(--success-green)';
        simResultBox.textContent = `✨ Perfect match! This is a valid "${matchedTemplate.baseName}" recipe.`;
    } else {
        simResultBox.style.color = 'var(--sb-dark-green)';
        simResultBox.textContent = `☕ Custom Creation! Experimental beverage recorded.`;
    }
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    const drinksMade = currentOrderIndex - 1;
    const newBest = score > 0 && score >= bestScore && drinksMade > 0;
    finalStatsText.innerHTML = `Shift complete! You successfully crafted <b>${drinksMade}</b> drink${drinksMade === 1 ? '' : 's'} with a final score of <b>${score}</b> points.${newBest ? ' 🏆 New best score!' : ''}`;
    gameoverModal.style.display = 'flex';
}

function restartGame() {
    gameoverModal.style.display = 'none';
    startGame();
}

// Quality-of-life: Enter submits the current order while the training game is active
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const gameView = document.getElementById('view-game');
    if (gameActive && gameView && gameView.classList.contains('active')) {
        submitOrder();
    }
});

// Initialize best-score display on load
updateBestDisplay();