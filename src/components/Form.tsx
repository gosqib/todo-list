import React from "react";
import {TodoObject} from '../App'

interface Props {
    inputText: string
    setInputText: React.Dispatch<React.SetStateAction<string>>
    setTodos: React.Dispatch<React.SetStateAction<TodoObject[]>>
    setStatus: React.Dispatch<React.SetStateAction<string>>
}
const Form: React.FC<Props> = ({inputText, setInputText, setTodos, setStatus}) => {
    function inputValueSetter(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputText(e.target.value)
    }

    function submitTodo(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()

        setTodos((prev: TodoObject[]) => [
            ...prev, {text: inputText, completed: false, id: Math.random()}
        ])
        setInputText('')
    }

    return <form action="">
            <input placeholder="type todo here"
                value={inputText} 
                onChange={inputValueSetter} 
                type="text" 
                className="todo-input" 
            />
            <button onClick={submitTodo} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
    </form>
}
export default Form
