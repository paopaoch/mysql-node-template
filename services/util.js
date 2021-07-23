function connect() {
	const mysql = require('mysql')
	const params = {
		'host' : 'localhost',
		'user' : 'root',
		'password' : 'root',
		'database' : 'tutor'
	}
	const conn = mysql.createConnection(params)
	conn.connect((err) => {
		if (err) throw err;
	})
	return conn;
}
