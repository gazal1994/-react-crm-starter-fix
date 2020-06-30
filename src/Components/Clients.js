import React, { Component } from 'react';
import Client from './Client'
import {observer, inject} from 'mobx-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import * as ReactBootstrap from 'react-bootstrap'
import  Popup from './Popup'
@inject('storeList')
@observer
class Clients extends Component {
 constructor(){
   super()
this.state ={
  id:'',
  showPopup: false ,
  userName:"",
  category: "" ,
  newData:[],
  data :[],
  columns : [
    {dataField:"name",text:"name"},
    {dataField:"Surname",text:"Surname"},
    {dataField:"country",text:"country"},
    {dataField:"firstContact",text:"firstContact"},
    {dataField:"email",text:"email"},
    {dataField:"soldImg",text:"sold"},
    {dataField:"owner",text:"owner"}
  ]
}
this.rowEvents = {
  onClick: (e, row, rowIndex) => { 
      this.setState({id:row.id,showPopup:true})   
       
   console.log(row)
  } 
 }}
 togglePopup = () => {
  this.setState({
    showPopup: !this.state.showPopup,
  });
};
   handeleInput= async (e)=>{  
        let name =e.target.name
        let value =e.target.value
        this.setState({[name]:value},function(){this.searchNames()})
    }
 getAllData= async()=> {
  let newData=[...this.props.storeList.getData]
  return newData 
}
searchNames = async () => {
 let text = this.state.userName
  let names = await this.getAllData();
  let newData= names.map(m=> ({name:m.name.split(' ').slice(0, -1).join(' '),Surname:m.name.split(' ').slice(-1).join(' '),country:m.country,firstContact:m.firstContact,email:m.email,sold: m.sold,soldImg:m.sold?<td><img src="https://img.icons8.com/fluent/25/000000/checkmark.png"/></td>:<td><img src="https://img.icons8.com/color/25/000000/delete-sign.png"/></td>,owner:m.owner,id:m._id}))

  let data=[]
  if(this.state.category!==''){
    if(this.state.category=='owner'){
      newData.forEach(m=> (m.owner.indexOf(text)== 0)? data.push(m):null )
    }
    if(this.state.category=='name'){
      newData.forEach(m=> (m.name.indexOf(text)== 0)? data.push(m):null )
    }
    if(this.state.category=='country'){
      newData.forEach(m=> (m.country.indexOf(text)== 0)? data.push(m):null )
    }
    if(this.state.category=='sold'){
      newData.forEach(m=> (m.sold== true)? data.push(m):null )
   }
  }else{
    newData.forEach(m=> (m.name.indexOf(text)== 0)? data.push(m):null )
  }


 console.log(text)
  this.setState({newData:data})
}
renderData=()=>{
 let newData= this.state.data.map(m=> ({name:m.name.split(' ').slice(0, -1).join(' '),Surname:m.name.split(' ').slice(-1).join(' '),country:m.country,firstContact:m.firstContact,email:m.email,sold: m.sold,soldImg:m.sold?<td><img src="https://img.icons8.com/fluent/25/000000/checkmark.png"/></td>:<td><img src="https://img.icons8.com/color/25/000000/delete-sign.png"/></td>,owner:m.owner,id:m._id}))
this.setState({newData:newData})
}


componentDidMount = async () => {
  await this.props.storeList.addAllItems()
  const data = await this.getAllData()
  this.setState({data: data})
  this.renderData()

}
componentWillUnmount= ()=>{
  this.props.storeList.list= []
}

 
      render() {
        return (
          <div>
           <p> <input type='text'   placeholder="Enter Name" name='userName' onChange={this.handeleInput}></input><select onChange={this.handeleInput} name="category" id="category"><option value="name">Name</option><option value="owner">Owner</option><option value="sold">Sold</option><option value="country">Country</option></select></p>

              <div id='customers'>
              <BootstrapTable 
                keyField="id"
               data={this.state.newData}
               columns={this.state.columns}
               rowEvents={ this.rowEvents } 
               pagination={paginationFactory()}
               />  
                 {this.state.showPopup ? ( <Popup itemId={this.state.id} closePopup={this.togglePopup} />) : null}
             </div>
             
             </div>
            )
            
    }
}

export default Clients