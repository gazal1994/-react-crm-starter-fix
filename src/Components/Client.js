import React, { Component } from 'react';
import { observer } from 'mobx-react'
import  Popup from './Popup'

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };


  

      render() {
       let m = this.props.data
        return (
          <tbody>
             <tr onClick={this.togglePopup}>
              <td>{m.name.split(' ').slice(0, -1).join(' ')}</td>
              <td>{m.name.split(' ').slice(-1).join(' ')}</td>
              <td>{m.country}</td>
              <td>{m.firstContact}</td>
              <td>{m.email}</td>
              {m.sold?<td><img src="https://img.icons8.com/fluent/25/000000/checkmark.png"/></td>:<td><img src="https://img.icons8.com/color/25/000000/delete-sign.png"/></td>}
              <td>{m.owner}</td>  
              </tr> {this.state.showPopup ? ( <Popup itemId={m._id} closePopup={this.togglePopup} />) : null}
                  </tbody>
             
            )
    }
}

export default Client