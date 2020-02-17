import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    setTasks(state, { payload }) {
      state.data = payload;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const { reducer, actions } = tasksSlice;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadTasks = async () => {
    dispatch(tasksSlice.actions.startLoading());
    const response = await fetch('http://localhost:8000/tasks');
    const tasks = await response.json();

    dispatch(tasksSlice.actions.stopLoading());

    dispatch(tasksSlice.actions.setTasks(tasks));
  };

  return {
    loadTasks,
  };
};

export default tasksSlice.reducer;
