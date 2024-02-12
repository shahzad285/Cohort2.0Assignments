import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */

export async function createUser(username: string, password: string, name: string) {
    try {
        const query = "insert into users(username,password,name) values($1,$2,$3)";
        const values = [username, password, name]
        await client.query(query, values);
        const t = await client.query("select username,password,name from users order by id desc limit 1");
        return t.rows[0];
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try {
        const query = "select username,password,name from users where id=$1";
        const values = [userId]
        const t = await client.query(query, values);
        return t.rows[0];
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
