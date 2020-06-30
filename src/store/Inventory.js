import { observable, action, computed } from 'mobx'
import { Item } from './Item'
const axios = require('axios');

// let json = require("../data.json")


export class Inventory {
     @observable list = [];
     @observable  length;
     
  
    @action addAllItems = async ()=>{
      let json = await axios.get('http://localhost:3200/Clients');
       json.data[0].forEach(m=>this.list.push(new Item(m.c_id,m.c_name,m.c_email,m.c_firstContact,m.c_emailType,m.c_sold.data[0]==1?m.c_sold.data[0]=true:m.c_sold.data[0]=false,m.c_owner,m.c_country)))        
  }
     
    @action UpdateInPage =(id,name,Surname,country)=>{
      let newItem= this.list.find((l)=>l._id==id)
      newItem.name=name +" "+ Surname
      newItem.country=country
      console.log(newItem.name,newItem.country)
    }
    @action Update = async (id,name,Surname,country)=>{
       let temp = {id:id,name:name +" "+ Surname,country:country}
       console.log(temp)
      await axios.put('http://localhost:3200/updateClient', temp);
    }

    @computed get getData(){
            return  this.list
       }
   @action addClient = (name,Surname,country,owner,date)=>{
       let id = ""
    this.list.push(new Item(id,name +" "+ Surname,country,owner,date))
   }
  @action updateOwner = async(id,ownerName)=>{
    let newItem= this.list.find((l)=>l._id==id)
    newItem.owner=ownerName
    let temp = {id,ownerName}
    await axios.put('http://localhost:3200/updateOwner', temp);
  }
  @action updateEmail = async(id,email)=>{
    let temp = {id,email}
       console.log(temp)
    await axios.put('http://localhost:3200/updateEmail', temp);
  }
  @action declareSale = async(id)=>{
    let newItem= this.list.find((l)=>l._id==id)
    newItem.sold=true
    let temp = {id}
       console.log(temp)
    await axios.put('http://localhost:3200/declareSale', temp);
  }
  @action addNewClient = async(name,Surname,country,owner,date)=>{
    let fullName = name+" "+Surname
    let temp = {fullName,country,owner,date}
       console.log(temp)
    await axios.post('http://localhost:3200/addNewClient', temp);
  }
  @action salesByCountry = async()=>{
  let  data=  await axios.get('http://localhost:3200/salesByCountry');
  return data
  }
  @action showTopOwners = async () => {
    let data = await axios.get('http://localhost:3200/showTopOwners');
   //  console.log(data);
    return data;
  };
  @action showOwners = async () => {
    let data = await axios.get('http://localhost:3200/showOwners');
   //  console.log(data);
    return data;
  };
  @action salesByEmail = async () => {
    let data = await axios.get('http://localhost:3200/salesByEmail');
   //  console.log(data);
    return data;
  };
  

}

