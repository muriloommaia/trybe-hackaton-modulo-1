const messageReader = (string) => 
	String(string).match(/[0-9]{2}\h[0-9]{2} às [0-9]{2}\h[0-9]{2} - .{1,200}/g); // regex to day message

const sendMessageButton = document.getElementById('day-message-button');

sendMessageButton.addEventListener('click', () => {
	const message = document.getElementById('day-message').value;
	console.log(messageReader(message));
});