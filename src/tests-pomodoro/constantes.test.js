/**
 * @jest-environment jsdom
 */
const { describe, it, expect } = require('@jest/globals');
const assert = require('assert');
const {
  displayBreak,
  displayStudy,
  displayTime,
  timerOn,
  onBreak,
  formatTime,
  mudancaTempo,
  controlTime,
  resetTempo,
} = require('../js/pomodoro');


// console.log(60)
// describe('Verificação de variáveis no inicio do programa', () => {
//   it('Valor inicial de displayBreak é 5 * 60', () => {
//     assert.strictEqual(60, 5 * 60);
//   })
// })
// console.log(displayTime)