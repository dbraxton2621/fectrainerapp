import React from 'react'
import './App.css';
import Trainers from './components/Trainers';

class App extends React.Component {
  state = {
    trainers: [],
    loading: false,
    singleTrainer: null
  }


  render() {
    const {trainers} = this.state

    // if loading

    // if single trainer

    // 
    return (
      <Trainers trainers={trainers}/>
    );
  }
}

export default App;
