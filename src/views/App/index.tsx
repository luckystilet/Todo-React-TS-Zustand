import React, {FC} from 'react'
import { useToDoStore } from '../../data/stores/useToDoStore'
import InputTask from '../components/InputTask'
import styles from './index.module.scss'
import InputPlus from '../components/InputPlus'

const App: FC = () => {
	const [
		tasks,
		createTask,
		updateTask,
		removeTask,
		updateDoneTask
	] = useToDoStore(state => [
		state.tasks,
		state.createTask,
		state.updateTask,
		state.removeTask,
		state.updateDoneTask
	])
	return (
		<article className={styles['article']}>
			<h1 className={styles['article__title']}>To Do App</h1>
			<section className={styles['article__section']}>
				<InputPlus
					onAdd={(title) => createTask(title)}
				/>
			</section>
			<section className={styles['article__section']}>
				{!tasks.length && (
					<p className={styles['article__text']}>There is no one task!</p>
				)}
				{tasks.map(task => (
					<InputTask
						key={task.id}
						id={task.id}
						title={task.title}
						isDone={task.isDone}
						onDone={(id, value) => {
							updateDoneTask(id, value)
						}}
						onEdit={updateTask}
						onRemove={removeTask}
					/>
				))}
			</section>
		</article>
	)
}

export default App
