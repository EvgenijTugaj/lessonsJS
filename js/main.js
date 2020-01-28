'use strict';

let money = parseInt(prompt('Ваш месячный доход?', '200000руб.')),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
    'комуналка, еда, бензин, казино'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    income = 'Заработок по знакомым',
    mission = 1000000,
    period = 12;

console.log('money: ' + typeof(money) + '\n', 
'income: ' + typeof(income) + '\n', 'deposit: ' + typeof(deposit) + '\n');
console.log('addExpensesLength: ', addExpenses.length);
console.log(`"Период равен ${period} месяцев" и "Цель заработать ${mission} рублей/долларов/гривен/юани"`);
console.log('addExpenses: ', addExpenses.toLowerCase().split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда.'),
    amount1 = parseInt(prompt('Во сколько это обойдется?', '10000руб.')),
    expenses2 = prompt('Введите обязательную статью расходов?', 'Поход к хирургу после велосипеда.'),
    amount2 = parseInt(prompt('Во сколько это обойдется?', '20000руб.'));

let budgetMonth = money - amount1 - amount2,
    budgetDay = Math.floor(budgetMonth / 30);

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
