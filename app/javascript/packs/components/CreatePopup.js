import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetch } from './Fetch';
import PropTypes from 'prop-types'; 

export default class CreatePopup extends React.Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      first_name: null,
      last_name:  null,
      email: null
    }
  }
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  handleDecriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }
  // handleCardAdd = () => {
  //   const { name, description, assignee } = this.state;
    
  //   TaskRepository.create( {
  //       name,
  //       description,
  //       assignee_id: assignee.id
  //     } ).then(() => {
  //       this.props.onClose(true);
  //       this.setState({ 
  //         name: '',
  //         description: ''
  //       });
  //    })
  // }
  handleCardAdd = () => {
    const { name, description, assignee } = this.state;
    fetch('POST', window.Routes.api_v1_tasks_path(), {
      task: {
        name,
        description,
        assignee_id: assignee.id
      }
    }).then( response => {
      if (response.statusText == 'Created') {
        this.props.onClose(true);
        this.setState({ 
          name: '',
          description: ''
        });
      }
      else {
        alert(`Update failed! ${response.status} - ${response.statusText}`);
      }
      },
      (errors) => alert(`Update failed! ${errors}`)
    );
  }
  render () {
    const { show, onClose } = this.props;
    const { name, description } = this.state;
    return(
      <Modal
      size="lg"
      animation={false}
      show={show} 
      onHide={onClose}
      >
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
                placeholder='Set the name for the task'
                onChange={this.handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescriptionName">
              <Form.Label>Task description:</Form.Label>
              <Form.Control
                as="textarea" rows="3"
                value={description}
                placeholder='Set the description for the task'
                onChange={this.handleDecriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="success" onClick={this.handleCardAdd}>Save task</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}