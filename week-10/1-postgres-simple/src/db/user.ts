import { QueryResult } from "pg";
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
type User = {
    username: string,
    password: string,
    name: string

}
export async function createUser(username: string, password: string, name: string) {
    const query = "insert into users(username,password,name) values($1,$2,$3)";
    const values = [username, password, name]
    await client.query(query, values);
    const t: QueryResult<User> = await client.query("select username,password,name from users order by id desc limit 1");
    const mappedObject: User = t.rows[0];
    return mappedObject;

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
    const query = "select username,password,name from users where userId=$1";
    const values = [userId]
    const t: QueryResult<User> = await client.query(query, values);
    const mappedObject: User = t.rows[0];
    return mappedObject;
}
