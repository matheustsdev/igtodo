import { Trash } from 'phosphor-react'
import { Checkbox } from '../Checkbox'
import styles from './styles.module.scss'

export interface ToDoProps {
	id: string
	name: string
	isChecked: boolean
}

interface TodoComponentProps {
	todo: ToDoProps
	onDeleteTodo(id: string): void
	onToggleTodoValue(id: string): void
}

export function Todo({
	todo,
	onDeleteTodo,
	onToggleTodoValue,
}: TodoComponentProps) {
	function handleToggleCheckbox() {
		onToggleTodoValue(todo.id)
	}

	return (
		<div className={styles.todo}>
			<div>
				<Checkbox
					isChecked={todo.isChecked}
					onClick={handleToggleCheckbox}
				/>
			</div>

			<p
				className={
					todo.isChecked
						? styles.descriptionChecked
						: styles.descriptionUnchecked
				}
			>
				{todo.name}
			</p>
			<div
				className={styles.deleteContainer}
				onClick={() => {
					onDeleteTodo(todo.id)
				}}
			>
				<Trash size={24} />
			</div>
		</div>
	)
}
