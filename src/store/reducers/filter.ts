import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Task'

type FilterState = {
  search?: string
  criterion: 'prioridade' | 'status' | 'todas'
  value?: enums.Priority | enums.Status
}

const initialState: FilterState = {
  search: '',
  criterion: 'todas'
}

const filterSlice = createSlice({
  name: 'filtro',
  initialState,
  reducers: {
    handleSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    handleFilter: (state, action: PayloadAction<FilterState>) => {
      state.criterion = action.payload.criterion
      state.value = action.payload.value
    }
  }
})

export const { handleSearch, handleFilter } = filterSlice.actions

export default filterSlice.reducer
