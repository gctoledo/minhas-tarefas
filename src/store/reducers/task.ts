import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'
import * as enums from '../../utils/enums/Task'

type TasksState = {
  itens: Task[]
}

const initialState: TasksState = {
  itens: [
    {
      id: 1,
      description: '',
      priority: enums.Priority.IMPORTANTE,
      status: enums.Status.CONCLUIDA,
      title: 'Estudar JavaScript'
    },
    {
      id: 2,
      description: 'Revisar conteudo da aula.',
      priority: enums.Priority.URGENTE,
      status: enums.Status.CONCLUIDA,
      title: 'Estudar TypeScript'
    },
    {
      id: 3,
      description: 'Praticar o useEffect',
      priority: enums.Priority.URGENTE,
      status: enums.Status.PENDENTE,
      title: 'Estudar React'
    }
  ]
}

const tasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((task) => task.id !== action.payload)
    },
    edit: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)

      if (taskIndex >= 0) {
        state.itens[taskIndex] = action.payload
      }
    },
    add: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const taskCheck = state.itens.find(
        (task) =>
          task.title.toLowerCase() === action.payload.title.toLowerCase()
      )

      if (taskCheck) {
        alert('Já existe uma tarefa com esse nome!')
      } else {
        const lastTask = state.itens[state.itens.length - 1]

        const newTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.itens.push(newTask)
      }
    },
    changeState: (
      state,
      action: PayloadAction<{ id: number; status: boolean }>
    ) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)

      if (taskIndex >= 0) {
        state.itens[taskIndex].status = action.payload.status
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remove, edit, add, changeState } = tasksSlice.actions
export default tasksSlice.reducer
