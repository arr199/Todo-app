import { create } from 'zustand'
import API from '../utils/API'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface TTask {
  id: string
  title: string
}

interface TaskStore {
  tasks: TTask[]
  addTask: (inputValue: string) => void
  removeTask: (id: string) => void

}

interface GlobalStore {
  selectedTask: TTask | null
  setSelectedTask: (task: TTask) => void
  modalVisible: boolean
  setModalVisible: (boolean: boolean) => void

}
export const useTaskStore = create<TaskStore>()(persist((set) => ({
  tasks: API.INITIAL_TASKS ?? [],
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

}), { name: 'tasks', storage: createJSONStorage(() => AsyncStorage) }))

export const useGlobalStore = create<GlobalStore>((set) => ({
  modalVisible: false,
  selectedTask: null,
  setSelectedTask: (task) => {
    set((state) => ({ ...state, selectedTask: task }))
  },
  setModalVisible: (boolean) => {
    set((state) => {
      return { ...state, modalVisible: boolean as boolean }
    })
  }

}))
