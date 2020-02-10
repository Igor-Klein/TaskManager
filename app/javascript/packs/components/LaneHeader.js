import React from 'react'
import PropTypes from 'prop-types'

export default class LaneHeader extends React.Component {
  render() {
    return (
      <div>
        <b>{this.props.id}</b> ({this.props.cards.length}/{this.props.totalCount})
      </div>
    )
  }
}

LaneHeader.propTypes = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
