import React from 'react'
import {hot} from 'react-hot-loader/root'

class LaneHeader extends React.Component {
  render () {
    return <div>
      <b>{this.props.id}</b> ({this.props.cards.length}/{this.props.total_count})
    </div>
  }
}

export default hot(LaneHeader);