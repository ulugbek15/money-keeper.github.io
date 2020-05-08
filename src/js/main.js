let startBtn = document.getElementById('start'),
	budgetValue = document.querySelector('.budget-value'),
	dayBudget = document.querySelector('.daybudget-value'),
	levelValue = document.querySelector('.level-value'),
	expensesValue = document.querySelector('.expenses-value'),
	optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
	incomeValue = document.querySelector('.income-value'),
	monthSavingsValue = document.querySelector('.monthsavings-value'),
	yearSavingsValue = document.querySelector('.yearsavings-value'),
	yearValue = document.querySelector('.year-value'),
	monthValue = document.querySelector('.month-value'),
	dayValue = document.querySelector('.day-value'),
	expensesItem = document.querySelectorAll('.expenses-item'),
	countBtn = document.getElementsByTagName('button')[2],
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'),
	chooseIncomeLabel = document.querySelector('.choose-income-label'),
	chooseIncome = document.querySelector('.choose-income'),
	sumValue = document.querySelector('.choose-sum'),
	checkSavings = document.querySelector('#savings'),
	procentValue = document.querySelector('.choose-percent'); 

let money, time;

startBtn.addEventListener('click', function () {
	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt('Ваш бюджет на месяц?', '');

	while (isNaN(money) || money == '' || money == null) {
		money = +prompt('Ваш бюджет на месяц?', '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function () {
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
			b = expensesItem[++i].value;

		if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
			console.log('Все верно');
			appData.expenses[a] = b;
			sum += +b;
		} else {
			i = i - 1;
		}
	}
	expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {
	for (let i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});

countBtn.addEventListener('click', function () {

	if (appData.budget != undefined) {
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		dayBudget.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = 'Минимальный уровень достатка';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'Средний уровень достатка';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'Высокий уровень достатка';
		} else {
			levelValue.textContent = 'Произошла ошибка';
		}
	}else{
		dayBudget.textContent = 'Произошла ошибка';
	}
});

chooseIncome.addEventListener('input', function(){
	let items = chooseIncome.value;
	appData.income = items.split(', ');
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function(){
	if(appData.saving == true){
		appData.saving = false;
	}else{
		appData.saving = true;
	}
});

sumValue.addEventListener('input', function(){
	if (appData.saving == true) {
		let sum = +sumValue.value,
		percent = +procentValue.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});
procentValue.addEventListener('input', function () {
	if(appData.saving == true){
			let sum = +sumValue.value,
				percent = +procentValue.value;

			appData.monthIncome = sum / 100 / 12 * percent;
			appData.yearIncome = sum / 100 * percent;

			monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
			yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	saving: false
};;