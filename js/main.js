'use strict';

let money = 90000,
    income = 'Заработок по знакомым',
    addExpenses = 'комуналка, интернет, бензин, еда',
    deposit = true,
    mission = 1000000,
    period = 12,
    budgetDay;

console.log('money: ' + typeof money);
console.log('income: ' + typeof income);
console.log('deposit: ' + typeof deposit);
console.log('addExpensesLength: ', addExpenses.length);
console.log(`"Период равен ${period} месяцев" и "Цель заработать ${mission} рублей/долларов/гривен/юани"`);

addExpenses = addExpenses.toLowerCase();
console.log('addExpenses: ', addExpenses.split(', '));

money = parseInt(prompt('Ваш месячный доход?', '200000руб.'));

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
'комуналка, еда, бензин, казино');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда.');
let amount1 = parseInt(prompt('Во сколько это обойдется?', '10000руб.'));
let expenses2 = prompt('Введите обязательную статью расходов?', 'Поход к хирургу после велосипеда.');
let amount2 = parseInt(prompt('Во сколько это обойдется?', '20000руб.'));

let budgetMonth = money - amount1 - amount2;
budgetDay = Math.floor(budgetDay = budgetMonth / 30);

console.log('Ваш месячный доход: ', money);
console.log('Бюджет за месяц:', budgetMonth);
console.log('Цель будет достигнута за:', Math.ceil(mission / budgetMonth), 'месяцев');
console.log('Бюджет на день:', budgetDay);
 
switch(true){
    case budgetDay >= 1200 :
        console.log('У вас высокий уровень дохода');
        break;
    case budgetDay < 1200 && budgetDay > 600:
        console.log('У вас средний уровень дохода');
        break;
    case budgetDay <= 600 && budgetDay > -1:
        console.log('К сожалению у вас уровень дохода ниже среднего');
        break;
    default:
        console.log('Что то пошло не так');
}
