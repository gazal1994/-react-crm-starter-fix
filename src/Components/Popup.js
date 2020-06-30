import React from 'react';
import {observer, inject} from 'mobx-react'
@inject('storeList')
@observer
class Popup extends React.Component {
  constructor(){
      super()
      this.state={
          name: "",
          surName:" ",
          country: ""
      }
  }
    handleInputChange = (event) => {
        let newInput = event.target.value;
        let name =event.target.name
        this.setState({[name]:newInput})
     }

        UpdatefromInventory=async()=>{
            this.props.storeList.Update(this.props.itemId,this.state.name,this.state.surName,this.state.country)
            this.props.storeList.UpdateInPage(this.props.itemId,this.state.name,this.state.surName,this.state.country)
            this.props.closePopup()   
        }
        

  
    render() {
        
    return (
       
      <div className='popup'>
        <div className='popup_inner'>
          
         
          <img  className="closePopup" onClick={this.props.closePopup} src="https://img.icons8.com/color/25/000000/delete-sign.png"/>
            
                <label for='name'>Name:</label>
                <input className='gazal'   placeholder="Enter Name"   name='name' onChange={ this.handleInputChange}></input>
              
                <label for='mail'>Surname:</label>
                <input  className='gazal'  placeholder="surName" name='surName' onChange={ this.handleInputChange}></input>
              
                <label for='msg'>country</label>
                <input className='gazal'  placeholder="country"  name='country' onChange={ this.handleInputChange}></input>
               
             
            
           {/* <div> <p  onClick={this.UpdatefromInventory}>Update</p>  </div>  */}
           <img onClick={this.UpdatefromInventory} src="https://img.icons8.com/color/48/000000/support.png"/>
          
        </div>
      </div>
    );
  }
}
export default Popup;