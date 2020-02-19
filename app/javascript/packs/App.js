import React from 'react'
import { Provider } from 'react-redux'
import TaskBoard from './components/TaskBoard'
import BoardContainer from './containers/Board';


import store from './store'

export default class App extends React.Component {
  render() {
    return (  

      <div>
        {/* <TaskBoard /> */}
        <Provider store={store}>

         <BoardContainer>
      {({ board, loading }) => (
        <TaskBoard board={board}/>
      )}

      </BoardContainer>
        </Provider>
        ,
      </div>
    )
  }
}
