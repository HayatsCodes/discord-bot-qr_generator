const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const QRGenerator = require('../utils/qr-generator');

// Instantiate a slash command for the bot
const data = new SlashCommandBuilder()
	.setName('generate')
	.setDescription('generates qr code')
	.addStringOption(option => {
		return option.setName('input')
			.setDescription('The characters you want to embed in the QR code')
			.setRequired(true);
	})
	.addStringOption(option => {
		return option.setName('background-color')
			.setDescription('Background color of choice')
			.addChoices(
				{ name: 'White', value: '#FFFFFF' },
				{ name: 'Black', value: '#000000' },
				{ name: 'Red', value: '#FF0000' },
				{ name: 'Green', value: '#00FF00' },
				{ name: 'Blue', value: '#0000FF' },
				{ name: 'Yellow', value: '#FFFF00' },
			);
	})
	.addStringOption(option => {
		return option.setName('foreground-color')
			.setDescription('Foreground color of choice')
			.addChoices(
				{ name: 'Black', value: '#000000' },
				{ name: 'White', value: '#FFFFFF' },
				{ name: 'Red', value: '#FF0000' },
				{ name: 'Green', value: '#00FF00' },
				{ name: 'Blue', value: '#0000FF' },
				{ name: 'Yellow', value: '#FFFF00' },
			);
	});

// Exexcuting the slash command
const execute = async function execute(interaction) {
	const input = interaction.options.getString('input');
	const backgroundColor = interaction.options.getString('background-color') ?? '#FFFFFF';
	const foregroundColor = interaction.options.getString('foreground-color') ?? '#000000';
	await QRGenerator(input, backgroundColor, foregroundColor);

	const file = new AttachmentBuilder('qr-code.png');

	const QREmbed = new EmbedBuilder()
		.setTitle('QR Code')
		.setDescription(`QR code for '${input}'`)
		.setImage('attachment://qr-code.png');
	// Defer reply until the qr-code image is ready
	await interaction.deferReply();
	// Now edit the reply with the qr-code image
	await interaction.editReply({ embeds: [QREmbed], files: [file] });
};


module.exports = {
	data,
	execute,
};