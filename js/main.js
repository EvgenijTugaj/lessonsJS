'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0], 
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.querySelector('.accumulated_month'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    reset = document.querySelector('#cancel');

let isNumber = function(n){
    return !isNaN(parseFloat(n) && isFinite(n));
};

const AppData = function(){

    this.addExpenses = []; 
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0; 
    this.numberMonths = 0;
    this.addIncome = [];
    this.expenses = {};
    this.income = {};
    this.incomeMonth = 0;
};

AppData.prototype.showResult = function(){
        
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function(){
        periodSelect = document.querySelector('.period-select');
        incomePeriodValue.value = appData.calcPeriod();
    });

};
AppData.prototype.addExpensesBlock = function(){ 
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
       return;
    }
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

};
AppData.prototype.getExpenses = function(){
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function(item){
       let itemExpenses = item.querySelector('.expenses-title').value;
       let cashExpenses = item.querySelector('.expenses-amount').value;
       if(itemExpenses !== '' || cashExpenses !== ''){
        appData.expenses[itemExpenses] = +cashExpenses;
       }
    });
    
};
AppData.prototype.getExpensesMonth = function(){
    for(let key in appData.expenses){
    appData.expensesMonth += appData.expenses[key];
   } 
};
AppData.prototype.addIncomeBlock = function(){
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        return;
    }
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
};
AppData.prototype.getIncome = function(){
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' || cashIncome !== ''){
            appData.income[itemIncome] = +cashIncome;
           }
    });
};
AppData.prototype.getIncomeMonth = function(){
    for(let key in appData.income){
        appData.incomeMonth += +appData.income[key];
    }
};
AppData.prototype.getAddExpenses = function(){
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            appData.addExpenses.push(item);
        }   
    });
};
AppData.prototype.getAddIncome = function(){
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            appData.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.asking = function(){
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
};
AppData.prototype.getBudget = function(){
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function (){
    return targetAmount.value / appData.budgetMonth;
};
AppData.prototype.periodSelectChange = function(){
    periodSelect = document.querySelector('.period-select');
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.getStatusIncome = function(){
    // switch(true){
    //     case appData.budgetDay >= 1200 :
    //         console.log('У вас высокий уровень дохода');
    //         break;
    //     case appData.budgetDay < 1200 && appData.budgetDay > 600:
    //         console.log('У вас средний уровень дохода');
    //         break;
    //     case appData.budgetDay <= 600 && appData.budgetDay > -1:
    //         console.log('К сожалению у вас уровень дохода ниже среднего');
    //         break;
    //     default:
    //         console.log('Что то пошло не так');
    // }
};
AppData.prototype.calcPeriod = function(){
    return appData.budgetMonth * periodSelect.value;
};
AppData.prototype.getInfoDeposit = function(){
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
};
AppData.prototype.calcSaveMoney = function(){
    return appData.budgetMonth * appData.period;
};

const appData = new AppData();

console.log(appData);

salaryAmount.addEventListener('input', function(){
    if(isNaN(salaryAmount.value)){
        salaryAmount.value = salaryAmount.value.slice(0, salaryAmount.value.length - 1);
    }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.periodSelectChange);
reset.addEventListener('click', appData.resetAction);

let xExpenses = function(x){
let number = 0;
let yExpenses = [];
    for(let value of x){
        yExpenses[number++] = value[0].toUpperCase() + value.substring(1);
    }
    return yExpenses.join(', ');
};

