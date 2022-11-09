import { Warning } from 'phosphor-react'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

interface ErrorToastProps {
	error: string
	duration?: number
}

export function ErrorToast({ error, duration = 2500 }: ErrorToastProps) {
	const [isOpen, setIsOpen] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setIsOpen(false)
		}, duration)
	}, [])

	return (
		<div
			className={`${styles.toast} ${
				isOpen ? styles.rightEnterAnimation : styles.rightLeaveAnimation
			}`}
		>
			<div>
				<Warning size={24} />
				<span>Erro</span>
			</div>
			<p>{error}</p>
		</div>
	)
}
