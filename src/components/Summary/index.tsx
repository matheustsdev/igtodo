import styles from './styles.module.scss'

interface SummaryProps {
	total: number
	totalOfConcludeds: number
}

export function Summary({ total, totalOfConcludeds }: SummaryProps) {
	return (
		<div className={styles.summary}>
			<div className={styles.total}>
				<p>Tarefas criadas</p>
				<span>{total}</span>
			</div>
			<div className={styles.concluded}>
				<p>Concluídas</p>
				<span>
					{total !== 0
						? `${totalOfConcludeds} de ${total}`
						: `${total}`}
				</span>
			</div>
		</div>
	)
}
