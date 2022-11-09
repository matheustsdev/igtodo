import rocket from '../../assets/rocket.svg'
import styles from './styles.module.scss'

export function Header() {
	return (
		<div className={styles.header}>
			<div>
				<img src={rocket} alt="Rocket logo" />
				<span>to</span>
				<span>do</span>
			</div>
		</div>
	)
}
