const sectionAlarmes = document.querySelector('.my-alarms');
const sectionAgenda = document.getElementById('day-message-result');
const buttonSave = document.getElementById('save-agenda');
const buttonDelete = document.getElementById('delete-agenda');


const makeAlarms = (horarios) => {
  horarios.forEach((horaAlarme) => {

  })
}

const boxAlarmConstructor = (id) => {
  const div = document.createElement('div');
  div.className = 'box-horario'
  div.id = id;
  div.innerText = id;
  return div;
}

const functionAlarm = (event) => {
  sectionAlarmes.innerText = "";
  const allCheckeds = document.querySelectorAll('input.agenda:checked');
  let horarios = [];
  buttonSave.disabled = true;
  buttonDelete.disabled = true;
  if(allCheckeds.length >= 1){
    buttonSave.disabled = false;
    buttonDelete.disabled = false;
    allCheckeds.forEach(e => {
      e.checked;
      const hora = e.nextSibling.innerText.split(' ');
      horarios = horarios.concat(hora[0].replace('h',':'))
    })
  }
  sectionAlarmes.innerHTML = '';
  horarios.forEach((horario) => sectionAlarmes.appendChild(boxAlarmConstructor(horario)));
  makeAlarms(horarios);
}


sectionAgenda.addEventListener('click', functionAlarm);
// escutador de eventos do botão "enviar", que salva as mensagem no localStorage
sendMessageButton.addEventListener('click', () => {
  localStorage.removeItem('agenda');
  const dados = sectionAgenda.innerHTML;
  localStorage['agenda'] = dados;
})

// escutador de evento para salvar os horarios no local, Storage
buttonSave.addEventListener('click', () => {
  localStorage.removeItem('horarios');
  const agenda = sectionAgenda.innerHTML;
  localStorage['agenda'] = agenda;
  const dados = sectionAlarmes.innerHTML;
  localStorage['horarios'] = dados;
})
// escutador de evento para eliminar os horarios
buttonDelete.addEventListener('click', () => {
  localStorage.removeItem('horarios');
  sectionAlarmes.innerHTML = '';
  document.querySelectorAll('input.agenda:checked').forEach((e) => {e.checked = false})
});
window.onload = () => {
  if(localStorage['agenda']) {
    sectionAgenda.innerHTML = localStorage['agenda'];
  }
  functionAlarm();
  if(localStorage['horarios']) {
    sectionAlarmes.innerHTML = localStorage['horarios'];
  }
  iniciaRelogio();
}