import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { ToDoProps } from '../components/Todo'
import { api } from '../service/api'

interface TodoContextProps {
	todos: ToDoProps[]
	handleDeleteTodo(id: string): void
	handleToggleCheck(id: string): void
	handleUpdateName(id: string, name: string): void
	handleCreateTodo(name: string): void
}

interface TodoProviderProps {
	children: ReactNode
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps)

export function TodoProvider({ children }: TodoProviderProps) {
	const [todos, setTodos] = useState<ToDoProps[]>([])

	function handleDeleteTodo(id: string) {
		api.delete(`/todo/${id}`).then((res) => {
			setTodos(res.data)
		})
	}

	function handleToggleCheck(id: string) {
		api.patch(`/todo/check/${id}`).then((res) => {
			setTodos(res.data)
		})
	}

	function handleUpdateName(id: string, name: string) {
		api.patch(`/todo/${id}`, { name }).then((res) => {
			setTodos(res.data)
		})
	}

	function handleCreateTodo(name: string) {
		api.post('/todo', { name }).then((res) => {
			setTodos(res.data)
		})
	}

	useEffect(() => {
		api.get<ToDoProps[]>('/todo').then((res) => {
			setTodos(res.data)
		})
	}, [])

	return (
		<TodoContext.Provider
			value={{
				todos,
				handleDeleteTodo,
				handleToggleCheck,
				handleUpdateName,
				handleCreateTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}

export function useTodo(): TodoContextProps {
	const context = useContext(TodoContext)

	return context
}
