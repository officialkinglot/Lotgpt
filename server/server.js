 const url = 'https://chat-gpt-3-5-turbo2.p.rapidapi.com/problem.json?question=hello';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'e54a1fb94fmshb4d147683caa9bep16ef30jsn8a41fea8c0ff', // Replace with your actual key
		'x-rapidapi-host': 'chat-gpt-3-5-turbo2.p.rapidapi.com'
	}
};

const fetchData = async () => {
    try {
        const response = await fetch(url, options);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse response as JSON
        const result = await response.json();  // Change to json() to handle JSON response
        console.log(result);
        
        // Access specific fields in the response if necessary
        if (result.answer) {
            console.log('Answer:', result.answer);
        } else {
            console.log('Unexpected response structure:', result);
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

// Call the function to execute the request
fetchData();
