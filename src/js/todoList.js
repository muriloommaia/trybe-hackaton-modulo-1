// Colocando Tarefa
let listTarefa = document.getElementById('lista-tarefas');
const buttonTarefa = document.getElementById('criar-tarefa');
let itemList = document.querySelectorAll('li');

function atualizaLista() {
  itemList = document.querySelectorAll('li');
}

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
      evento.style.backgroundColor = 'rgb(128, 128, 128)';
      evento.classList.add('selected');
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
});

// Marcando tarefa como completa
listTarefa.addEventListener('dblclick', (event) => {
  atualizaLista();
  event.target.classList.toggle('completed');
});

// Apaga Tudo
const buttonApaga = document.getElementById('apaga-tudo');

buttonApaga.addEventListener('click', () => {
  listTarefa.innerText = '';
});

// Remove Finalizados
const removeFinalizados = document.getElementById('remover-finalizados');

removeFinalizados.addEventListener('click', () => {
  const completedItens = document.querySelectorAll('.completed');

  completedItens.forEach((element) => {
    element.parentNode.removeChild(element);
  });
});

// Implementação do localStorage no saveTasks e no window.onload (bonus - Tarefa 12 - Feito em parceria com
// Murilo Maia e Fernando Oliveira e Ivan Zigoni)
const saveTasks = document.getElementById('salvar-tarefas');

saveTasks.addEventListener('click', () => {
  localStorage.clear();
  listTarefa = document.getElementById('lista-tarefas');
  localStorage.setItem('listaSalva', listTarefa.innerHTML);
});

window.onload = () => {
  if (localStorage.listaSalva) {
    listTarefa.innerHTML = `${localStorage.getItem('listaSalva')}`;
  }
};

// Fim do código em conjunto.

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
});

buttonMoverBaixo.addEventListener('click', () => {
  const selected = document.querySelector('.selected');
  const list = document.querySelector('ol');
  const li = document.querySelectorAll('li');
  if (selected !== null && selected !== li[li.length - 1]) {
    list.insertBefore(selected, selected.nextSibling.nextSibling);
  }
});

// Botão de remover selecionado
const buttonRemoverSelecionado = document.querySelector('#remover-selecionado');

buttonRemoverSelecionado.addEventListener('click', () => {
  const selected = document.querySelector('.selected');

  selected.parentNode.removeChild(selected);
});
