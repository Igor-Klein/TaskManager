import React from 'react'
import {Provider} from 'react-redux'
import TaskBoard from './components/TaskBoard'

import store from './components/store';

export default class App extends React.Component {
  render() {
    return (
      <div>
        {/* <TaskBoard /> */}
        <Provider store={store}>
        <TaskBoard />
      </Provider>,
      </div>
    )
  }
}