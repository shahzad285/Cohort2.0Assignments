/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.listen(3000);
app.use(express.json());
app.use(bodyParser.json());

module.exports = app;

app.get('/todos', function (req, res) {
  if (!fs.existsSync('./files/todos.txt')) {
    fs.writeFile('./files/todos.txt', '', function (err) {
      if (err) throw err;
    });
  }
  fs.readFile('./files/todos.txt', 'utf8', function (err, data) {
    console.log(data);
    res.json(data);
  });
})

app.get('/todos/:id', function (req, res) {

  if (!fs.existsSync('./files/todos.txt')) {
    fs.writeFile('./files/todos.txt', '', function (err) {
      if (err) throw err;
      console.log('File created');
    });
  }
  fs.readFile('./files/todos.txt', 'utf8', function (err, data) {
    try {
      var obj = JSON.parse(data);
      const id = req.params.id;
      obj.forEach(element => {
        if (element.id == id) {
          res.status(200).json(element);
        }
      });
      res.status(404).send('Not found');
    }
    catch (error) {
      console.error('Error parsing JSON:', error.message);
      res.status(500).send('Something went wrong please try again after sometime')
    }
  });
})
  
app.post('/todos', function (req, res) {
  if (!fs.existsSync('./files/todos.txt')) {
    fs.writeFile('./files/todos.txt', '', function (err) {
      if (err) throw err;
      console.log('File created');
    });
  }
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log(data);
    res.end(data);
  });
})

app.delete('/todos/:id',async function (req, res) {
  let index = -1;
  if (!fs.existsSync('./files/todos.txt')) {
    try {
      fs.writeFileSync('./files/todos.txt', '');
      console.log('File created');
    } catch (err) {
      console.error('Error creating file:', err);
    }
  }
  try {
    const data = await readFile('./files/todos.txt');
    var obj = JSON.parse(data);
    const id = req.params.id;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id == id) {
        index = i;
        break;
      }
    }
    if (index>-1) {
      try {
        obj.splice(index,1)
        await writeFile('./files/todos.txt', JSON.stringify(obj));
        console.log('Data removed');
        res.status(200).send('Data removed');
      } catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error('Error reading file or parsing JSON:', error.message);
    res.status(500).send('Internal Server Error');
  }
})

app.put('/todos/:id', async function (req, res) {
  let dataFound = false;
  if (!fs.existsSync('./files/todos.txt')) {
    try {
      fs.writeFileSync('./files/todos.txt', '');
      console.log('File created');
    } catch (err) {
      console.error('Error creating file:', err);
    }
  }
  try {
    const data = await readFile('./files/todos.txt');
    var obj = JSON.parse(data);
    const id = req.params.id;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id == id) {
        const body = req.body;
        obj[i].title = body.title;
        obj[i].description = body.description;
        obj[i].completed = body.completed;
        dataFound = true;
        break;
      }
    }
    if (dataFound) {
      try {
        await writeFile('./files/todos.txt', JSON.stringify(obj));
        console.log('Data updated');
        res.status(200).send('Data updated');
      } catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error('Error reading file or parsing JSON:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


async function readFile(srcPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(srcPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function writeFile(savPath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(savPath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}