const sectionAlarmes = document.querySelector('.my-alarms');
const sectionAgenda = document.getElementById('day-message-result');
const buttonSave = document.getElementById('save-agenda');
const buttonDelete = document.getElementById('delete-agenda');
// Array de horarios para despertar, é iniciado com zero, setado novamente em functionAlarms, mas no carregamento da pagina, caso houver localStorage.horarios, ele recebe o valor antigo;
let horarios = [];

// Função feita para retornar o horario atual no formato hh:mm
const getTimeActual = () => {
  const data = new Date();
  const hora = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
  const minutos = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
  return `${hora}:${minutos}`
}
// Função utilizada para remover os intervalos criados pelo setInterval 
const removeIntervals = (horarios) => {
  horarios.forEach((intervalo) => {
    clearInterval(localStorage[intervalo]);
    localStorage.removeItem(intervalo);
  })
};
// Função responsavel por criar os timers de horario e tocar um som quando der certo
const makeAlarms = (horarios) => {
  horarios.forEach(async (horaAlarme) => {
    const dataAlarme = horaAlarme;
    let horaAtual = () => getTimeActual();
    const idIntervalo = setInterval(() => {
      // console.log(`${horaAtual()} === ${dataAlarme}`)
      if (horaAtual() === dataAlarme) {
        document.getElementById('alarme').play();
      }
    }, 1000);
    localStorage[dataAlarme] = idIntervalo;
    // console.log('teste' + horaAlarme)
  })
}

const boxAlarmConstructor = (id) => {
  const div = document.createElement('div');
  div.className = 'box-horario'
  // div.id = id;
  // div.className = 'box-horario'
  div.innerText = id;
  return div;
}

const functionAlarm = (event) => {
  sectionAlarmes.innerText = "";
  const allCheckeds = document.querySelectorAll('input.agenda:checked');
  removeIntervals(horarios);
  horarios = [];
  buttonSave.disabled = true;
  if (allCheckeds.length >= 1) {
    buttonSave.disabled = false;
    allCheckeds.forEach(e => {
      e.checked;
      const hora = e.nextSibling.innerText.split(' ');
      horarios = horarios.concat(hora[0].replace('h', ':'))
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
  removeIntervals(horarios);
  localStorage.removeItem('horarios');
  sectionAlarmes.innerHTML = '';
  const checkeds = document.querySelectorAll('input.agenda:checked');
  if(checkeds) {
    checkeds.forEach((e) => { e.checked = false })
  }
});
window.onload = () => {
  if (localStorage['agenda']) {
    sectionAgenda.innerHTML = localStorage['agenda'];
  }
  // functionAlarm();
  if (localStorage['horarios']) {
    sectionAlarmes.innerHTML = localStorage['horarios'];
    horarios = sectionAlarmes.innerHTML.match(/[\d]{2}:[\d]{2}/g);
    removeIntervals(horarios);
    makeAlarms(horarios);
  }
  iniciaRelogio();
  iniciaLista();
}