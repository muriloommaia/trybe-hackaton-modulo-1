# Tela de Login

 - [ ] Input com id = 'github-input'
 - [ ] Criar botão id 'botao-login' que recebe o github-input e faz request com a API do gitHub e envia para uma nova página
 - [ ] A tela deve ter o logo da Trybe, e uma frase motivacional do seu gosto.
 - [ ] Tela dividida em 60/40 para tela de login e frase motivacional, respectivamente
 - [ ] Criação de testes pra tudo

# Tela 2 - Informações do Dia

 - [ ] Criar uma section id 'section-principal' com duas divs: div (id 'informacoes-dia') e div (id 'agenda-dia')
 - [ ] Dentro da div criada ter um input id 'input-informacoes'
 - [ ] Criar um Botão - id 'botao-informacoes'. Que ira pegar o 'input-informacoes' e enviar para a função fazerAgenda, que irá tratar as informações para o próximo requisito
 - [ ] A função fazerAgenda deve tratar os dados de horários da trybe e dar um append na div 'agenda-dia',
 - [ ] O append deve ser dado de maneira que dentro da 'agenda-dia', cada horário e informação (incluindo o link) possua um checkBox, que, quando clicado, gerará um alarme (vide bonus)
 - [ ] Criar teste pra tudo
## Bonus
 - [ ] Pode-se criar uma div id 'alarmes' dentro da section 'section-principal', que quando é dado o check os horarios será dado o append nessa div.

# Tela 3 - Informações gitHub, navBar

 - [ ] Criar uma tag nav id 'navbar' que ficará fixa no topo da página,
 - [ ] O menu de navegação terá uma foto (obtida através da requisição da API do gitHub) e o nome do usuário
 - [ ] Criar uma tag assert id - 'informacoes-usuario'