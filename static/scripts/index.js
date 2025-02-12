const runSingleRequest = document.getElementById('runSingleRequest');
const runConcurrentRequest = document.getElementById('runConcurrentRequest');
const loader = document.getElementById('loader');

const resultsSection1 = document.getElementById('results1');
const resultsText1 = document.getElementById('results-text1');

const resultsSection2 = document.getElementById('results2');
const resultsText2 = document.getElementById('results-text2');

const clearBtn1 = document.getElementById('clear-btn1');
const clearBtn2 = document.getElementById('clear-btn2');

// Function to test concurrency
async function sendSingleRequest() {
    loader.classList.remove('hidden'); // Show loader
    resultsSection1.classList.add('hidden'); // Hide results

    try {
        // Fetch results from the //async-task endpoint
        let startTime = new Date().getTime();
        const response = await fetch('/async-task');
        let endTime = new Date().getTime();
        const data = await response.json();

        // Display results
        data.total_time_seconds = ((endTime-startTime)/1000).toFixed(2);
        resultsText1.textContent = JSON.stringify(data, null, 2);;
        resultsSection1.classList.remove('hidden'); // Show results
    } catch (error) {
        resultsText1.textContent = 'Error fetching results. Check the console for details.';
        console.error(error);
    } finally {
        loader.classList.add('hidden'); // Hide loader
    }
}

async function sendConcurrentRequests() {
    loader.classList.remove('hidden'); // Show loader
    resultsSection2.classList.add('hidden'); // Hide results

    try {
        // Fetch results from the /test-concurrency endpoint
        const response = await fetch('/test-concurrency');
        const data = await response.json();

        // Display results
        resultsText2.textContent = JSON.stringify(data, null, 2);
        resultsSection2.classList.remove('hidden'); // Show results
    } catch (error) {
        resultsText2.textContent = 'Error fetching results. Check the console for details.';
        console.error(error);
    } finally {
        loader.classList.add('hidden'); // Hide loader
    }
}

// Function to clear results
function clearResults1() {
    resultsSection1.classList.add('hidden'); // Hide results
    resultsText1.textContent = ''; // Clear text
}

function clearResults2() {
    resultsSection2.classList.add('hidden'); // Hide results
    resultsText2.textContent = ''; // Clear text
}

// Attach event listeners
runSingleRequest.addEventListener('click', sendSingleRequest);
runConcurrentRequest.addEventListener('click', sendConcurrentRequests);
clearBtn1.addEventListener('click', clearResults1);
clearBtn2.addEventListener('click', clearResults2);


const concurrencyFeature = document.getElementById('concurrency-btn');
const resetLayout = document.getElementById('reset');
const landing = document.getElementById('landing');

const concurrencyCodeLayout = document.getElementById('concurrency-mkdwn-cont');
const concurrencyVisualLayout = document.getElementById('concurrency-visual-cont');

const websocketFeature = document.getElementById("web-socket-btn");
const chatContainer = document.getElementById('websocket-chat-window');
const websocketDescription = document.getElementById("websocket-description");


function showLandingLayout() {
    landing.classList.remove('hidden');
    resetLayout.classList.add('hidden'); // Hide results

    concurrencyCodeLayout.classList.replace('show-flex', 'hidden');
    concurrencyVisualLayout.classList.replace('show-flex', 'hidden');

    chatContainer.classList.add('hidden');
    websocketDescription.classList.add('hidden');
}

function showConcurrencyLayout() {
    landing.classList.add('hidden');
    resetLayout.classList.remove('hidden');

    concurrencyCodeLayout.classList.replace('hidden', 'show-flex');
    concurrencyVisualLayout.classList.replace('hidden', 'show-flex');
}

function showWebsocketLayout() {
    landing.classList.add('hidden'); 
    resetLayout.classList.remove('hidden');

    chatContainer.classList.remove('hidden');
    websocketDescription.classList.remove('hidden');
}

concurrencyFeature.addEventListener('click', showConcurrencyLayout);
websocketFeature.addEventListener('click', showWebsocketLayout);
resetLayout.addEventListener('click', showLandingLayout);

