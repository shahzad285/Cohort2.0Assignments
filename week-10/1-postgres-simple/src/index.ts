import { Client } from 'pg'
import { DB_URL } from './config';
import { dropTables, createTables } from './db/setup';
import { getTodos,createTodo,updateTodo } from './db/todo';
import { createUser,getUser } from './db/user';

export const client = new Client({
    connectionString: DB_URL
});



async function dropTablesIfExists() {
    try {
        await client.connect();
        await dropTables();
    }
    catch (err) {
        console.log(err);
    }
    finally {
       await client.end();
     }
}

async function createTablesExists() {
    try {
        await client.connect();
        await createTables();
    }
    catch (err) {
        console.log(err);
    }
    finally { 
        await client.end();
    }
}
async function addUser() {
    try {
        await client.connect();
        let t=await createUser('shahzad','Password@1','Shahzad Ahamad');
        console.log(t);
    }
    catch (err) {
        console.log(err);
    }
    finally { 
        await client.end();
    }
}

dropTablesIfExists();
createTables();
addUser();

