import { hot } from 'react-hot-loader/root'
import Board from 'react-trello'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react'
import { snakeCase } from 'change-case'
import LaneHeader from './LaneHeader'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import TaskRepository from './TaskRepository'

const components = {
  LaneHeader
}

const TasksBoard = props => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editCardId, setEditCardId] = useState(null)
  const [board, setBoard] = useState({
    newTask: null,
    inDevelopment: null,
    inQa: null,
    inCodeReview: null,
    readyForRelease: null,
    released: null,
    archived: null
  })

  const generateLane = (id, title) => {
    const tasks = board[id]
    return {
      id,
      title,
      totalCount: tasks ? tasks.meta.totalCount : 'None',
      cards: tasks
        ? tasks.items.map(task => {
            return {
              ...task,
              label: task.state,
              title: task.name,
              id: String(task.id)
            }
          })
        : []
    }
  }

  const getBoard = () => {
    return {
      lanes: [
        generateLane('newTask', 'New'),
        generateLane('inDevelopment', 'In Dev'),
        generateLane('inQa', 'In QA'),
        generateLane('inCodeReview', 'in CR'),
        generateLane('readyForRelease', 'Ready for release'),
        generateLane('released', 'Released'),
        generateLane('archived', 'Archived')
      ]
    }
  }

  const loadLines = () => {
    Promise.all([
      fetchLine('new_task'),
      fetchLine('archived'),
      fetchLine('in_development'),
      fetchLine('released'),
      fetchLine('ready_for_release'),
      fetchLine('in_qa'),
      fetchLine('in_code_review')
    ]).then(data => {
      const [newTask, archived, inDevelopment, released, readyForRelease, inQa, inCodeReview] = data
      setBoard({ newTask, inDevelopment, inQa, inCodeReview, readyForRelease, released, archived })
    })
  }

  useEffect(() => {
    loadLines()
  }, [])

  const fetchLine = (state, page = 1) => {
    return TaskRepository.index(state, page).then(({ data }) => {
      return data
    })
  }

  const onLaneScroll = (requestedPage, state) => {
    return fetchLine(state, requestedPage).then(({ items }) => {
      return items.map(task => {
        return {
          ...task,
          label: task.state,
          title: task.name
        }
      })
    })
  }

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    TaskRepository.update(cardId, { task: { state: snakeCase(targetLaneId) } }).then(() => {
      loadLines()
    })
  }

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true)
  }

  const handleCreateHide = () => {
    setIsCreateModalOpen(false)
  }

  const handleTaskCreated = () => {
    handleCreateHide()
    Promise.all([fetchLine('new_task')]).then(data => {
      const [newTask] = data
      setBoard({ ...board, newTask })
    })
  }

  const onCardClick = cardId => {
    setEditCardId(cardId)
    handleEditShow()
  }

  const handleEditClose = (edited = '') => {
    setIsEditModalOpen(false)
    setEditCardId(null)
    loadLines()
  }

  const handleEditShow = () => {
    setIsEditModalOpen(true)
  }

  return (
    <div>
      <h1>Your tasks</h1>
      <Button variant="info" onClick={handleCreateModalOpen}>
        Create new task
      </Button>
      <Board
        data={getBoard()}
        onLaneScroll={onLaneScroll}
        cardsMeta={board}
        draggable
        laneDraggable={false}
        handleDragEnd={handleDragEnd}
        components={components}
        onCardClick={onCardClick}
      />
      <CreatePopup show={isCreateModalOpen} onClose={handleCreateHide} onTaskCreate={handleTaskCreated} />
      {isEditModalOpen && <EditPopup show={isEditModalOpen} onClose={handleEditClose} cardId={editCardId} />}
    </div>
  )
}

export default hot(TasksBoard)
