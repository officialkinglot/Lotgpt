 app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const options = {
            method: 'GET',
            url: 'https://chat-gpt-3-5-turbo2.p.rapidapi.com/problem.json',
            params: { question: prompt },
            headers: {
                'x-rapidapi-key': "e54a1fb94fmshb4d147683caa9bep16ef30jsn8a41fea8c0ff",
                'x-rapidapi-host': 'chat-gpt-3-5-turbo2.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        // Log the full response to see what is returned
        console.log('API response:', response.data);

        // Return the response to the frontend, adjust if needed
        res.status(200).send({
            bot: response.data.answer || "No answer found"  // Ensure you are sending the correct field
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Something went wrong');
    }
});
