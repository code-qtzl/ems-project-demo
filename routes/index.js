var express = require('express');
var router = express.Router();
var loginController = require('../controller/loginController');
var fs = require('fs');
var path = require('path');

// Load employees data
const employeesFilePath = path.join(__dirname, '../data/employees.json');
let employeesData = require('../data/employees.json');

// Helper function to save employees to file
function saveEmployees(employees) {
	fs.writeFileSync(employeesFilePath, JSON.stringify(employees, null, '\t'));
	employeesData = employees;
}

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Employee Directory',
		employees: employeesData,
	});
});

// open the login page
router.get('/login', (request, response) => {
	const { successMsg } = request.query;
	const normalizedSuccessMsg = Array.isArray(successMsg)
		? successMsg[0]
		: successMsg || '';

	response.render('login.ejs', {
		msg: '',
		successMsg: normalizedSuccessMsg,
	});
});

// open the login page
router.get('/signUp', (request, response) => {
	response.render('signUp.ejs', { msg: '' });
});

// check login details from db
router.post('/admin/dashboard', loginController.checkLogin);

// GET route for dashboard
router.get('/admin/dashboard', (request, response) => {
	response.render('dashboard.ejs', {
		name: 'User',
		totalEmployees: employeesData.length,
		employees: employeesData,
		recentEmployees: employeesData.slice(0, 5),
	});
});

// check login details from db
router.post('/signUp', loginController.signUp);

// API Routes for employee management

// Get all employees
router.get('/api/employees', (req, res) => {
	res.json(employeesData);
});

// Get single employee by ID
router.get('/api/employees/:id', (req, res) => {
	const employee = employeesData.find((emp) => emp.id === req.params.id);
	if (employee) {
		res.json(employee);
	} else {
		res.status(404).json({ error: 'Employee not found' });
	}
});

// Create new employee
router.post('/api/employees', (req, res) => {
	const nextNumericId =
		employeesData.reduce((maxId, employee) => {
			const numericId = parseInt(employee.id, 10);
			return Number.isNaN(numericId) ? maxId : Math.max(maxId, numericId);
		}, 0) + 1;

	const newEmployee = {
		id: nextNumericId.toString(),
		name: req.body.name,
		designation: req.body.designation,
		email: req.body.email,
		contact: req.body.contact || 'N/A',
		department: req.body.department || 'Not Assigned',
		joiningDate:
			req.body.joiningDate || new Date().toISOString().split('T')[0],
		location: req.body.location || 'Not Specified',
	};

	employeesData.push(newEmployee);
	saveEmployees(employeesData);
	res.json(newEmployee);
});

// Update employee
router.put('/api/employees/:id', (req, res) => {
	const index = employeesData.findIndex((emp) => emp.id === req.params.id);

	if (index !== -1) {
		employeesData[index] = {
			...employeesData[index],
			name: req.body.name,
			designation: req.body.designation,
			email: req.body.email,
			contact: req.body.contact || employeesData[index].contact,
			department: req.body.department || employeesData[index].department,
			joiningDate:
				req.body.joiningDate || employeesData[index].joiningDate,
			location: req.body.location || employeesData[index].location,
		};

		saveEmployees(employeesData);
		res.json(employeesData[index]);
	} else {
		res.status(404).json({ error: 'Employee not found' });
	}
});

// Delete employee
router.delete('/api/employees/:id', (req, res) => {
	const index = employeesData.findIndex((emp) => emp.id === req.params.id);

	if (index !== -1) {
		const deletedEmployee = employeesData.splice(index, 1);
		saveEmployees(employeesData);
		res.json(deletedEmployee[0]);
	} else {
		res.status(404).json({ error: 'Employee not found' });
	}
});

module.exports = router;
