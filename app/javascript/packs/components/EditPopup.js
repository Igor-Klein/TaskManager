import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {fetch} from './Fetch'
import reduxApiCamelizeMiddleware from 'redux-api-camelize-middleware'
import TaskRepository from './TaskRepository'
import PropTypes from 'prop-types'
import {toCamelCase, toSnakeCase} from './Util'


export default class EditPopup extends React.Component {
  state = {
    task: {
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
    },
    isLoading: true
  }

  loadCard = cardId => {
    this.setState({isLoading: true})
    TaskRepository.show(cardId).then(({data}) => {
      this.setState({task: toCamelCase(data), isLoading: false})
    })
  }

  componentDidMount() {
    this.loadCard(this.props.cardId)
  }

  handleNameChange = e => {
    this.setState({task: {...this.state.task, name: e.target.value}})
  }

  handleDecriptionChange = e => {
    this.setState({task: {...this.state.task, description: e.target.value}})
  }

  handleCardEdit = () => {
    const {name, description, author, state} = this.state.task
    const {cardId, onClose} = this.props
    TaskRepository.update(cardId, {
      task: {
        name: name,
        description: description,
        author_id: author.id,
        state: state
      }
    }).then(response => {
      // fetch('PUT', window.Routes.api_v1_task_path(cardId, {format: 'json'}), {
      //   name: name,
      //   description: description,
      //   author_id: author.id,
      //   state: state
      // }).then( response => {
      if (response.statusText == 'OK') {
        onClose(state)
      } else {
        alert('Update failed! ' + response.status + ' - ' + response.statusText)
      }
    })
  }

  handleCardDelete = () => {
    TaskRepository.destroy(this.props.cardId).then(response => {
      if (response.statusText == 'OK') {
        this.props.onClose(this.state.task.state)
      } else {
        alert('DELETE failed! ' + response.status + ' - ' + response.statusText)
      }
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Modal animation={false} show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal animation={false} show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {this.state.task.id} [{this.state.task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task name:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.task.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionName">
                <Form.Label>Task description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={this.state.task.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </Form.Group>
              <Form.Group controlId="formFullName">
                <Form.Label>Author: {this.state.task.author.firstName} {this.state.task.author.lastName}</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={this.props.onClose}>
              Close
            </Button>
            <Button variant="success" onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditPopup.propTypes = {
  cardId: PropTypes.number,
  show: PropTypes.bool,
  onClose: PropTypes.func
}
