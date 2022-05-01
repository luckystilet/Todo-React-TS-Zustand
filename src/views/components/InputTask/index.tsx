import React, {FC, useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'

interface InputTasksProps {
	id: string
	title: string
	isDone: boolean
	onDone: (id: string, value: boolean) => void
	onEdit: (id: string, value: string) => void
	onRemove: (id: string) => void
}

const InputTask: FC<InputTasksProps> = ({
	id,
	title,
	isDone,
	onDone,
	onEdit,
	onRemove
}) => {
	const [checked, setChecked] = useState(isDone)
	const [isEditMode, setIsEditMode] = useState(false)
	const [editValue, setEditValue] = useState(title)
	const editRef = useRef<HTMLInputElement>(null)
	const onDoneHandler = () => {
		setChecked(!checked)
		onDone(id, !checked)
	}
	
	const endEdit = () => {
		setIsEditMode(false)
		onEdit(id, editValue)
	}
	
	useEffect(() => {
		if (!isEditMode) return
		editRef?.current?.focus()
	}, [isEditMode])
	return (
		<div className={styles['input-task']}>
			<label className={styles['input-task__label']}>
				<input
					className={styles['input-task__checkbox']}
					type="checkbox"
					disabled={isEditMode}
					checked={checked}
					onChange={() => onDoneHandler()}
				/>
				{!isEditMode ? (
					<h3 className={
						`${styles['input-task__title']}
						 ${isDone ? styles['through'] : ''}
						`
					}>{title}</h3>
					) : (
					<input
						className={styles['input-task__title_edit']}
						type="text"
						ref={editRef}
						value={editValue}
						onChange={(event) => {
							setEditValue(event.target.value)
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') endEdit()
						}}
					/>
				)}
				
			</label>
			{!isEditMode ? (
				<button
					className={styles['input-task__edit']}
					onClick={() => {
						setIsEditMode(true)
					}}
				/>
			) : (
				<button
					className={styles['input-task__confirm']}
					onClick={endEdit}
				/>
			)}
			<button
				className={styles['input-task__remove']}
				onClick={() => {
					if(confirm('are you sure?')) {
						onRemove(id)
					}
				}}
			/>
		</div>
	)
}

export default InputTask
