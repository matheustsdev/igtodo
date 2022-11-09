import './global.scss'
import styles from './app.module.scss'
import { Header } from './components/Header'
import { Todo, ToDoProps } from './components/Todo'
import { Summary } from './components/Summary'
import { AddTodoInput } from './components/AddTodoInput'
import { NoTodo } from './components/NoTodo'
import { useEffect, useMemo, useState } from 'react'
import { ErrorToast } from './components/ErrorToast'

const mockedTodos: ToDoProps[] = [
	{
		id: '1',
		name: 'Finalizar projeto',
		isChecked: false,
	},
	{
		id: '2',
		name: 'Testar todos',
		isChecked: true,
	},
	{
		id: '3',
		name: 'Criar backend para o todo',
		isChecked: false,
	},
	{
		id: '4',
		name: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
		isChecked: true,
	},
]

// const todos: ToDoProps[] = []

function App() {
	const [todos, setTodos] = useState<ToDoProps[]>(mockedTodos)
	const [concludedTodos, setConcludedTodos] = useState<number>(0)
	const [error, setError] = useState('')

	const toastDuration = 3000

	function handleAddTodo(name: string) {
		if (name !== '') {
			let id = ''

			if (todos.length <= 0) {
				id = '1'
			} else {
				id = `${Number(todos[todos.length - 1].id) + 1}`
			}

			const newTodo: ToDoProps = {
				id,
				name,
				isChecked: false,
			}

			setTodos([newTodo, ...todos])
		} else {
			setError('Please insert a name of todo.')
		}
	}

	function handleDeleteTodo(id: string) {
		const newTodos = todos

		const index = newTodos.findIndex((todo) => {
			return todo.id === id
		})

		if (index !== -1) {
			newTodos.splice(index, 1)
			setTodos([...newTodos])
		}
	}

	function handleToggleTodoValue(id: string) {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				const updatedTodo: ToDoProps = {
					id: todo.id,
					name: todo.name,
					isChecked: !todo.isChecked,
				}
				return updatedTodo
			}

			return todo
		})

		setTodos([...updatedTodos])
	}

	useEffect(() => {
		const count = todos.reduce((acc, todo) => {
			return todo.isChecked ? acc + 1 : acc
		}, 0)

		setConcludedTodos(count)
	}, [todos])

	useEffect(() => {
		if (error !== '') {
			setTimeout(() => {
				setError('')
			}, 2 * toastDuration)
		}
	}, [error])

	return (
		<>
			<div>
				<Header />
				<div className={styles.todoList}>
					<AddTodoInput onAddTodo={handleAddTodo} />
					<Summary
						totalOfConcludeds={concludedTodos}
						total={todos.length}
					/>
					{todos.length <= 0 ? (
						<NoTodo />
					) : (
						todos.map((todo) => {
							return (
								<Todo
									todo={todo}
									key={todo.id}
									onDeleteTodo={handleDeleteTodo}
									onToggleTodoValue={handleToggleTodoValue}
								/>
							)
						})
					)}
				</div>
			</div>
			{error === '' ? (
				<></>
			) : (
				<ErrorToast error={error} duration={toastDuration} />
			)}
		</>
	)
}

export default App
