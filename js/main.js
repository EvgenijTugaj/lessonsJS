'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    income: {},
    addIncome: [],
    addExpenses: [], // Перечисление статей расходов, первый раз, второй, третий
    expensesAmout: 0, //общая сумма обязательных расходов в месяц 2 раза
    deposit: false,
    mission: 1000000,
    period: 12,
    money: 0, //месяный доход
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
                appData.expenses[appData.addExpenses[i]] = acc[i];
            }

    },
    takeMoney: function(){
        do{
            appData.money = +prompt('Ваш месяный доход?', 60000);
        }
        while(!isNumber(appData.budget) && appData.budget === '' && appData.budget === null); //не работает
    },
    getExpensesMonth: function(){
        for(let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key];
       } 
       console.log(`Расходы за месяц: ${appData.expensesMonth}`);
    },
    getBudget: function(){
        appData.accumulatedMonth = appData.money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.accumulatedMonth / 30);
    },
    getTargetMonth: function (){
        appData.numberMonths = Math.ceil(appData.mission / appData.accumulatedMonth);
        console.log(`Цель будет достигнута за: ${appData.numberMonths} месяцев`);
    },
    getStatusIncome: function(){
        switch(true){
            case appData.budgetDay >= 1200 :
                console.log('У вас высокий уровень дохода');
                break;
            case appData.budgetDay < 1200 && appData.budgetDay > 600:
                console.log('У вас средний уровень дохода');
                break;
            case appData.budgetDay <= 600 && appData.budgetDay > -1:
                console.log('К сожалению у вас уровень дохода ниже среднего');
                break;
            default:
                console.log('Что то пошло не так');
        }
    }
};

appData.takeMoney();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
