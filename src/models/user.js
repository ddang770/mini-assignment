const mysql =  require('mysql2/promise');

// Create the connection to database
const initDB = async () => {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'user-api-basic'
    });
}
initDB();

const createNewUser = async (name, email, password) =>{
    try {
        const results = await connection.query(
            'insert into users (name, email, password) values (?, ?, ?)', [name, email, password]
        );

        return 0;
        } catch (err) {
        console.log(err);
        return 1;
    }
}

module.exports = {
    createNewUser
}
