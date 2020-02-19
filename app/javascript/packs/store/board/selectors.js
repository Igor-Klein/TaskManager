import { useSelector } from 'react-redux'

export default () => {
  return {
    getBoard: () => useSelector(state => state.BoardSlice.board),
    getBoardLoadingState: () => useSelector(state => state.BoardSlice.loading)
  }
}
