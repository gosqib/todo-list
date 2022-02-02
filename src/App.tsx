import React, { useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import {BrowserRouter as Router, Link} from 'react-router-dom'

interface Status {
	complete: string
	uncomplete: string
}
const STATUS: Status = {
	complete: 'Completed | ',
	uncomplete: 'Uncompleted'
}

export interface TodoObject {
	text: string,
	completed: boolean,
	id: number
}
const App: React.FC = () => {
	const [inputText, setInputText] = useState<string>('')
	const [todos, setTodos] = useState<TodoObject[]>([])
	const [status, setStatus] = useState<string>(
		localStorage.getItem('last-status') || 'everything, this text doesnt matter'
	)
	const [filteredTodos, setFilteredTodos] = useState<TodoObject[]>([])
	{
			let x = [...Array(100).keys()]
	}
	
	// grab todos from last website visit
	useEffect(getLocalTodos, [])
	// save the todo to localstorage
	useEffect(saveTodosLocal, [todos])
	// change current filter
	useEffect(filterTodos, [todos, status])

	
	function filterTodos(): void {
		switch (status) {
			case STATUS.complete:
				setFilteredTodos(todos.filter((todo: TodoObject): boolean => todo.completed))
				break
			case STATUS.uncomplete:
				setFilteredTodos(todos.filter((todo: TodoObject): boolean => !todo.completed))
				break
			// default: short for case 'all'
			default: 
				setFilteredTodos(todos)
		}



	}
	function getLocalTodos() {
		if (!localStorage.getItem('todos')) {
			localStorage.setItem('todos', JSON.stringify([]))
		} else {
			// || [] for empty item, parse(a): a cant be bull
			setTodos(JSON.parse(localStorage.getItem('todos') || '[]'))
		}
	}
	function saveTodosLocal(): void {
		/* saves person's todos to locatstoarge'
		no need to check if the localstorage is empty first because it will be done by a
		preceeding function
		*/

		localStorage.setItem('todos', JSON.stringify(todos))
	}

	function saveCurrentFilterToLocal(status: string): void {
        localStorage.setItem('last-status', status)
    }

	function statusUpdater(e: React.MouseEvent<HTMLAnchorElement>): void {
        const status = e.currentTarget.innerText
        setStatus(status)
        saveCurrentFilterToLocal(status)
    }

	return <Router>
		<header>
			<h1><a onClick={
				(): void => localStorage.setItem('last-status', 'everything')
			} href="/" className='singlea'>Very good title</a></h1>
			<br/>
			<p>
				simple some retexta sdasdasd Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit error minus quia repellat, enim dignissimos, sint explicabo sequi doloribus labore ratione, nesciunt ipsa sapiente tenetur aliquid earum ex reiciendis ipsam?
				<br/>controls intuitive gl
			</p>
			<br/><hr/><br/>
		</header>

		<Form 
			inputText={inputText} 
			setInputText={setInputText} 
			setTodos={setTodos}
			setStatus={setStatus}
			/>

		<nav className="todo-filter-nav">
			<Link to='/' onClick={statusUpdater}>All | </Link>
			<Link to='/completed' onClick={statusUpdater}>Completed | </Link>
			<Link to='/uncompleted' onClick={statusUpdater}>Uncompleted</Link>
		</nav>
		<TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />

	</Router>

}
export default App;