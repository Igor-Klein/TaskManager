import { useSelector } from 'react-redux';

export default () => {
  return {
    getTasks: () => useSelector(state => state.TasksSlice.data),
    getTasksLoadingState: () => useSelector(state => state.TasksSlice.loading),
  };
};
