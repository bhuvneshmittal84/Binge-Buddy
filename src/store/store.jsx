import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice.jsx'
import tvReducer from './reducers/tvSlice.jsx'
import peopleReducer from './reducers/peopleSlice.jsx'

export const store = configureStore({
  reducer: {
    movie : movieReducer,
    tv : tvReducer,
    people : peopleReducer,
  },
})