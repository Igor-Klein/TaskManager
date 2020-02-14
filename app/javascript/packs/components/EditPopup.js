// import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import TaskRepository from './TaskRepository'
import UserSelect from './UserSelect'

const EditPopup = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [task, setTask] = useState({
    id: null,
    name: '',
    description: '',
    state: null,
    author: {
      id: null,
      first_name: null,
      last_name: null,
      email: null
    },
    assignee: {
      id: null,
      first_name: null,
      last_name: null,
      email: null
    }
  })

  const loadCard = cardId => {
    setIsLoading(true)
    TaskRepository.show(cardId).then(({ data }) => {
      setTask(data)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    loadCard(props.cardId)
  }, [props.cardId])

  const handleNameChange = e => {
    setTask({ ...task, name: e.target.value })
  }

  const handleDecriptionChange = e => {
    setTask({ ...task, description: e.target.value })
  }

  const handleCardEdit = () => {
    const { name, description, author, state, assignee } = task
    const { cardId, onClose } = props

    TaskRepository.update(cardId, {
      task: {
        name,
        description,
        authorId: author.id,
        assigneeId: assignee.id,
        state
      }
    }).then(() => {
      onClose(state)
    })
  }

  const handleCardDelete = () => {
    TaskRepository.destroy(props.cardId).then(() => {
      props.onClose(task.state)
    })
  }

  const handleAuthorChange = value => {
    setTask({ ...task, author: { ...value } })
  }

  const handleAssigneeChange = value => {
    setTask({ ...task, assignee: { ...value } })
  }

  const { show, onClose } = props
  const { firstName, lastName } = task.author

  if (isLoading) {
    return (
      <Modal animation={false} show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return (
    <div>
      <Modal animation={false} show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Task # {task.id} [{task.state}]
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task name:</Form.Label>
              <Form.Control
                type="text"
                value={task.name}
                placeholder="Set the name for the task"
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescriptionName">
              <Form.Label>Task description:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={task.description}
                placeholder="Set the description for the task"
                onChange={handleDecriptionChange}
              />
            </Form.Group>
            <Form.Group controlId="formFullName">
              <Form.Label>
              Author: {task.author.firstName} {task.author.lastName}
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formChangeAuthor">
              <Form.Label>Change Author:</Form.Label>
              <UserSelect placeholder="Author" isDisabled={false} value={task.author} onChange={handleAuthorChange} />
            </Form.Group>
            <Form.Group controlId="formChangeAssignee">
              <Form.Label>Change Assignee:</Form.Label>
              <UserSelect placeholder="Assignee" onChange={handleAssigneeChange} value={task.assignee} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCardDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleCardEdit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditPopup

EditPopup.propTypes = {
  cardId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
