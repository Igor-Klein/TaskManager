import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import TaskRepository from '../../components/TaskRepository'


  const fetchLine = (state, page = 1) => {
    return TaskRepository.index(state, page)
  }


const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: {
      newTask: null,
      inDevelopment: null,
      inQa: null,
      inCodeReview: null,
      readyForRelease: null,
      released: null,
      archived: null
    },
    isCreateModalOpen: false,
    isEditModalOpen: false,
    editCardId: null
  },

  reducers: {
    setBoard(state, { payload }) {
      console.log(payload);
      const [newTask, archived, inDevelopment, released, readyForRelease, inQa, inCodeReview] = payload

      state.board.newTask = newTask.data;
      state.board.inDevelopment = inDevelopment.data;
      state.board.inQa = inQa.data;
      state.board.inCodeReview = inCodeReview.data;
      state.board.readyForRelease = readyForRelease.data;
      state.board.released = released.data;
      state.board.archived = archived.data;

    },
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    }
  }
})

//   name: 'board',
//   initialState: {
//     data: [],
//     loading: false,
//   },
//   reducers: {
//     setBoard(state, { payload }) {
//       state.data = payload
//     },
//     startLoading(state) {
//       state.loading = true
//     },
//     stopLoading(state) {
//       state.loading = false
//     }
//   }
// })

export const { reducer, actions } = boardSlice

export const useBoardActions = () => {
  const dispatch = useDispatch()

  const loadBoard = () => {
    dispatch(boardSlice.actions.startLoading())

    return Promise.all([
      fetchLine('new_task'),
      fetchLine('archived'),
      fetchLine('in_development'),
      fetchLine('released'),
      fetchLine('ready_for_release'),
      fetchLine('in_qa'),
      fetchLine('in_code_review')
    ]).then(data => {
      dispatch(boardSlice.actions.setBoard(data))
    dispatch(boardSlice.actions.stopLoading())

    })
    

  }

  return {
    loadBoard
  }
}

export default boardSlice.reducer
