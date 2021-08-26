const sectionAlarmes = document.querySelector('.day-alarm-section');
const sectionAgenda = document.getElementById('day-message-result');

const returnHora = (e) => {

}


const functionAlarm = () => {
  const allCheckeds = document.querySelectorAll('input.agenda:checked');
  let horarios = [];
  if(allCheckeds){
    console.log(allCheckeds);
    // allCheckeds.forEach(returnHora)
    allCheckeds.forEach(e => {
      const hora = e.nextSibling.innerText;
      console.log(hora.split(' ')[0])
    })
  }
}

sectionAgenda.addEventListener('click', functionAlarm);