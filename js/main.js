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
AppData.prototype.start = function(){
    if(salaryAmount.value === ''){
        start.setAttribute('disabled', 'true');
        return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function(item){
        item.setAttribute('disabled', 'true');
    });
    expensesPlus.removeEventListener('click', appData.addExpensesBlock);
    incomePlus.removeEventListener('click', appData.addIncomeBlock);
    start.style.display = 'none';
    reset.style.display = 'block';

    this.budget = +salaryAmount.value;

    appData.getExpenses(); //получаем Обязательные расходы
    appData.getExpensesMonth(); //складываем Обязательные расходы
    appData.getAddExpenses(); //получаем Возможные расходы
    appData.getIncome(); //получаем Дополнительный доход
    appData.getIncomeMonth(); //складываем Дополнительный доход
    appData.getAddIncome(); //получаем Возможный доход
    appData.getBudget(); 
    appData.showResult();
}
AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function(){
        periodSelect = document.querySelector('.period-select');
        incomePeriodValue.value = _this.calcPeriod();
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
    const _this = this;
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function(item){
       let itemExpenses = item.querySelector('.expenses-title').value;
       let cashExpenses = item.querySelector('.expenses-amount').value;
       if(itemExpenses !== '' || cashExpenses !== ''){
        _this.expenses[itemExpenses] = +cashExpenses;
       }
    });
    
};
AppData.prototype.getExpensesMonth = function(){
    for(let key in this.expenses){
    this.expensesMonth += this.expenses[key];
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
    const _this = this;
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' || cashIncome !== ''){
            _this.income[itemIncome] = +cashIncome;
           }
    });
};
AppData.prototype.getIncomeMonth = function(){
    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            _this.addExpenses.push(item);
        }   
    });
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.asking = function(){
    this.deposit = confirm('Есть ли у вас депозит в банке?');
};
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function (){
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.periodSelectChange = function(){
    periodSelect = document.querySelector('.period-select');
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.getStatusIncome = function(){
    // switch(true){
    //     case this.budgetDay >= 1200 :
    //         console.log('У вас высокий уровень дохода');
    //         break;
    //     case this.budgetDay < 1200 && this.budgetDay > 600:
    //         console.log('У вас средний уровень дохода');
    //         break;
    //     case this.budgetDay <= 600 && this.budgetDay > -1:
    //         console.log('К сожалению у вас уровень дохода ниже среднего');
    //         break;
    //     default:
    //         console.log('Что то пошло не так');
    // }
};
AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.getInfoDeposit = function(){

    if(this.deposit){
        do{
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while(!isNumber(this.percentDeposit));
        this.percentDeposit = +this.percentDeposit;
        do{
            this.moneyDeposit = prompt('Какая сумма заложена?', 20000);
        }
        while(!isNumber(this.moneyDeposit));
        this.moneyDeposit = +this.moneyDeposit;
    }
};
AppData.prototype.calcSaveMoney = function(){
    return this.budgetMonth * this.period;
};
AppData.prototype.resetAction = function(){
    periodSelect.value = '0';
    periodAmount.textContent = periodSelect.value;

    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function(elem){
        elem.value = '';
        elem.removeAttribute('disable');
    });

    resultInputAll.forEach(function(item){
        item.value = '';
    });
    for(let i = 1; 1 < incomeItems.length; i++){
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        incomePlus.style.display = 'block';
    }
    for(let i = 1; 1 < expensesItems.length; i++){
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        expensesPlus.style.display = 'block';
    }
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
    reset.style.display = 'none';
    start.style.display = 'block';
    start.setAttribute('disabled', 'false');

};



const appData = new AppData();

console.log(appData);

salaryAmount.addEventListener('input', function(){
    if(isNaN(salaryAmount.value)){
        salaryAmount.value = salaryAmount.value.slice(0, salaryAmount.value.length - 1);
    }
});

start.addEventListener('click', appData.start.bind(appData))
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.periodSelectChange);
reset.addEventListener('click', appData.resetAction.bind(appData));

let xExpenses = function(x){
let number = 0;
let yExpenses = [];
    for(let value of x){
        yExpenses[number++] = value[0].toUpperCase() + value.substring(1);
    }
    return yExpenses.join(', ');
};

