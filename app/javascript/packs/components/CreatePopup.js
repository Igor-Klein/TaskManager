// import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import TaskRepository from './TaskRepository'
import PropTypes from 'prop-types'
import UserSelect from './UserSelect'
import React, { useState } from 'react';

function CreatePopup(props) {
  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState({
      id: null,
      firstName: null,
      lastName: null,
      email: null
    });
  
  handleCardCreate = () => {
    // const { name, description, assignee } = this.state

    TaskRepository.create({
      task: {
        name,
        description,
        assigneeId: assignee.id
      }
    }).then(() => {
      this.props.onTaskCreate()
      setName('')
      setDescription('')
    })
  }

  
  
    const { show, onClose, onTaskCreate } = this.props
    // const { name, description } = this.state
    return (
      <Modal size="lg" animation={false} show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Set the name for the task"
                onChange={setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescriptionName">
              <Form.Label>Task description:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={description}
                placeholder="Set the description for the task"
                onChange={setDecription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formChangeAssignee">Select Assignee:</Form.Group>
            <UserSelect placeholder="Assignee" onChange={setAssigne(value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleCardCreate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  
}

export default CreatePopup;

CreatePopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onTaskCreate: PropTypes.func.isRequired
}
