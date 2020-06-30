import React, { Component } from 'react';
import {observer, inject} from 'mobx-react'

@inject('storeList')
@observer
class Actions extends Component {
    constructor() {
        super();
        this.state={
            userName:"",
            ownerName: "" ,
            userEmail:"",
            firstName:"",
            surName:"",
            country:"",
            owner:"",
            NamesList:[] ,   
            AllNames:[]  
        }
    }
    getOwner = async ()=>{
        let checkT=[]
        let data= await [...this.props.storeList.getData]
        let findNames  = data.map(m => m.owner)
        for(let i of findNames){
        let x =checkT.find(f=> f==i)
            if(x!=i){
                checkT.push(i)
               }
      }
       this.setState({ NamesList: checkT})
    }
     
    handeleInput= async (e)=>{  
        let name =e.target.name
        let value =e.target.value
        this.setState({[name]:value})
    }

    updateOwner = async ()=>{
        if(this.state.ownerName=="" || this.state.userName=="" ){
             alert("make sure Owner name and Clint name  are correct")
        }else{
            let data= await [...this.props.storeList.getData]
            let name= data.find(f=>f.name==this.state.userName)
            await this.props.storeList.updateOwner(name._id,this.state.ownerName)
        }
  

    }
    updateEmail = async ()=>{
        if(this.state.userEmail=="" || this.state.userName=="" ){
            alert("make sure emil type and Clint name  are correct")
       }else{
        let data= await [...this.props.storeList.getData]
        let name= data.find(f=>f.name==this.state.userName)
        await this.props.storeList.updateEmail(name._id,this.state.userEmail)
       }
       }
       declareSale = async ()=>{
        if(this.state.userName==""){
            alert("insert name")
       }else{
        let data= await [...this.props.storeList.getData]
        let name= data.find(f=>f.name==this.state.userName)
        await this.props.storeList.declareSale(name._id)
       }
   
       }
       addNewClient= async()=>{
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
       await this.props.storeList.addNewClient(this.state.firstName,this.state.surName,this.state.country,this.state.owner,dateTime)
       }

      getAllNames = async ()=>{
        let data= await [...this.props.storeList.getData]
        let findNames  = data.map(m => m.name)
         console.log(findNames)
       this.setState({ AllNames: findNames})
    }
    
    componentDidMount = async () => {
        await this.props.storeList.addAllItems()
        this.getOwner()
         await this.getAllNames()
        console.log(this.state.AllNames)
    }
    componentWillUnmount= ()=>{
        this.props.storeList.list= []
    
    }

    render() {
    
        return (<div>
           
  

  

        <h1>UPDATE</h1>
        <p> Client:<input placeholder="Client" type="text"  list="browsers" name="userName" id="browser" onChange={this.handeleInput}/>
     <datalist id="browsers">{this.state.AllNames.map(m=><option value={m}/>)}</datalist>
       Transfer ownership to : <select  onChange={this.handeleInput}  name="ownerName" id="ownership">{this.state.NamesList.map(m=><option name={m} value={m}>{m}</option>)}</select><button onClick={this.updateOwner} >Transfer</button> 
       Send email: <select onChange={this.handeleInput} name="userEmail" id="email"><option ></option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option></select> <button onClick={this.updateEmail} >Send</button>
       Declare sale! <button onClick={this.declareSale} >Declare</button></p>

       <h2>Add Client</h2>
      <p><span> </span> First name :<input  placeholder="First name"  onChange={this.handeleInput} name="firstName" type="text"></input><span> </span>
      <span> </span>    Surname :<input placeholder="Surname" onChange={this.handeleInput} name="surName" type="text"></input>
       <span> </span> Country :<input placeholder="Country"  onChange={this.handeleInput} name="country" type="text"></input>
       <span> </span>  Owner :<input placeholder="Owner" onChange={this.handeleInput} name="owner" type="text"></input>
       <span> </span>  <button onClick={this.addNewClient}>add new client</button>
       </p>
        </div> );
    }
}
 
export default Actions;