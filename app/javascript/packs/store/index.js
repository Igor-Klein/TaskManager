import { configureStore } from '@reduxjs/toolkit'

import BoardSlice from './board'

export default configureStore({ reducer: { BoardSlice } })
