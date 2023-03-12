const QRCode = require('qrcode');

async function getQR(userInput) {
	const QRData = userInput;
	const QROptions = {
		errorCorrectionLevel: 'H',
		type: 'png',
		rendererOpts: {
			quality: 0.3,
		},
	};

    QRCode.toFile('qr-code.png', QRData, QROptions, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('QR code saved to qr-code.png');
        }
    })
}

module.exports = getQR;