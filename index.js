// each user can login
// each user can only see their todos
// each user can create, delete, update
// app should be persistent - ie save/load
fs = require("fs")

class User {
    static users = []
    static loggedInUser = null
    constructor(name, password) {
        this.name = name
        this.password = password
    }

    static createUsers() {
        require("./users.json").forEach(user => {
            this.users.push(new User(user.name, user.password))
        })
    }

    static getDetails() {
        console.log("what is your username")
        console.log("what is your password")
        return ["glen", "password123"]
    }
    
    static login(username, password) {
        this.users.forEach(user => {
            if (user.name == username) {
                if (user.password == password) {
                    this.loggedInUser = user
                    return true
                }
            }
        })
        return false
    }

    myTodos(todos) {
        return todos.filter(todo => todo.owner == this.name)
    }
}

class ToDo {
    static todos = []
    constructor(title, content, date, owner) {
        this.title = title
        this.content = content
        this.date = date
        this.owner = owner
        ToDo.todos.push(this)
    }

    static createTodos() {
        require("./todos.json").forEach(todo => {
            new ToDo(todo.title, todo.content, todo.date, todo.owner)
        })
    }

    static newTodo(title, content, date, owner) {
        new ToDo(title, content, date, owner)
    }

    destroy() {
        let index = ToDo.todos.indexOf(this)
        ToDo.todos.splice(index,1)
    }
}

User.createUsers()

// scuffed 
let [username, password] = User.getDetails()

if (User.login(username, password) == false) {
    [username, password] = User.getDetails()
}
user = User.loggedInUser
console.log("super secret")

ToDo.createTodos()

console.log("here are your todos")
user.myTodos(ToDo.todos)

console.log("create a todos")
title = "seventh"
content = "something"
date = "2021, 12, 9"

new ToDo(title, content, date, user.name)

console.log("delete a todos")
console.log("which one to delete")
user.myTodos(ToDo.todos)

let deleteIndex = 4
todoToDelete = user.myTodos(ToDo.todos)[deleteIndex]

todoToDelete.destroy()

fs.writeFile("./users.json", JSON.stringify(User.users, null, 4), () => {})
fs.writeFile("./todos.json", JSON.stringify(ToDo.todos, null, 4), () => {})

