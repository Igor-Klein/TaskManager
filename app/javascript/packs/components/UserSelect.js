import React, { Component } from 'react'
import AsyncSelect from 'react-select/async'
import { fetch } from './Fetch'
import TaskRepository from './TaskRepository'
import PropTypes from 'prop-types'

export default class UserSelect extends Component {
  state = {
    inputValue: ''
  }
  getOptionLabel = option => {
    return option.firstName + ' ' + option.lastName
  }
  getOptionValue = option => {
    return option.id
  }
  loadOptions = inputValue => {
    return TaskRepository.userShowIndex(inputValue).then(({ data }) => {
      return data.items
    })
  }
  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '')
    this.setState({ inputValue })
    return inputValue
  }
  componentDidMount() {
    this.loadOptions()
  }
  render() {
    const { isDisabled, value, onChange } = this.props

    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={isDisabled}
          defaultValue={value}
          onChange={onChange}
        />
      </div>
    )
  }
}

UserSelect.propTypes = {
  value: PropTypes.number.isRequired,
  isDisabled: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}
