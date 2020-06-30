const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:root@localhost/test')
let json = require("../data.json")

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

    // const addClient= async function (name,email,firstContact,emailType,sold,owner,country) {
    //     let query =`INSERT INTO Client VALUES ( null,'${name}','${email}','${firstContact}','${emailType}',${sold},'${owner}','${country}')`
    //      await sequelize.query(query)  
    // }
    // for(let m of json){
    //     addClient( m.name,m.email,m.firstContact,m.emailType,m.sold,m.owner,m.country)
    //     }
    // const getAllData = async function () {
    //     let results = await sequelize.query("SELECT * FROM Client ")
    //     console.log(results[0]) 
    //     return results[0]
    // }
    // getAllData()
    router.get('/Clients', async function (req, res) {
        let results = await sequelize.query("SELECT * FROM Client ")     
                 res.send(results) 
      })
      router.get('/salesByCountry', async function (req, res) {
        let results = await sequelize.query("SELECT c_country,SUM (c_sold) FROM  Client GROUP BY  c_country ")     
                 res.send(results) 
      })
    router.put('/updateClient', async function (req, res) {
        console.log(req.body)
         let results =   await sequelize.query(`UPDATE Client SET c_name = '${req.body.name}', c_country = '${req.body.country}' WHERE c_id=${req.body.id};`) 
         
            res.end()
    })
    router.put('/updateOwner', async function (req, res) {
        console.log(req.body)
         let results =   await sequelize.query(`UPDATE Client SET c_owner='${req.body.ownerName}' WHERE c_id=${req.body.id};`) 
         
            res.end()
    })
    router.put('/updateEmail', async function (req, res) {
        console.log(req.body)
         let results =   await sequelize.query(`UPDATE Client SET c_emailType='${req.body.email}' WHERE c_id=${req.body.id};`) 
          
            res.end()
    })
    router.put('/declareSale', async function (req, res) {
        console.log(req.body)
         let results =   await sequelize.query(`UPDATE Client SET c_sold=1 WHERE c_id=${req.body.id};`) 
            res.end()
    })
    router.post('/addNewClient', async function (req, res) {
        console.log(req.body)
         let results =   await sequelize.query(`INSERT INTO Client VALUES ( null,'${req.body.fullName}',null,'${req.body.date}',null,0,'${req.body.owner}','${req.body.country}');`) 
            res.end()
    })
    
    router.get('/showTopOwners', async function (req, res) {
        let results = await sequelize.query(`SELECT c_owner , COUNT(c_sold) FROM Client GROUP BY c_owner ORDER BY c_sold DESC LIMIT 3`);
        res.send(results);
      });
      router.get('/showOwners', async function (req, res) {
        let results =  await sequelize.query('SELECT c_owner,SUM (c_sold) FROM  Client GROUP BY  c_owner ' );
        res.send(results);
      });
    
      router.get('/salesByEmail', async function (req, res) {
        let results = await sequelize.query('SELECT c_emailType, SUM (c_sold) FROM  Client GROUP BY c_emailType ' );
        res.send(results);
      });
  

      module.exports = router