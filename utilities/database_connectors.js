const mysql = require('mysql');

/**
 * Execute the given query with the given params array.
 */
exports.executeMysqlQuery = async (query, params) => {
    return new Promise(async(resolve, reject) => {
        const connection = await getConnection();
        let result;
        try {
            connection.query(query, params, (error, results, fields) => {
                console.log(results);
                if (error) {
                    console.error(error);
                } else {
                    result = results;
                }
                if (connection) {
                    connection.end();
                }
                resolve(result);
            });
        } catch (ex) {
            console.error(ex);
            if (connection) {
                connection.end();
            }
            reject(ex);
        }
    });
};

/**
 * Get connection to MySQL database hosted by ClearDB.
 */
async function getConnection() {
    return mysql.createConnection({
        host: process.env.CLEARDB_HOST,
        user: process.env.CLEARDB_USER,
        password: process.env.CLEARDB_PASS,
        database: process.env.CLEARDB_DB
    });
}
