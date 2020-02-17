import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import TaskRepository from './TaskRepository'
import UserSelect from './UserSelect'

const EditPopup = props => {
  const { cardId, onClose, show } = props
  const [isLoading, setIsLoading] = useState(true)
  const [task, setTask] = useState({
    id: null,
    name: '',
    description: '',
    state: null,
    author: {
      id: null,
      firstName: null,
      lastName: null,
      email: null
    },
    assignee: {
      id: null,
      firstName: null,
      lastName: null,
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
    loadCard(cardId)
  }, [cardId])

  const handleNameChange = e => {
    setTask({ ...task, name: e.target.value })
  }

  const handleDecriptionChange = e => {
    setTask({ ...task, description: e.target.value })
  }

  const handleCardEdit = () => {
    const { name, description, author, state, assignee } = task

    TaskRepository.update(cardId, {
      task: {
        name,
        description,
        author: author,
        assignee: assignee,
        state
      }
    }).then(() => {
      onClose(state)
    })
  }

  const handleCardDelete = () => {
    TaskRepository.destroy(cardId).then(() => {
      onClose(task.state)
    })
  }

  const handleAuthorChange = value => {
    setTask({ ...task, author: { ...value } })
  }

  const handleAssigneeChange = value => {
    setTask({ ...task, assignee: { ...value } })
  }

  const { name, description, author, id, state, assignee } = task

  const { firstName, lastName } = author

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
            Task # {id} [{state}]
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Set the name for the task"
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescriptionName">
              <Form.Label>Task description:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={description}
                placeholder="Set the description for the task"
                onChange={handleDecriptionChange}
              />
            </Form.Group>
            <Form.Group controlId="formFullName">
              <Form.Label>
                Author: {firstName} {lastName}
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formChangeAuthor">
              <Form.Label>Change Author:</Form.Label>
              <UserSelect placeholder="Author" isDisabled={false} value={author} onChange={handleAuthorChange} />
            </Form.Group>
            <Form.Group controlId="formChangeAssignee">
              <Form.Label>Change Assignee:</Form.Label>
              <UserSelect placeholder="Assignee" onChange={handleAssigneeChange} value={assignee} />
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

EditPopup.propTypes = {
  cardId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default EditPopup
