import React, { Component } from 'react';
import './App.css';

import CombinedComponent from './components/CombinedComponents'

class App extends Component{





  render(){
    return(

      <div className='App'>
        <CombinedComponent/>
        <div>Right Pic</div>
      </div>
    )
  }
}



export default App;