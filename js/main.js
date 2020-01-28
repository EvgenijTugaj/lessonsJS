'use strict';

let money = parseInt(prompt('Ваш месячный доход?', '200000руб.')),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
    'комуналка, еда, бензин, казино'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    income = 'Заработок по знакомым',
    mission = 1000000,
    period = 12;

let expenses1 = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда.'),
    amount1 = parseInt(prompt('Во сколько это обойдется?', '10000руб.')),
    expenses2 = prompt('Введите обязательную статью расходов?', 'Поход к хирургу после велосипеда.'),
    amount2 = parseInt(prompt('Во сколько это обойдется?', '20000руб.'));

function getExpensesMonth(am1, am2){
    return am1 + am2;
}

function getAccumulatedMonth(mn, amnt1, amnt2, getExpMon){
    return mn - getExpMon(amnt1, amnt2);
}

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2, getExpensesMonth);

function getTargetMonth(allMoney, acmon){
    return Math.ceil(allMoney / acmon);
}

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('money: ' + typeof(money) + '\n', 
'income: ' + typeof(income) + '\n', 'deposit: ' + typeof(deposit) + '\n');
console.log(`"Период равен ${period} месяцев" и "Цель заработать ${mission} рублей/долларов/гривен/юани"`);
console.log('Вывод возможных расходов: ', addExpenses.toLowerCase().split(', '));
console.log('Ваш месячный доход: ', money);
console.log('Бюджет за месяц:', accumulatedMonth);
console.log('Цель будет достигнута за:', getTargetMonth(mission, accumulatedMonth), 'месяцев');
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

