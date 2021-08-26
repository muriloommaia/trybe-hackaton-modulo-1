const messageReader = (string) => {
	string = string.replace(/[ÀÁÂÃÄÅ]/, "A");
	string = string.replace(/[àáâãäå]/, "a");
	string = string.replace(/[ÈÉÊË]/, "E");
	string = string.replace(/[Ç]/, "C");
	string = string.replace(/[ç]/, "c");
	return String(string).match(/(\[\*[^\\\r\n]{1,5}|)[0-9]{2}\h[0-9]{2}[^\\\r\n]{1,7}[0-9]{2}\h[0-9]{2}[^\\\r\n]{1,}[^\\\r\n]/g); // regex to day message
} 
	

const sendMessageButton = document.getElementById('day-message-button');

sendMessageButton.addEventListener('click', () => {
	const message = document.getElementById('day-message').value;
	console.log(messageReader(message));
});