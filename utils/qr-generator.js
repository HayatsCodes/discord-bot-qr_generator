const QRCode = require('qrcode');

async function QRGenerator(userInput, backgroundColor, foregroundColor) {
	const QRData = userInput;
	const QROptions = {
		errorCorrectionLevel: 'H',
		type: 'png',
		rendererOpts: {
			quality: 1,
		},
		color: {
			dark: foregroundColor,
			light: backgroundColor,
		},
	};

	await QRCode.toFile('qr-code.png', QRData, QROptions, (err) => {
		if (err) {
			console.error(err);
		}
		else {
			console.log('QR code saved to qr-code.png');
		}
	});
}

module.exports = QRGenerator;