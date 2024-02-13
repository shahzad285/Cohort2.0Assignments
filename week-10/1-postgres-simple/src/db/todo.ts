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

interface Todo {
    title: string,
    description: string,
    done: boolean,
    id: number,
    user_id:number
}

export async function createTodo(userId: number, title: string, description: string) {
        const query = "insert into todos(user_id,title,description) values($1,$2,$3)";
        const values = [userId, title, description]
        await client.query(query, values);
        const t = await client.query("select * from todos order by id desc limit 1");
        return t.rows[0];
   
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
    
        let query = "select * from todos where id=$1";
        const values = [todoId]
        const todo = await client.query(query, values);
        if (todo != null) {
            query = "update todos set done=true where id=$1"
            await client.query(query, values);
        }
        query = "select * from todos where id=$1";
        const t = await client.query(query, values);
        return t.rows[0];
    
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
    
        const query = "select * from todos where user_id=$1";
        const values = [userId]
        const t= await client.query(query, values);
        return  t.rows;
        // let todos: Todo[] = [];
        // t.rows.forEach(element => {
        //     let todo: Todo = {
        //         title: element.title,
        //         description: element.description,
        //         done: element.done == 0 ? false : true,
        //         id: element.id
        //     }
        //     todos.push(todo);
        // });

        // return todos;
    
}