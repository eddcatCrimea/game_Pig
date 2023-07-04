'use strict';

//Кнопки и переменнные
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
let scoreOne = document.querySelector('#score--0');
let curentScoreOne = document.querySelector('#current--0');
let scoreTwo = document.getElementById('score--1');
let curentScoreTwo = document.querySelector('#current--1');
const btnNewGame = document.querySelector ('.btn--new');
const btnRoll = document.querySelector ('.btn--roll');
const btnHold = document.querySelector ('.btn--hold');
const dicCl = document.querySelector ('.dice');
const diceOff = document.querySelector ('.dice');
let count = 0;
let activPlayer = 0;
let scores = [0, 0];
let plays = true;

// Обнуление переменных и спрятали кубик
const reset = function() {
plays = true;
count = 0;
activPlayer = 0;
curentScoreOne.textContent = 0;
curentScoreTwo.textContent = 0;
scoreOne.textContent = 0;
scoreTwo.textContent = 0;
diceOff.classList.add('hidden');
player1el.classList.remove('player--active');
player0el.classList.add('player--active');
scores = [0, 0];
};
reset ();

// Передача хода и смена бэкграунда
const switchPlayer = function () {
   //Если выпала 1 обнуляем count и curentScoreOne.textContent
   document.getElementById(`current--${activPlayer}`).textContent = 0;
   count = 0;
   // передаем ход другому игроку и меняем цвет поля
   activPlayer = activPlayer === 0 ? 1 : 0;
   player0el.classList.toggle('player--active');
   player1el.classList.toggle('player--active');
 
};

// По клику кнопки btn--roll генерируем случайное выпавшее число
   btnRoll.addEventListener('click', function() {
   if (plays) {
   let dice = Math.trunc(Math.random()*6) + 1; 
   // Бросаем кости и выводим соответствущую картинку
   dicCl.classList.remove ('hidden');
   dicCl.src = `dice-${dice}.png`;

//Сумируем выпавшие номера в Current для активного игрока
   if (dice!==1){count += dice;
      document.getElementById(`current--${activPlayer}`).textContent = count;
      } else {
      switchPlayer();
      } 
     }
   });
             
// Оживляем кнопку HOLD
   btnHold.addEventListener ('click', function() {
      if (plays) {
      scores[activPlayer] += count;
      document.getElementById(`score--${activPlayer}`).textContent = scores[activPlayer];

      if (scores[activPlayer] >= 100) {
      plays = false;

      document.querySelector (`.player--${activPlayer}`).classList.add('player--winner');
      document.querySelector (`.player--${activPlayer}`).classList.remove('player--active');
      dicCl.classList.add ('hidden');

        } else { switchPlayer() 
       }
     }
   });

// Кнопка NewGame
btnNewGame.addEventListener('click', function() { 
   document.querySelector (`.player--${activPlayer}`).classList.remove('player--winner');      
   reset(); 
   });
