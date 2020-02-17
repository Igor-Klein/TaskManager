import { configureStore } from '@reduxjs/toolkit';

import TasksSlice from './tasks';

export default configureStore({ reducer: { TasksSlice } });
