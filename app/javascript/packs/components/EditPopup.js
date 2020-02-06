import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetch } from './Fetch';
import reduxApiCamelizeMiddleware from 'redux-api-camelize-middleware';


export default class EditPopup extends React.Component {
  state = {
    task: {
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
        firstName: null,
        lastName:  null,
        email: null
      }
    },
    isLoading: true,
  }

  loadCard = (cardId) => {
    this.setState({ isLoading: true });
    fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'})).then(({data}) => {
      // this.setState({ task: data});
      // this.setState({ isLoading: false });
      this.setState( { task: data, isLoading: false })
    });
  }

  componentDidUpdate (prevProps) {
    const { cardId } = this.props;
    if (cardId != null && cardId !== prevProps.cardId) {
      this.loadCard(cardId);
    };
  }

  // componentDidMount(cardId) {
  //   this.loadCard(cardId);
  // }

  // componentWillUnmount() {
  //   this.setState({ isLoading: true });
  // }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value }});
  }

  handleDecriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value }});
  }

  handleCardEdit = () => {
    const { name, description, author, state} = this.state.task;
    const { cardId, onClose } = this.props;
    fetch('PUT', window.Routes.api_v1_task_path(cardId, {format: 'json'}), {
      name: name,
      description: description,
      author_id: author.id,
      state: state
    }).then( response => {
      if (response.statusText == 'OK') {
        onClose(state);
      }
      else {
        alert('Update failed! ' + response.status + ' - ' + response.statusText);
      }
    });
  }

  handleCardDelete = () => {
    fetch('DELETE', window.Routes.api_v1_task_path(this.props.cardId, { format: 'json' }))
      .then( response => {
        if (response.statusText == 'OK') {
          this.props.onClose(this.state.task.state);
        }
        else {
          alert('DELETE failed! ' + response.status + ' - ' + response.statusText);
        }
      });
  }

  render () {
    if (this.state.isLoading) {
      return (
        <Modal animation={false} show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
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
                  placeholder='Set the name for the task'
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionName">
                <Form.Label>Task description:</Form.Label>
                <Form.Control
                  as="textarea" rows="3"
                  value={this.state.task.description}
                  placeholder='Set the description for the task'
                  onChange={this.handleDecriptionChange}
                />
              </Form.Group>
            </Form>
            firstName: {this.state.task.author.firstname} 
            ___last_name : {this.state.task.author.last_name}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCardDelete}>Delete</Button>
            <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
            <Button variant="success" onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}