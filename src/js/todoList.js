// Colocando Tarefa
let listTarefa = document.getElementById('lista-tarefas');
const buttonTarefa = document.getElementById('criar-tarefa');
let itemList = document.querySelectorAll('li');

function atualizaLista() {
  itemList = document.querySelectorAll('li');
}

const saveTasks = () => {
  localStorage.removeItem('listaSalva');
  listTarefa = document.getElementById('lista-tarefas');
  localStorage.setItem('listaSalva', listTarefa.innerHTML);
};


function selectPixel() {
  itemList.forEach((element) => {
    element.addEventListener('click', (event) => {
      atualizaLista();
      const evento = event.target;
      itemList.forEach((item) => {
        const itens = item;
        itens.style.backgroundColor = 'white';
        itens.classList.remove('selected');
      });
      evento.style.backgroundColor = '#e6e6e6';
      evento.classList.add('selected');
      saveTasks();
    });
  });
}

buttonTarefa.addEventListener('click', () => {
  const inputTarefa = document.getElementById('texto-tarefa');
  const itemTarefa = document.createElement('li');
  itemTarefa.innerText = inputTarefa.value;
  listTarefa.appendChild(itemTarefa);
  inputTarefa.value = '';
  atualizaLista();
  selectPixel();
  saveTasks();
});

// Ao clicar em enter o botão tarefa é acionado
document.addEventListener("keypress", (event) => {
  if(event.key === 'Enter') {
    buttonTarefa.click();
  }
});

// Marcando tarefa como completa
listTarefa.addEventListener('dblclick', (event) => {
  atualizaLista();
  event.target.classList.toggle('completed');
  saveTasks();
});

// Apaga Tudo
const buttonApaga = document.getElementById('apaga-tudo');

buttonApaga.addEventListener('click', () => {
  listTarefa.innerText = '';
  saveTasks();
});

// Remove Finalizados
const removeFinalizados = document.getElementById('remover-finalizados');

removeFinalizados.addEventListener('click', () => {
  const completedItens = document.querySelectorAll('.completed');
  completedItens.forEach((element) => {
    element.parentNode.removeChild(element);
  });
  saveTasks();
});

// Botões de mover pra cima e pra baixo
const buttonMoverCima = document.getElementById('mover-cima');
const buttonMoverBaixo = document.getElementById('mover-baixo');

buttonMoverCima.addEventListener('click', () => {
  const selected = document.querySelector('.selected');
  const list = document.querySelector('ol');
  const li = document.querySelectorAll('li');
  if (selected !== null && selected !== li[0]) {
    list.insertBefore(selected, selected.previousSibling);
  }
  saveTasks();
});

buttonMoverBaixo.addEventListener('click', () => {
  const selected = document.querySelector('.selected');
  const list = document.querySelector('ol');
  const li = document.querySelectorAll('li');
  if (selected !== null && selected !== li[li.length - 1]) {
    list.insertBefore(selected, selected.nextSibling.nextSibling);
  }
  saveTasks();
});

// Botão de remover selecionado
const buttonRemoverSelecionado = document.querySelector('#remover-selecionado');

buttonRemoverSelecionado.addEventListener('click', () => {
  const selected = document.querySelector('.selected');
  selected.parentNode.removeChild(selected);
  saveTasks();
});

const iniciaLista = () => {
  if (localStorage.listaSalva) {
    listTarefa.innerHTML = `${localStorage.getItem('listaSalva')}`;
  }
}