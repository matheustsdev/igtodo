import { ClipboardText } from 'phosphor-react'
import styles from './styles.module.scss'

export function NoTodo() {
	return (
		<div className={styles.notodo}>
			<ClipboardText size={56} weight="thin" />
			<span>Você ainda não tem tarefas cadastradas</span>
			<p>Crie tarefas e organize seus itens a fazer</p>
		</div>
	)
}
