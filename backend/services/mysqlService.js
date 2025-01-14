const mysql = require('mysql2/promise');

const dbConfig = {
    host : "mysql-0.mysql-service",
    user : "root",
    password : "9292",
    database: "testdb",
    port: "3306",
};

async function storeInMySQL(text){
    const encoded = Buffer.from(text).toString("base64");
    const connection = await mysql.createConnection(dbConfig);
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS data (
                original TEXT NOT NULL,
                encoded TEXT NOT NULL
            );
        `;
    await connection.execute(createTableQuery);
    const query = "INSERT INTO data (original, encoded) VALUES (?, ?)";
    const [result] = await connection.execute(query, [text, encoded]);
    await connection.end();
    return result;
}

async function fetchFromMySQL(){
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT original, encoded FROM data");
    await connection.end();
    return rows.map((row) => ({
        original : row.original,
        encoded: row.encoded,
        db: "MySQL",
    }));
}

module.exports = {storeInMySQL, fetchFromMySQL};