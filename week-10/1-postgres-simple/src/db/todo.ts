import { QueryResult } from "pg";
import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */

type Todo = {
    title: string,
    description: string,
    done: boolean,
    id: number,
    user_id: number

}
export async function createTodo(userId: number, title: string, description: string) {
    try {
        const query = "insert into todos(user_id,title,description) values($1,$2,$3)";
        const values = [userId, title, description]
        await client.query(query, values);
        const t: QueryResult<Todo> = await client.query("select title,description,done,id from todos order by id desc limit 1");
        const mappedObject: Todo = t.rows[0];
        return mappedObject;
    }
    catch (err) {
        console.log(err);
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try {
        let query = "select title,description,done,id from todos where id=$1";
        const values = [todoId]
        const todo = await client.query(query, values);
        if (todo != null) {
            query = "update todos set done=1 where id=$1"
            await client.query(query, values);
        }
        query = "select user_id,title,description,done,id from todos where id=$1";
        const t: QueryResult<Todo> = await client.query(query, values);
        const mappedObject: Todo = t.rows[0];
        return mappedObject;
    }
    catch (err) {
        console.log(err);
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try {
        const query = "select title,description,done,id from todos where user_id=$1";
        const values = [userId]
        const t: QueryResult<Todo[]> = await client.query(query, values);
        const mappedObject: Todo[] = t.rows[0];
        return mappedObject;
    }
    catch (err) {
        console.log(err);
    }
}