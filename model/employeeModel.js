// map to collection in mongo db
class Employee {
	constructor(
		id,
		name,
		designation,
		email,
		contact,
		department,
		joiningDate,
		location,
	) {
		this.id = id;
		this.name = name;
		this.designation = designation;
		this.email = email;
		this.contact = contact;
		this.department = department;
		this.joiningDate = joiningDate;
		this.location = location;
	}
}

module.exports = Employee;
