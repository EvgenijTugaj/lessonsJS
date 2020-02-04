'use strict';

// let isNumber = function(n){
//     return !isNaN(parseFloat(n) && isFinite(n));
// };

// let money,
//     start = function(){
//     do{
//         money = prompt('Ваш месячный доход?', 60000);
//     }
//     while(!isNumber(money));
//     money = +money;
// };
// start();

// let appData = {
//     addExpenses: [], // Перечисление статей расходов, первый раз, второй, третий
//     deposit: false,
//     mission: 1000000,
//     period: 12,
//     budget: money, //месяный доход
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
//     numberMonths: 0,
//     expenses: {},
//     asking: function(){
//         let addExpensesOne = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
//         'комуналка, еда, бензин, казино');
//         appData.addExpenses = addExpensesOne.toLowerCase().split(', ');
//         appData.deposit = confirm('Есть ли у вас депозит в банке?');
//         for(let i = 0; i < 2; i++){
//             let x, y;
//             do{
//                 x = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда');
//             }
//             while(x === '' && x === null);
//             do{
//                 y = prompt('Во сколько это обойдется?');
//             }
//             while(!isNumber(y));
//             appData.expenses[x + `${i}`] = +y;
//         }
//     },
//     getExpensesMonth: function(){
//         for(let key in appData.expenses){
//         appData.expensesMonth += appData.expenses[key];
//        } 
//        console.log(`Расходы за месяц: ${appData.expensesMonth}`);
//     },
//     getBudget: function(){
//         appData.budgetMonth = appData.budget - appData.expensesMonth;
//         appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//     },
//     getTargetMonth: function (){
//         appData.numberMonths = Math.ceil(appData.mission / appData.budgetMonth);
//         console.log(`Цель будет достигнута за: ${appData.numberMonths} месяцев`);
//     },
//     getStatusIncome: function(){
//         switch(true){
//             case appData.budgetDay >= 1200 :
//                 console.log('У вас высокий уровень дохода');
//                 break;
//             case appData.budgetDay < 1200 && appData.budgetDay > 600:
//                 console.log('У вас средний уровень дохода');
//                 break;
//             case appData.budgetDay <= 600 && appData.budgetDay > -1:
//                 console.log('К сожалению у вас уровень дохода ниже среднего');
//                 break;
//             default:
//                 console.log('Что то пошло не так');
//         }
//     }
// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();

// console.log('"Наша программа включает в себя данные: "');
// for(let prop in appData){
//     console.log("appData." + prop + " = " + appData[prop]);
// }

let buttonStart = document.getElementById('start');
let btnPlusIncomeAdd = document.getElementsByTagName('button')[0]; 
let btnPlusExpensesAdd = document.getElementsByTagName('button')[1]; 
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log('additionalIncomeItem: ', additionalIncomeItem);
