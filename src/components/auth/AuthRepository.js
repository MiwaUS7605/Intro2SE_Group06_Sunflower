const db = require('../../db');
const bcrypt = require('bcryptjs');

class AuthRepository {
    async emailExists(email) {
        const result = await db.connection.execute('select email from account where email = ? limit 1', [email]);
        return result[0].length > 0;
    }

    async getUserByEmail(email) {
        const result = await db.connection.execute('select * from account where email = ? limit 1', [email]);
        return result[0] && result[0][0];
    }

    async insertUser(name, phonenumber, address, email, password) {
        await db.connection.execute('insert into `account` (`name`, `phonenumber`,`address`,`email`,`password`)\
                                    values (?,?,?,?,?)', [name,phonenumber,address,email,password]);
    }

    async edit(nname, nphonenumber, naddress, npassword, user) {
        console.log("Tui dang edit");
        await db.connection.execute('update `account` set `name` = ?, `phonenumber` = ?, `address` = ?, `password` = ?\
                                    where `email` = ?', [nname,nphonenumber,naddress,npassword, user.email]);
    }

    async getUserIdByEmail(email) {
        const result = await db.connection.execute('select idaccount from account where email = ? limit 1', [email]);
        return result[0] && result[0][0];
    }
}

module.exports = new AuthRepository;