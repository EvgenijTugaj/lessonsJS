'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// let money,
//     takeMoney = function(){
//     do{
//         money = prompt('Ваш месяный доход?', 60000);
//     }
//     while(!isNumber(money) && money === '' && money === null);
// };

let appData = {
    income: {},
    addIncome: [],
    addExpenses: [], // Перечисление статей расходов, первый раз, второй, третий
    expensesAmout: 0, //общая сумма обязательных расходов в месяц 2 раза
    deposit: false,
    mission: 1000000,
    period: 12,
    budget: 0, //месяный доход
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    accumulatedMonth: 0,
    numberMonths: 0,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
        'комуналка, еда, бензин, казино');
            appData.addExpenses[0] = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    takeMoney: function(){
        do{
            appData.budget = +prompt('Ваш месяный доход?', 60000);
        }
        while(!isNumber(appData.budget) && appData.budget === '' && appData.budget === null); //не работает
    },
    getExpensesMonth: function(){
        let acc = 0;
        for(let i = 0; i < 2; i++){
            do{
                appData.addExpenses[i + 1] = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда.');
            }
            while(appData.addExpenses[i + 1] === false);
            do{
                acc = prompt(`Во сколько это обойдется?`);
            }
            while(!isNumber(acc));
            appData.expensesAmout += +acc;
        }
    },
    getAccumulatedMonth: function(){
        appData.accumulatedMonth = appData.budget - appData.expensesAmout;
    },
    getTargetMonth: function (){
        appData.numberMonths = Math.ceil(appData.mission / appData.accumulatedMonth);
    },
    getBudgetDay: function(){
        appData.budgetDay = Math.floor(appData.accumulatedMonth / 30);
    }
};

appData.asking();

// appData.takeMoney();

console.log(`"Период равен ${appData.period} месяцев" и 
"Цель заработать ${appData.mission} рублей/долларов/гривен/юани"`);
// // console.log('Вывод возможных расходов: ', addExpenses.toLowerCase().split(', '));
// console.log('Ваш месячный доход: ', money);
// console.log('Бюджет за месяц:', accumulatedMonth);
// console.log(getTargetMonthOne > 0 ? 'Цель будет достигнута за: ' + 
// getTargetMonthOne + ' месяцев' : 'Цель не будет достигнута');
// console.log('Бюджет на день:', budgetDay);

// let getStatusIncome = function(bd){
//     switch(true){
//         case bd >= 1200 :
//             return 'У вас высокий уровень дохода';
//         case bd < 1200 && bd > 600:
//             return 'У вас средний уровень дохода';
//         case bd <= 600 && bd > -1:
//             return 'К сожалению у вас уровень дохода ниже среднего';
//         default:
//             return 'Что то пошло не так';
//     }
// };

// console.log(getStatusIncome(budgetDay));

