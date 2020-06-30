import React, { Component } from 'react';
import {observer, inject} from 'mobx-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Line,ComposedChart } from 'recharts';
const {PropTypes} = React;

@inject('storeList')
@observer

class Analytice extends Component {
   constructor(){
     super()
     this.state={
       data : [],
       clientCurrentMonth: "",
       currentMonth:"",
       sendEmail:"",
       noSold:"",
       maxCountry:"",
       topEmployees:[],
       maxSold:"",
       salesByMonth:[]


     }
   }
getData = async()=>{
    let data= await [...this.props.storeList.getData]
    return data
}

topEmployees= async()=>{
  let data = await this.props.storeList.showTopOwners();
  let x = data.data[0].map((e) => ({
    topSold: e['COUNT(c_sold)'],
    topOwner: e.c_owner,
    
  }));
   this.setState({ topEmployees: x });
};

hottestCountry=async()=>{
  let maxCountry=0
  let country = 0
  let data = await this.props.storeList.salesByCountry()
  let xData = data.data[0].map(e => ({sold:e['SUM (c_sold)'],country:e.c_country}))
  for(let i of xData ){
     if(parseInt(i.sold)>parseInt(maxCountry)){
      maxCountry=i.sold
      country=i.country
  
     }
  }
  this.setState({maxCountry:country})
}


   noSold=async()=>{
    let data=  await this.getData()
    let noSold = data.filter(f=>f.sold==false)
    this.setState({noSold:noSold.length})
    
   }
   chickSendEmail=async()=>{
    let data=  await this.getData()
    let trueEmail = data.filter(f=>f.emailType!="null")
    this.setState({sendEmail:trueEmail.length})
    
   }

   currentMonth = ()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    this.setState({currentMonth:monthNames[d.getMonth()]})
    
   }
   clientCurrentMonth = async ()=>{   
    let data=  await this.getData()
    let date = new Date();
    let year = date.getFullYear()
    let month =date.getMonth()+1
   let y= data.map(m=>(m.firstContact)).filter(f=>f.split('-')[0]==year&&f.split('-')[1]==month)
    this.setState({clientCurrentMonth:y.length})

   }
    salesByCountry = async ()=>{
     let data = await this.props.storeList.salesByCountry()
    let oData = data.data[0].map(e => ({x:e['SUM (c_sold)'],y:e.c_country}))
    let Sold = oData.map((e) => ( e.x))
    let maxSold=(Math.max(...Sold));
     this.setState({ data: oData,maxSold:maxSold });   
  }
  salesByOwner = async ()=>{
    let data = await this.props.storeList.showOwners()
    let oData = data.data[0].map((e) => ({
      x: e['SUM (c_sold)'],
      y: e.c_owner,
      
    }));
    let Sold = oData.map((e) => ( e.x))
    let maxSold=(Math.max(...Sold));
     this.setState({ data: oData,maxSold:maxSold });  
 }
 salesByEmail = async ()=>{
  let data = await this.props.storeList.salesByEmail()
  let f =  data.data[0].filter(f=>f.c_emailType!==null && f.c_emailType!=="null")
  let oData = f.map((e) => ({x: e['SUM (c_sold)'], y: e.c_emailType,}))
  let Sold = f.map((e) => ( e['SUM (c_sold)']))
  let maxSold=(Math.max(...Sold));
   this.setState({ data: oData,maxSold:maxSold });  
}
salesByMonth = async (month)=>{   
  let salesByMonth= []
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  let data=  await this.getData()
   for(let i=1 ;i<=12;i++){
    let y= data.map(m=>(m.firstContact)).filter(f=>f.split('-')[1]==i)
    salesByMonth.push({y:monthNames[i-1],x:y.length})
 }
 let Sold = salesByMonth.map((e) => ( e.x))
 let maxSold=(Math.max(...Sold));
  this.setState({ data: salesByMonth,maxSold:maxSold }); 
 

 }

  salesBy= async (e)=>{  
    let value =e.target.value
    
    if(value=="country"){
    this.salesByCountry()
     }
     if(value=="owner"){
      this.salesByOwner()
     }
     if(value=="email"){
     await this.salesByEmail()
     }
     if(value=="month"){
      await this.salesByMonth()
      }
    

}

componentDidMount = async () => {
  await this.props.storeList.addAllItems()
 this.salesByCountry()
 this.clientCurrentMonth()
 this.currentMonth()
 this.chickSendEmail()
 this.noSold()
 this.hottestCountry()
 this.topEmployees()
}
componentWillUnmount= ()=>{
    this.props.storeList.list= []

}


      render() {
         
        return (
           <div>

        <p> <img src="https://img.icons8.com/color/48/000000/calendar.png"/><span>New {this.state.currentMonth} Clients:</span><span>{this.state.clientCurrentMonth}</span>
        <img src="https://img.icons8.com/color/48/000000/mailbox-closed-flag-down.png"/><span>Emails Sent:</span><span>{this.state.sendEmail}</span>
        <img src="https://img.icons8.com/doodle/48/000000/user-male--v1.png"/><span>Outstanding Clients:</span><span>{this.state.noSold}</span> 
        <img src="https://img.icons8.com/color/48/000000/passport.png"/><span>Hottest Country:</span><span>{this.state.maxCountry}</span> </p> 
             <h2>Sales By 
                                 <select onChange={this.salesBy} name="analytice" >
                                 <option value="country">Country</option>
                                 <option value="email">Email</option>
                                 <option value="month">Month(all time)</option>
                                 <option value="owner">Owner </option>
                                </select></h2>
       <BarChart width={1200} height={300} data={this.state.data}>
       <XAxis dataKey="y" stroke="#8884d8" />
       <YAxis domain={[0, this.state.maxSold]} />

        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
         <Bar dataKey="x" fill="#8884d8" barSize={40} />
        </BarChart>
        <ComposedChart layout="vertical" width={600} height={400} data={this.state.topEmployees}
            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <CartesianGrid stroke='#f5f5f5'/>
          <XAxis type="number"/>
          <YAxis dataKey="topOwner" type="category"/>
          <Tooltip/>
          <Legend/>topOwner
          {/* <Area dataKey='sold' fill='#8884d8' stroke='#8884d8'/> */}
          <Bar dataKey='topSold' barSize={20} fill='#413ea0'/>
          {/* <Line dataKey='sold' stroke='#ff7300'/> */}
       </ComposedChart>
             </div>
            )
    }
}

export default Analytice