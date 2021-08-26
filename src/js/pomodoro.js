const tagDisplayAtual = document.querySelector('.display');
const tagDisplayBreak = document.querySelector('.display-break');
const tagDisplayStudy = document.querySelector('.display-study');
const buttonUpBreak = document.querySelector('.up-break');
const buttonDownBreak = document.querySelector('.down-break');
const buttonUpStudy = document.querySelector('.up-study');
const buttonDownStudy = document.querySelector('.down-study');
const buttonStart = document.querySelector('.start-stop-button');
const buttonReset = document.querySelector('.reset-button');
const timerAtual = document.querySelector('.this-time');
const divDisplay = document.querySelector('.div-display');

// o tempo do displayBreak e do displauStudy são setados em 6 e 20 minutos
let [displayBreak, displayStudy] = [5 * 60, 20 * 60];
// inicialmente o tempo do Display principal será o tempo de estudo, uma vez que o relogio começa no estudo
let displayTime = displayStudy;
// Tanto o timer quanto a pausa iniciam setadas como falsa. Ou seja, ao recarregar o timer esta desligado e volta ao tempo de estudo
let [timerOn, onBreak] = [false, false];
// função que verifica se o timer esta acontecendo para saber qual icone coloca no botão
const iconPause = () => {
  timerOn ?
    buttonStart.innerHTML = '<i class="fas fa-pause"></i>' :
    buttonStart.innerHTML = '<i class="fas fa-play"></i>'
}
// Função chamada para alteração de turno no display do tempo atual
const mudancaTurno = () => {
  // console.log('teste')
  if (onBreak) {
    timerAtual.innerText = 'Descanso'
  } else {
    timerAtual.innerText = 'Estudar'
  }
}
// função criada para deixar o tempo no formato certo de dar append no display
const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return (
    (minutes < 10 ? `0${minutes}` : minutes) +
    ":" +
    (seconds < 10 ? `0${seconds}` : seconds)
  )
}
// função criada para dar innertext no display
const innerTextDisplay = (parent, time) => {
  parent.innerText = formatTime(time);
};
// função usada para quando um botão de mudança de tempo for clicado
const mudancaTempo = (mudanca, type) => {
  if (type === 'break') {
    if(timerOn) return ;

    // Aqui é definido que o tempo maximo para descanso é 20 minutos
    if (mudanca > 0 && displayBreak < 20 * 60) {
      displayBreak += mudanca;
    }
    // Aqui validamos que o tempo minimo de descanso é 1 minuto
    if (mudanca < 0 && displayBreak > 1 * 60) {
      displayBreak += mudanca;
    }
    innerTextDisplay(tagDisplayBreak, displayBreak);
  } else {
    if(timerOn) return ;
    // Aqui é definido que o tempo maximo para estudo é 60 minutos
    if (mudanca > 0 && displayStudy < 60 * 60) {
      displayStudy += mudanca;
      displayTime += mudanca;
    }
    // Aqui validamos que o tempo minimo de estudo é 1 minuto
    if (mudanca < 0 && displayStudy > 1 * 60) {
      displayStudy += mudanca;
      displayTime += mudanca;
    }
    innerTextDisplay(tagDisplayStudy, displayStudy);
    innerTextDisplay(tagDisplayAtual, displayTime);
  }
}
// Escutador de eventos para os botoes de descanso
buttonDownBreak.addEventListener('click', () => mudancaTempo(-60, 'break'));
buttonUpBreak.addEventListener('click', () => mudancaTempo(60, 'break'));
// Escutador de eventos para os botoes de estudo
buttonDownStudy.addEventListener('click', () => mudancaTempo(-60));
buttonUpStudy.addEventListener('click', () => mudancaTempo(60));
// Função responsavel pelo controle do tempo 
const controlTime = () => {
  // 1000 representa 1000 milisegundos, que é 1s
  let second = 1000;
  let date = new Date().getTime();
  let nextDate = new Date().getTime() + second;
  let onBreackVariavel = onBreak;
  if (!timerOn) {
    let idIntervalo = setInterval(() => {
      date = new Date().getTime();
      if (date > nextDate) {
        if (displayTime <= 0 && !onBreackVariavel) {
          document.getElementById('alarme').play();
          onBreackVariavel = true;
          onBreak = true;
          displayTime = displayBreak;
          mudancaTurno();
          return innerTextDisplay(tagDisplayAtual, displayTime);
        } else if (displayTime <= 0 && onBreackVariavel) {
          document.getElementById('alarme').play();
          onBreackVariavel = false;
          onBreak = false;
          displayTime = displayStudy;
          mudancaTurno();
          return innerTextDisplay(tagDisplayAtual, displayTime);
        }
        displayTime -= 1;
        return innerTextDisplay(tagDisplayAtual, displayTime);
      }
    }, 1000);
    localStorage.clear();
    // Cria um idIntervalo no localStorage, usado para interromper o intervalo depois
    localStorage.setItem("interval-id", idIntervalo)
  }
  // Se a chamada acontecer quando o intervalo estiver acontecendo, ira para-lo
  if (timerOn) {
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#examples
    clearInterval(localStorage.getItem("interval-id"))
  }
  // se estiver ativo, ira desativar, e vice-versa
  timerOn = !timerOn;
  iconPause();
}
// escutador de evento do botão que chama a mudança de tempo
buttonStart.addEventListener('click', controlTime);

const iniciaRelogio = () => {
  innerTextDisplay(tagDisplayAtual, displayTime);
  innerTextDisplay(tagDisplayBreak, displayBreak);
  innerTextDisplay(tagDisplayStudy, displayStudy);
  iconPause();
}
divDisplay.addEventListener('click', () => {
  if (timerOn) {
    displayTime = 2;
  } else {
    onBreak = !onBreak;
    if (onBreak) {
      displayTime = displayBreak;
    } else {
      displayTime = displayStudy;
    }
    iniciaRelogio();
    mudancaTurno();
  }
  divDisplay.classList.remove('hover-study', 'hover-break')
});
divDisplay.addEventListener('mouseenter', (event) => {
  !onBreak ? divDisplay.classList.add('hover-study') : divDisplay.classList.add('hover-break')
});
divDisplay.addEventListener('mouseleave', (event) => {
  !onBreak ? divDisplay.classList.remove('hover-study') : divDisplay.classList.remove('hover-break')
});

const resetTempo = () => {
  clearInterval(localStorage.getItem('interval-id'));
  [displayTime, displayBreak, displayStudy] = [20 * 60, 5 * 60,  20 * 60];
  iniciaRelogio();
  timerOn = false;
  iconPause();
}
buttonReset.addEventListener('click', resetTempo);
window.onload = () => {
  iniciaRelogio();
}

// module.exports = {
//   displayBreak,
//   displayStudy,
//   displayTime,
//   timerOn,
//   onBreak,
//   formatTime,
//   mudancaTempo,
//   controlTime,
//   resetTempo,
// }