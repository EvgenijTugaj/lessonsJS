let money = 90000;
let income = 'Заработок по знакомым';
let addExpenses = 'комуналка, интернет, бензин, еда';
let deposit = true;
let mission = 1000000;
let period = 12;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log('addExpensesLength: ', addExpenses.length);

console.log(`"Период равен ${period} месяцев" и "Цель заработать ${mission} рублей/долларов/гривен/юани"`);

addExpenses = addExpenses.toLowerCase();
console.log('addExpenses: ', addExpenses.split(', '));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);