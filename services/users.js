import {connect} from '@/services/util'
export function getUser(username, password) {
	const conn = connect()
	const sql = "SELECT * FROM users WHERE email='" + username + "' AND password='" + password + "'"
	//console.log(sql)
	conn.query(sql, (err, result, fields) => {
		if (err) throw err;
		console.log(result)
	})
}

export async function getAllUser() {
	const conn = connect()
	const sql = "SELECT * FROM users"
	let rs = []
	console.log(sql)
	let x = await conn.query(sql, (err, result, fields) => {
		if (err) throw err;
		return result
	})
	console.log("await return ",x)
	//console.log("in service ",rs)
	return rs
}