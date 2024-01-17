import { create } from 'zustand'
import API from '../utils/API'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

interface TTask {
  id: string
  title: string
}

interface TaskStore {
  tasks: TTask[]
  selectedTask: TTask | null
  setSelectedTask: (task: TTask) => void
  modalVisible: boolean
  setModalVisible: (boolean: boolean) => void
  addTask: (inputValue: string) => void
  removeTask: (id: string) => void

}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: API.INITIAL_TASKS ?? [],
  modalVisible: false,
  selectedTask: null,
  setSelectedTask: (task) => {
    set((state) => ({ ...state, selectedTask: task }))
  },
  setModalVisible: (boolean) => {
    set((state) => {
      return { ...state, modalVisible: boolean as boolean }
    })
  },
  addTask: (inputValue) => {
    set((state) => {
      return { ...state, tasks: [...state.tasks, { id: nanoid(), title: inputValue }] }
    })
  },
  removeTask: (id) => {
    set((state) => {
      return { ...state, tasks: state.tasks.filter((e: TTask) => e.id !== id) }
    })
  }

}))
