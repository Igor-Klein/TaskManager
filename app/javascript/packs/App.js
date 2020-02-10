import React from 'react'
import {Provider} from 'react-redux'
import TaskBoard from './components/TaskBoard'

// import store from 'store';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TaskBoard />
        {/* <Provider>
        <TaskBoard />
      </Provider>, */}
      </div>
    )
  }
}
