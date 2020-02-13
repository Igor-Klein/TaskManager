// import React, { Component } from 'react'
import AsyncSelect from 'react-select/async'
import UserRepository from './UserRepository'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react';

function UserSelect(props) {

  getOptionLabel = option => {
    const { firstName, lastName } = option
    return `${firstName} ${lastName}`
  }
  getOptionValue = option => {
    return option.id
  }
  loadOptions = inputValue => {
    return UserRepository.index(inputValue).then(({ data }) => {
      return data.items
    })
  }

  useEffect(() => {
  this.loadOptions()
});

  
  
    const { isDisabled, value, onChange, placeholder } = this.props

    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={isDisabled}
          defaultValue={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    )
  
}

export default UserSelect;

UserSelect.propTypes = {
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.object
}
