let money, income, addExpenses, deposit, mission, period;

money = 90000;
income = 'Заработок по знакомым';
addExpenses = 'комуналка, интернет, бензин, еда';
deposit = true;
mission = 1000000;
period = 12;


console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log('addExpensesLength: ', addExpenses.length);

console.log(`"Период равен ${period} месяцев" и "Цель заработать ${mission} рублей/долларов/гривен/юани"`);

addExpenses = addExpenses.toLowerCase();
console.log('addExpenses: ', addExpenses.split(', '));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

console.log('Привет, мир!');

