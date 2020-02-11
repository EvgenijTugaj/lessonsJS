'use strict';

let start = document.getElementById('start'), //ok
    btnPlus = document.getElementsByTagName('button'), //ok
    incomePlus = btnPlus[0], //ok
    expensesPlus = btnPlus[1], //ok
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //ok
    depositCheck = document.querySelector('#deposit-check'), //ok
    //Value
    budgetDayValue = document.getElementsByClassName('budget_day-value'), //ok
    budgetMonthValue = document.getElementsByClassName('budget_month-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'), //ok
    accumulatedMonthValue = document.querySelector('.accumulated_month'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'), //ok уточнить [0]
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'), //ok уточнить [0]
    incomePeriodValue = document.getElementsByClassName('income_period-value'), //ok уточнить [0]
    targetMonthValue = document.getElementsByClassName('target_month-value'), //ok уточнить [0]
    //leftInput
    salaryAmount = document.querySelector('.salary-amount'), //ok
    incomeTitle = document.querySelector('.income-title'), //ok
    incomeAmount = document.querySelector('.income-amount'), //ok
    expensesTitle = document.querySelector('.expenses-title'), //ok
    expensesItems = document.querySelectorAll('.expenses-items'), //ok
    additionalExpenses = document.querySelector('.additional_expenses-item'), //ok - additional_expenses-item проверить
    // targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'); //ok

let isNumber = function(n){
    return !isNaN(parseFloat(n) && isFinite(n));
};

let appData = {
    addExpenses: [], // Перечисление статей расходов, первый раз, второй, третий
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 12,
    budget: 0, //месяный доход
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    numberMonths: 0,
    income: {},
    expenses: {},
    start: function(){
        if(salaryAmount.value === ''){
            alert('Ошибка! Поле "Ежемесячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getBudget();
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' || cashExpenses !== ''){
            appData.expenses[itemExpenses] = +cashExpenses;
           }
            console.log('appData.expenses');
        });
    },
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
        // console.log(`Цель будет достигнута за: ${appData.numberMonths} месяцев`);
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

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);


appData.getInfoDeposit();
appData.getTargetMonth();
appData.getStatusIncome();

// console.log('"Наша программа включает в себя данные: "');
// for(let prop in appData){
//     console.log("appData." + prop + " = " + appData[prop]);
// }

// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());

let xExpenses = function(x){
let number = 0;
let yExpenses = [];
    for(let value of x){
        yExpenses[number++] = value[0].toUpperCase() + value.substring(1);
    }
    return yExpenses.join(', ');
};
// console.log(xExpenses(appData.addExpenses));

