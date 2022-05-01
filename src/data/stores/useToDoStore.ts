import create, {State, StateCreator} from 'zustand'
import { devtools } from 'zustand/middleware'
import {generateId} from '../../helpers'

interface Task {
	id: string
	title: string
	createdAt: number
	isDone: boolean
}
interface ToDoStore {
	tasks: Task[]
	createTask: (title: string) => void
	updateTask: (id: string, title: string) => void
	removeTask: (id: string) => void
	updateDoneTask: (id: string, newIsDone: boolean) => void
}
function isToDoSore(object: any): object is ToDoStore {
	console.log('isToDoSore  ', object)
	return 'tasks' in object
}
const localStorageUpdate = <T extends State>(config: StateCreator<T>):
	StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
		
		console.log('localStorageUpdate 1  ', nextState)
		// if (!isToDoSore(nextState)) return
		// console.log('localStorageUpdate 2')
		// window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks))
		set(nextState, ...args)
}, get, api)

export const useToDoStore = create<ToDoStore>(localStorageUpdate(devtools((set, get) => ({
	tasks: [],
	createTask: (title) => {
		const newTask = {
			id: generateId(),
			title,
			createdAt: Date.now(),
			isDone: false
		}
		set(state => ({
			...state,
			tasks: [newTask, ...state.tasks]
		}))
	},
	updateTask: (id, title) => {
		set(state => ({
			...state,
			tasks: state.tasks.map(task => ({
				...task,
				title: task.id === id ? title : task.title
			}))
		}))
	},
	removeTask: (id) => {
		set(state => ({
			...state,
			tasks: state.tasks.filter(task => task.id !== id)
		}))
	},
	updateDoneTask: (id, newIsDone) => {
		set(state => {
			const tasks = [...state.tasks]
			const index = tasks.findIndex(task => task.id === id)
			tasks[index].isDone = newIsDone
			return { tasks }
		})
	}
}))))
