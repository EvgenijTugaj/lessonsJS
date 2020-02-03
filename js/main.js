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
    expenses: {},
    asking: function(){
        // let addExpensesTwo = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
        // 'комуналка, еда, бензин, казино');
        //     appData.addExpenses[0] = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            let acc = [];
            for(let i = 0; i < 2; i++){
                do{
                    appData.addExpenses[i] = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда.');
                }
                while(appData.addExpenses[i] === false);
                do{
                    acc[i] = +prompt(`Во сколько это обойдется?`);
                }
                while(!isNumber(acc[i]) && acc[i] === '' && acc[i] === null);
                // appData.expensesAmout += acc[i];
                appData.expenses[appData.addExpenses[i]] = acc[i];
            }
            // console.log(appData.expenses);

    },
    takeMoney: function(){
        do{
            appData.budget = +prompt('Ваш месяный доход?', 60000);
        }
        while(!isNumber(appData.budget) && appData.budget === '' && appData.budget === null); //не работает
    },
    getExpensesMonth: function(){
        for(let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key];
       } 
       console.log('appData.expensesMonth: ', appData.expensesMonth);
    },
    getBudget: function(){
        appData.accumulatedMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.accumulatedMonth / 30);
    },
    getTargetMonth: function (){
        appData.numberMonths = Math.ceil(appData.mission / appData.accumulatedMonth);
    },
    getStatusIncome: function(){
        switch(true){
            case appData.budgetDay >= 1200 :
                return 'У вас высокий уровень дохода';
            case appData.budgetDay < 1200 && appData.budgetDay > 600:
                return 'У вас средний уровень дохода';
            case appData.budgetDay <= 600 && appData.budgetDay > -1:
                return 'К сожалению у вас уровень дохода ниже среднего';
            default:
                return 'Что то пошло не так';
        }
    }
};

appData.asking();
appData.getExpensesMonth();

// appData.takeMoney();

// console.log(`"Период равен ${appData.period} месяцев" и 
// "Цель заработать ${appData.mission} рублей/долларов/гривен/юани"`);
// // console.log('Вывод возможных расходов: ', addExpenses.toLowerCase().split(', '));
// console.log('Ваш месячный доход: ', money);
// console.log('Бюджет за месяц:', accumulatedMonth);
// console.log(getTargetMonthOne > 0 ? 'Цель будет достигнута за: ' + 
// getTargetMonthOne + ' месяцев' : 'Цель не будет достигнута');
// console.log('Бюджет на день:', budgetDay);



// console.log(getStatusIncome(budgetDay));

