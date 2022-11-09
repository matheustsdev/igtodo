import { Check } from 'phosphor-react'
import { useState } from 'react'
import styles from './styles.module.scss'

interface CheckboxProps {
	isChecked: boolean
	onClick(): void
}

export function Checkbox({ isChecked, onClick }: CheckboxProps) {
	if (isChecked) {
		return (
			<div className={styles.checked} onClick={onClick}>
				<Check size={16} color="white" weight="bold" />
			</div>
		)
	}

	return <div className={styles.unchecked} onClick={onClick} />
}
