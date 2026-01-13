"use strict";
// write a function to create a users table in your database 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.DATA_BASE_URL
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const results = yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
        console.log(results);
        client.end;
    });
}
// createUsersTable();
// async function insertData(){
//     try {
//         // await client.connect(); // ensure connection
//         const insertQuery = `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`;
//         const values  =  ['Abhijeet Singh','with@sql.injection','ibmpassword']
//         const res = await client.query(insertQuery,values);
//         console.log("Insertion Success ",res);
//     } catch (error) {
//         console.log("error during inserstion",error)
//     } finally{
//         await client.end();
//     }
// }
// insertData();
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            client.connect();
            const query = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log("user Found", result.rows[0]); // output user data
                return result.rows[0]; //return the user data
            }
            else {
                console.log("no user found with given wmail");
            }
        }
        catch (error) {
            console.log("error while search..", error);
        }
    });
}
getUserByEmail("abhijeet@ibm.com");
