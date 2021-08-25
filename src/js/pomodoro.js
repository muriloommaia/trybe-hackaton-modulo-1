const tagDisplayAtual = document.querySelector('.display');
const tagDisplayBreak = document.querySelector('.display-break');
const tagDisplayStudy = document.querySelector('.display-study');
const buttonUpBreak = document.querySelector('.up-break');
const buttonDownBreak = document.querySelector('.down-break');
const buttonUpStudy = document.querySelector('.up-study');
const buttonDownStudy = document.querySelector('.down-study');
const buttonStart = document.querySelector('.start-stop-button');
const buttonReset = document.querySelector('.reset-button');
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
// função criada para deixar o tempo no formato certo de dar append no display
const formatTime = (time) => {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
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
  if(type === 'break') {
    // Aqui é definido que o tempo maximo para descanso é 20 minutos
    if(mudanca > 0 && displayBreak < 20 * 60) {
      displayBreak += mudanca;
    }
    // Aqui validamos que o tempo minimo de descanso é 1 minuto
    if(mudanca < 0 && displayBreak > 1 * 60) {
      displayBreak += mudanca;
    }
    innerTextDisplay(tagDisplayBreak, displayBreak);
  } else {
    // Aqui é definido que o tempo maximo para estudo é 60 minutos
    if(mudanca > 0 && displayStudy < 60 * 60) {
      displayStudy += mudanca;
    }
    // Aqui validamos que o tempo minimo de estudo é 5 minuto
    if(mudanca < 0 && displayStudy > 5 * 60) {
      displayStudy += mudanca;
    }
    innerTextDisplay(tagDisplayStudy, displayStudy);
  }
}
// Escutador de eventos para os botoes de descanso
buttonDownBreak.addEventListener('click', () => mudancaTempo(-60, 'break'));
buttonUpBreak.addEventListener('click', () => mudancaTempo(60, 'break'));
// Escutador de eventos para os botoes de estudo
buttonDownStudy.addEventListener('click', () => mudancaTempo(-60));
buttonUpStudy.addEventListener('click', () => mudancaTempo(60));

window.onload = () => {
  innerTextDisplay(tagDisplayAtual, displayTime);
  innerTextDisplay(tagDisplayBreak, displayBreak);
  innerTextDisplay(tagDisplayStudy, displayStudy);
  iconPause();
}
