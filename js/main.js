'use strict';

let buttonStart = document.getElementById('start'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    //Value
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),
    //leftInput
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

let isNumber = function(n){
    return !isNaN(parseFloat(n) && isFinite(n));
};

let money,
    start = function(){
    do{
        money = prompt('Ваш месячный доход?', 60000);
    }
    while(!isNumber(money));
    money = +money;
};
start();

let appData = {
    addExpenses: [], // Перечисление статей расходов, первый раз, второй, третий
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 12,
    budget: money, //месяный доход
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    numberMonths: 0,
    income: {},
    expenses: {},
    asking: function(){
        if(confirm('Есть ли у вас дополнительный источник заработка?')){
            let itemInc, cashInc;
            do{
                itemInc = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
            }
            while(itemInc === '' || itemInc === null);
            do{
                cashInc = prompt('Сколько в месяц вы на этом зарабатываете?', 15000);
            }
            while(!isNumber(cashInc));
            appData.income[itemInc] = +cashInc;
        }
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
        'комуналка, еда, бензин, казино').toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for(let i = 0; i < 2; i++){
            let x, y;
            do{
                x = prompt('Введите обязательную статью расходов?', 'Покупка велосипеда');
            }
            while(x === '' || x === null);
            do{
                y = prompt('Во сколько это обойдется?', +`${i + 1}000` + 1000);
            }
            while(!isNumber(y));
            appData.expenses[x + `${i}`] = +y;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth: function(){
        for(let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key];
       } 
       console.log(`Расходы за месяц: ${appData.expensesMonth}`);
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function (){
        appData.numberMonths = Math.ceil(appData.mission / appData.budgetMonth);
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
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while(!isNumber(appData.percentDeposit));
            appData.percentDeposit = +appData.percentDeposit;
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', 20000);
            }
            while(!isNumber(appData.moneyDeposit));
            appData.moneyDeposit = +appData.moneyDeposit;
        }
    },
    calcSaveMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

// console.log('"Наша программа включает в себя данные: "');
// for(let prop in appData){
//     console.log("appData." + prop + " = " + appData[prop]);
// }

// appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());

let xExpenses = function(x){
let number = 0;
let yExpenses = [];
    for(let value of x){
        yExpenses[number++] = value[0].toUpperCase() + value.substring(1);
    }
    return yExpenses.join(', ');
};
console.log(xExpenses(appData.addExpenses));

