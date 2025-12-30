describe('Account Creation and Employee Management Flow', () => {
	const testEmail = 'admin@gmail.com';
	const testPassword = 'admin123';
	const newEmployee = {
		name: 'John Doe',
		designation: 'Software Engineer',
		email: 'john.doe@example.com',
		contact: '+1-555-999-8888',
		department: 'Engineering',
		location: 'Austin, TX, USA',
	};
	const updatedEmployee = {
		name: 'John Doe Updated',
		designation: 'Senior Software Engineer',
		email: 'john.doe.updated@example.com',
		contact: '+1-555-999-9999',
		department: 'Engineering',
		location: 'San Francisco, CA, USA',
	};

	it('Step 1: Create a new account', () => {
		cy.visit('http://localhost:3000/signUp');
		cy.contains('Sign Up');
		cy.get("input[type='email']").type(testEmail);
		cy.get("input[type='password']").type(testPassword);
		cy.get("input[type='submit']").click();
		cy.wait(1000);
	});

	it('Step 2: Login with newly created account', () => {
		cy.visit('http://localhost:3000/login');
		cy.contains('Login');
		cy.get("input[type='email']").type(testEmail);
		cy.get("input[type='password']").type(testPassword);
		cy.get("input[type='submit']").click();

		// Verify redirect to dashboard
		cy.url().should('include', '/admin/dashboard');
		cy.contains('Employee Dashboard');
	});

	it('Step 3: Add a new employee', () => {
		// Login first
		cy.visit('http://localhost:3000/login');
		cy.get("input[type='email']").type(testEmail);
		cy.get("input[type='password']").type(testPassword);
		cy.get("input[type='submit']").click();
		cy.url().should('include', '/admin/dashboard');

		// Add new employee
		cy.get('#addEmployeeBtn').click();
		cy.get('#employeeModal').should('be.visible');
		cy.get('#employeeName').type(newEmployee.name);
		cy.get('#employeeDesignation').type(newEmployee.designation);
		cy.get('#employeeEmail').type(newEmployee.email);
		cy.get('#employeeContact').type(newEmployee.contact);
		cy.get('#employeeDepartment').type(newEmployee.department);
		cy.get('#employeeLocation').type(newEmployee.location);
		cy.get('#employeeForm button[type="submit"]').click();

		// Verify employee was added
		cy.get('#employeeModal').should('not.be.visible');
		cy.contains(newEmployee.name);
	});

	it('Step 4: Update the newly created employee', () => {
		// Login first
		cy.visit('http://localhost:3000/login');
		cy.get("input[type='email']").type(testEmail);
		cy.get("input[type='password']").type(testPassword);
		cy.get("input[type='submit']").click();
		cy.url().should('include', '/admin/dashboard');

		// Find and edit the employee
		cy.contains(newEmployee.name)
			.parents('.employee-card')
			.within(() => {
				cy.get('.button-edit').click();
			});

		cy.get('#employeeModal').should('be.visible');
		cy.get('#modalTitle').should('contain', 'Edit Employee');

		// Clear and update fields
		cy.get('#employeeName').clear().type(updatedEmployee.name);
		cy.get('#employeeDesignation')
			.clear()
			.type(updatedEmployee.designation);
		cy.get('#employeeEmail').clear().type(updatedEmployee.email);
		cy.get('#employeeContact').clear().type(updatedEmployee.contact);
		cy.get('#employeeDepartment').clear().type(updatedEmployee.department);
		cy.get('#employeeLocation').clear().type(updatedEmployee.location);
		cy.get('#employeeForm button[type="submit"]').click();

		// Verify employee was updated
		cy.get('#employeeModal').should('not.be.visible');
		cy.contains(updatedEmployee.name);
		cy.contains(updatedEmployee.designation);
	});

	it('Step 5: Delete the employee', () => {
		// Login first
		cy.visit('http://localhost:3000/login');
		cy.get("input[type='email']").type(testEmail);
		cy.get("input[type='password']").type(testPassword);
		cy.get("input[type='submit']").click();
		cy.url().should('include', '/admin/dashboard');

		// Delete the employee
		cy.contains(updatedEmployee.name)
			.parents('.employee-card')
			.within(() => {
				cy.get('.button-danger').click();
			});

		// Confirm deletion in the alert
		cy.on('window:confirm', () => true);

		// Verify employee was deleted
		cy.contains(updatedEmployee.name).should('not.exist');
	});
});
