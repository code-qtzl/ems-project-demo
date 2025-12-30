describe('Http Module test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/login');
	});

	it('Login Page heading present', () => {
		//cy.get("#heading").should("have.text","Welcome to Cypress Testing App!")
		cy.contains('Login');
	});
	it('Login with valid emailId and password', () => {
		//cy.get("#heading").should("have.text","Welcome to Cypress Testing App!")
		cy.get("input[type='email']").eq(0).type('admin@gmail.com');
		cy.get("input[type='password']").type('admin123');
		cy.get("input[type='submit']").click();
		cy.url().should('include', '/admin/dashboard');
		cy.contains('Employee Dashboard');
	});
	it('Login with invalid emailId and password', () => {
		//cy.get("#heading").should("have.text","Welcome to Cypress Testing App!")
		cy.get("input[type='email']").eq(0).type('admin@gmail.com');
		cy.get("input[type='password']").type('admin1236');
		cy.get("input[type='submit']").click();
		cy.contains('failure try once again');
	});
	xit('signUp functionality ', () => {
		cy.get("a[href='signUp']").click();
		cy.get("input[type='email']").eq(0).type('admin@gmail.com');
		cy.get("input[type='password']").type('admin123');
		cy.get("input[type='submit']").click();
		cy.contains('Account created successfully');
	});
});
