const messageReader = (string) => {
	string = string.replace(/[ÀÁÂÃÄÅ]/, "A");
	string = string.replace(/[àáâãäå]/, "a");
	string = string.replace(/[ÈÉÊË]/, "E");
	string = string.replace(/[Ç]/, "C");
	string = string.replace(/[ç]/, "c");
	return string.match(/([\[\*\] ]{1,5}|)[0-9]{2}\h[0-9]{2}[^\\\r\n]{1,8}[0-9]{2}\h{1}[0-9]{2}[^\\\r\n]{1,}/g) // regex to day message
} 

const createCheckbox = (text, time) => {
	const newCheckbox = document.createElement('label');
	const checkbox = document.createElement('input');
	const newSpanTime = document.createElement('span');
	const checkboxInput = document.createElement('span');
	newSpanTime.style.display = 'none';
	newSpanTime.innerText = time;
	checkbox.type = 'checkbox';
	checkboxInput.innerText = text;
	newCheckbox.appendChild(checkbox);
	newCheckbox.appendChild(newSpanTime);
	newCheckbox.appendChild(checkboxInput);
	return newCheckbox;
}

const displayMessageResult = (result) => {
	result.forEach((cur) => {
		document.getElementById('day-message-result').appendChild(createCheckbox(cur, '10h20 as 20h21'));
	})
}


const sendMessageButton = document.getElementById('day-message-button');

sendMessageButton.addEventListener('click', () => {
	const message = document.getElementById('day-message').value;
	displayMessageResult(messageReader(message));
});