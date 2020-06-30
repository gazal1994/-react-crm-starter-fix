//import React from 'react';
import React, { Component } from 'react';
import './App.css';
import {observer, inject} from 'mobx-react'
import Clients from './Components/Clients'
import Actions from './Components/Actions'
import Analytice from './Components/Analytice'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar'
@inject('storeList')
@observer

class App extends Component {
constructor(){
  super()
}
componentDidMount=async()=>{
//  await this.props.storeList.addAllItems()
}
  
  render(){
    // this.props.storeList.addAllItems()
    // let data = this.props.storeList.list
    // console.log(data)
    return (
      <div >
           <Router>
           <Navbar />
           <Route exact path='/Clients' component={Clients}/>
           <Route exact path='/Actions' component={Actions} />
           <Route exact path='/Analytice' component={Analytice} />
            </Router>
            
    
      </div>
    );
  }

}

export default App;
