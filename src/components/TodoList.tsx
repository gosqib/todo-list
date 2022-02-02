import React from "react"
import {TodoObject} from '../App'


interface Props {
    todos: TodoObject[]
    setTodos: React.Dispatch<React.SetStateAction<TodoObject[]>>
    filteredTodos: TodoObject[]
}
const TodoList: React.FC<Props> = ({todos, setTodos, filteredTodos}) => {
    return <ul className="todo-list">
        {filteredTodos.map((filteredTodo: TodoObject) => (
            <Todo 
                key={filteredTodo.id} 
                todoText={filteredTodo.text} 
                todo={filteredTodo}
                todos={todos} 
                setTodos={setTodos} 
            />
        ))}
    </ul>
}

interface TodoProps {
    todoText: string
    todo: TodoObject
    todos: TodoObject[]
    setTodos: React.Dispatch<React.SetStateAction<TodoObject[]>>
}
const Todo: React.FC<TodoProps> = ({todoText, todo, todos, setTodos}) => {
    function deleteTodo(): void {
        setTodos(todos.filter((element: TodoObject): boolean => element.id !== todo.id))
    }

    function completeTodo(): void {
        setTodos(todos.map((t: TodoObject): TodoObject => {
            if (t.id === todo.id) {
                return {...t, completed: !t.completed}
            }

            return t
        }))
    }

    return <div className="todo">
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{todoText}</li>
        <button onClick={completeTodo} className="complete-btn">
            <i className="fas fa-check"></i>
        </button>
        <button onClick={deleteTodo} className="trash-btn">
            <i className="fas fa-trash"></i>
        </button>
    </div>
}

export default TodoList