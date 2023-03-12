/* eslint-disable brace-style */
const axios = require('axios');

async function getQR(userInput) {
	try {
		const response = await axios.get(`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${userInput}`, {
			responseType: ArrayBuffer,
		});
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
}

module.exports = getQR;