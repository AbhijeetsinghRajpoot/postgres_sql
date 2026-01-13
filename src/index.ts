// write a function to create a users table in your database 

import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config()

const client = new Client({
    connectionString: process.env.DATA_BASE_URL
})


async function createUsersTable(){
    await client.connect()
    const results = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `)
        console.log(results)
        client.end
} 

createUsersTable();

async function insertData(){
    try {
        // await client.connect(); // ensure connection
        const insertQuery = `INSERT INTO users (name, email, password) VALUES ('Abhijeet','abhijeet@ibm.com','ibmpassword')`
        const res = await client.query(insertQuery);
        console.log("Insertion Success ",res);
    } catch (error) {
        console.log("error during inserstion",error)
    } finally{
        await client.end();
    }

}

insertData();

