let loginService = require('../service/loginService');
let employeesData = require('../data/employees.json');

exports.checkLogin = async (request, response) => {
	let login = request.body;
	console.log(login);
	try {
		let result = await loginService.signIn(login);
		if (result) {
			response.render('dashboard.ejs', {
				name: login.emailId,
				totalEmployees: employeesData.length,
				employees: employeesData,
				recentEmployees: employeesData.slice(0, 5),
			});
		} else {
			response.render('login.ejs', {
				msg: 'failure try once again',
				successMsg: '',
			});
		}
	} catch (error) {
		response.send(error.message);
	}
};

exports.signUp = async (request, response) => {
	let login = request.body;
	console.log(login);
	try {
		let result = await loginService.signUp(login);
		if (result === 'Account created successfully') {
			const successMsg = encodeURIComponent(
				'Account created successfully! Please log in with your credentials.',
			);
			response.redirect(`/login?successMsg=${successMsg}`);
		} else {
			response.render('signUp.ejs', { msg: result });
		}
	} catch (error) {
		response.send(error.message);
	}
};
