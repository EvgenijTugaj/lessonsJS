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

let getExpensesMonth = function(){
    return amount1 + amount2;
};
console.log('Расходы за месяц: ', getExpensesMonth());

let getAccumulatedMonth = function(){
    return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function (){
    return mission / accumulatedMonth;
};

let budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`"Период равен ${period} месяцев" и "Цель заработать ${mission} рублей/долларов/гривен/юани"`);
console.log('Вывод возможных расходов: ', addExpenses.toLowerCase().split(', '));
console.log('Ваш месячный доход: ', money);
console.log('Бюджет за месяц:', accumulatedMonth);
console.log('Цель будет достигнута за:', Math.ceil(getTargetMonth()), 'месяцев');
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

