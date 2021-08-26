const messageReader = (string) => {
	console.log(string)
	string = string.replace(/[ÀÁÂÃÄÅ]/, "A");
	string = string.replace(/[àáâãäå]/, "a");
	string = string.replace(/[ÈÉÊË]/, "E");
	string = string.replace(/[Ç]/, "C");
	string = string.replace(/[ç]/, "c");
	console.log(string)
	//console.log(String(string).split((/\r?\n/)));
	//return string.toString().split(/\r?\n/)//.	reduce((acc, cur) => [...acc, cur], []);
	return string.match(/([^\\\r\n]{1,51}|)[0-9]{2}\h[0-9]{2}[^\\\r\n]{1,8}[0-9]{2}\h{1}[0-9]{2}/g)//[^\\\r\n]{1,}/g); // regex to day message
} 
	

const sendMessageButton = document.getElementById('day-message-button');

sendMessageButton.addEventListener('click', () => {
	const message = document.getElementById('day-message').value;
	console.log(messageReader(message));
});