'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    // addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
    // 'комуналка, еда, бензин, казино'),
    // deposit = confirm('Есть ли у вас депозит в банке?'),
    income = 'Заработок по знакомым',
    mission = 1000000,
    period = 12,
    expenses = [];

let start = function(){
    do{
        money = prompt('Ваш месяный доход?', 60000);
    }
    while(!isNumber(money));
};

start();

let getExpensesMonth = function(){
    let sum = 0,
    acc;
    for(let i = 0; i < 2; i++){
        do{
            expenses[i] = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда.');
        }
        while(expenses[i] === false);
        do{
            acc = prompt(`Во сколько это обойдется?`);
        }
        while(!isNumber(acc));
        sum += +acc;
    }
    return sum;
};

let expensesAmout = getExpensesMonth();

console.log('Расходы за месяц: ', expensesAmout);

let getAccumulatedMonth = function(){
    return +money - expensesAmout;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function (){
    return Math.ceil(mission / accumulatedMonth);
};

let getTargetMonthOne = getTargetMonth();

let budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
// showTypeOf(deposit);

console.log(`"Период равен ${period} месяцев" и "Цель заработать ${mission} рублей/долларов/гривен/юани"`);
// console.log('Вывод возможных расходов: ', addExpenses.toLowerCase().split(', '));
console.log('Ваш месячный доход: ', money);
console.log('Бюджет за месяц:', accumulatedMonth);
console.log(getTargetMonthOne > 0 ? 'Цель будет достигнута за: ' + 
getTargetMonthOne + ' месяцев' : 'Цель не будет достигнута');
console.log('Бюджет на день:', budgetDay);

let getStatusIncome = function(bd){
    switch(true){
        case bd >= 1200 :
            return 'У вас высокий уровень дохода';
        case bd < 1200 && bd > 600:
            return 'У вас средний уровень дохода';
        case bd <= 600 && bd > -1:
            return 'К сожалению у вас уровень дохода ниже среднего';
        default:
            return 'Что то пошло не так';
    }
};

console.log(getStatusIncome(budgetDay));

