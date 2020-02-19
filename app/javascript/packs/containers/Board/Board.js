import React, { useEffect } from 'react'

import { useBoardActions } from '../../store/board'
import useBoardSelectors from '../../store/board/selectors'

const Board = ({ children }) => {
  const { getBoard, getBoardLoadingState } = useBoardSelectors()
  const { loadBoard } = useBoardActions()

  const board = getBoard()
  const loading = getBoardLoadingState()

  useEffect(() => {
    loadBoard()
  }, [])

  return children({ board, loading })
}

export default Board
