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
	if (result.length === 0) return;
	result.forEach((cur) => {
		const optional = cur.match(/\[\*\]/) ? true : false;
		const time = cur.match(/[0-9]{2}\h[0-9]{2}[^\\\r\n]{1,8}[0-9]{2}\h{1}[0-9]{2}/g)[0]; // get time
		const content = (optional ? 'Opcional* - ' : '') + cur.split(time)[1].match(/[^\-]/g).join('').trim() //get content
		document.getElementById('day-message-result').appendChild(createCheckbox(content, time));
	});
}


const sendMessageButton = document.getElementById('day-message-button');

sendMessageButton.addEventListener('click', () => {
	const message = document.getElementById('day-message').value;
	displayMessageResult(messageReader(message));
});