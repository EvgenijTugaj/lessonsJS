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

let appData = {
    addExpenses: [], 
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0, 
    numberMonths: 0,
    addIncome: [],
    expenses: {},
    income: {},
    incomeMonth: 0,
    start: function(){
        if(salaryAmount.value === ''){
            alert('Ошибка! Поле "Ежемесячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = +salaryAmount.value; //ок, получили

        expensesPlus.removeEventListener('click', appData.addExpensesBlock);
        incomePlus.removeEventListener('click', appData.addIncomeBlock);
        appData.getExpenses(); //получаем Обязательные расходы
        appData.getExpensesMonth(); //складываем Обязательные расходы
        appData.getAddExpenses(); //получаем Возможные расходы
        appData.getIncome(); //получаем Дополнительный доход
        appData.getIncomeMonth(); //складываем Дополнительный доход
        appData.getAddIncome(); //получаем Возможный доход
        appData.getBudget(); 
        appData.showResult();

        let readOne = document.querySelectorAll('input[type=text]');
        readOne.forEach(function(item){
            item.readOnly = 'true';  
        });
        reset.style.display = 'block';
        start.style.display = 'none';


    },
    resetAction: function(){
        let readTwo = document.querySelectorAll('input[type=text]');
        readTwo.forEach(function(item){
            item.value = '';
            item.readOnly = 'false';  
        });
    },
    showResult: function(){
        
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

    },
    addExpensesBlock: function(){ 
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
           return;
        }
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    },
    getExpenses: function(){
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' || cashExpenses !== ''){
            appData.expenses[itemExpenses] = +cashExpenses;
           }
        });      
    },
    getExpensesMonth: function(){
        for(let key in this.expenses){
            this.expensesMonth += this.expenses[key];
       } 
    },
    addIncomeBlock: function(){
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            return;
        }
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    },
    getIncome: function(){
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' || cashIncome !== ''){
                this.income[itemIncome] = +cashIncome;
               }
        });
    },
    getIncomeMonth: function(){
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                this.addExpenses.push(item);
            }   
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    },
    asking: function(){
        this.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function (){
        return targetAmount.value / this.budgetMonth;
    },
    periodSelectChange: function(){
        periodSelect = document.querySelector('.period-select');
        periodAmount.textContent = periodSelect.value;
    },
    getStatusIncome: function(){
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
    },
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do{
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while(!isNumber(appData.percentDeposit));
            this.percentDeposit = +this.percentDeposit;
            do{
                this.moneyDeposit = prompt('Какая сумма заложена?', 20000);
            }
            while(!isNumber(this.moneyDeposit));
            this.moneyDeposit = +this.moneyDeposit;
        }
    },
    calcSaveMoney: function(){
        return this.budgetMonth * this.period;
    }
};


salaryAmount.addEventListener('input', function(){
    if(salaryAmount.value.length >= 2 && !isNaN(salaryAmount.value)){
        start.addEventListener('click', appData.start);
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

