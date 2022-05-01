import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'

interface InputPlusProps {
	onAdd: (title: string) => void
}

const InputPlus: FC<InputPlusProps> = ({
	onAdd
}) => {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const addTask = useCallback(() => {
		if (!inputValue) return
		onAdd(inputValue)
		setInputValue('')
		inputRef?.current?.focus()
	}, [inputValue])
	
	useEffect(() => {
		inputRef?.current?.focus()
	})
	
	return (
		<div className={styles['input-plus']}>
			<input
				type="text"
				className={styles['input-plus__value']}
				value={inputValue}
				ref={inputRef}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(event) => {
					if (event.key === 'Enter') addTask()
				}}
				placeholder="Type text here..."
			/>
			<button
				className={styles['input-plus__button']}
				onClick={() => addTask()}
			/>
		</div>
	)
}

export default InputPlus
