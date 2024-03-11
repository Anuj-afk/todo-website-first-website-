import react, {useState,useEffect} from "react"
import "./App.css"
const App = () =>{
    const [todos, Settodos] = useState([])

    useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            Settodos(loadedTodos);
        }
      }, []);
    useEffect(() => {
        if(todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
      }, [todos]);

    const addtodo = (e) => {
        e.preventDefault()
        let todo = document.getElementById("todoinput").value
        const newtodos = {id: new Date().getTime(), task: todo.trim(), completed: false, toedit: false}
        if(newtodos.task.length !== 0){
        Settodos([...todos].concat(newtodos))
        }
        else{
        alert("enter a valid input")
        }
        document.getElementById("todoinput").value = ""
    }

    const deletetodo = (id) => {
        let newtodos = [...todos].filter((todo) => todo.id !== id)
        Settodos(newtodos)
    }

    const check = (id) => {
        let newtodos = [...todos].map((todo) => { 
        if(todo.id === id){
            todo.completed  = !todo.completed
        }
        return todo
    })
        Settodos(newtodos)
    }

    const edittodo = (id, task) => {
        
        let newtodo = [...todos].map((todo) => {
            let newedit = document.getElementById("submitedit") === null ? todo.task : document.getElementById("submitedit").value
            if(todo.id === id){
                todo.toedit = !todo.toedit
                todo.task = newedit
            }
            return todo
        })
        Settodos(newtodo)
    }

    return(
        <div>
            <h1>Todo List</h1>
            <form onSubmit={addtodo}>
                <input type="text" id = "todoinput"></input>
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => 
                <div className="todolist">
                    <input type="checkbox" checked = {todo.completed} onChange={() => check(todo.id)} ></input>
                    {todo.toedit === true ? <input defaultValue={todo.task} id = "submitedit"></input> : todo.task} 
                    <div className = "buttons">
                        {todo.toedit === true ? <button onClick={() => edittodo(todo.id, todo.task)}>Submit Edit</button> : <button onClick= {() => edittodo(todo.id)}>Edit</button>}
                        <button onClick= {() => deletetodo(todo.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default App