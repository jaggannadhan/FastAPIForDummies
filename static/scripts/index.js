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