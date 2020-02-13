import AsyncSelect from 'react-select/async'
import UserRepository from './UserRepository'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

export default function UserSelect(props) {
  const getOptionLabel = option => {
    const { firstName, lastName } = option
    return `${firstName} ${lastName}`
  }
  const getOptionValue = option => {
    return option.id
  }
  const loadOptions = inputValue => {
    return UserRepository.index(inputValue).then(({ data }) => {
      return data.items
    })
  }

  useEffect(() => {
    loadOptions()
  })

  const { isDisabled, value, onChange, placeholder } = props

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isDisabled={isDisabled}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

UserSelect.propTypes = {
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.object
}
