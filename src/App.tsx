import './global.scss'
import styles from './app.module.scss'
import { Header } from './components/Header'
import { Todo, ToDoProps } from './components/Todo'
import { Summary } from './components/Summary'
import { AddTodoInput } from './components/AddTodoInput'
import { NoTodo } from './components/NoTodo'
import { useEffect, useMemo, useState } from 'react'
import { ErrorToast } from './components/ErrorToast'
import { useTodo } from './hooks/useTodo'

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
	const { todos, handleCreateTodo, handleDeleteTodo, handleToggleCheck } =
		useTodo()
	const [concludedTodos, setConcludedTodos] = useState<number>(0)
	const [error, setError] = useState('')

	const toastDuration = 3000

	const haveTodoToRender = todos !== undefined

	function handleAddTodo(name: string) {
		if (name !== '') {
			handleCreateTodo(name)
		} else {
			setError('Please insert a name of todo.')
		}
	}

	// useEffect(() => {
	// 	const count = todos.reduce((acc, todo) => {
	// 		return todo.isChecked ? acc + 1 : acc
	// 	}, 0)

	// 	setConcludedTodos(count)
	// }, [todos])

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
					<Summary totalOfConcludeds={concludedTodos} total={0} />
					{!haveTodoToRender ? (
						<NoTodo />
					) : (
						todos.map((todo) => {
							return (
								<Todo
									todo={todo}
									key={todo.id}
									onDeleteTodo={() => {
										handleDeleteTodo(todo.id)
									}}
									onToggleTodoValue={() => {
										handleToggleCheck(todo.id)
									}}
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
