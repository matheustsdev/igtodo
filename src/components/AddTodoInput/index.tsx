import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'
import styles from './styles.module.scss'

interface AddTodoProps {
	onAddTodo(name: string): void
}

export function AddTodoInput({ onAddTodo }: AddTodoProps) {
	const [name, setName] = useState('')

	return (
		<div className={styles.addTodoContainer}>
			<input
				placeholder="Adicione uma nova tarefa"
				value={name}
				onChange={(e) => {
					setName(e.target.value)
				}}
			/>
			<button
				onClick={() => {
					onAddTodo(name)
					setName('')
				}}
			>
				Criar
				<PlusCircle size={20} weight="bold" />
			</button>
		</div>
	)
}
