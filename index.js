
const { error } = require('console');

const express=require("express");
var date = require("node-datetime");
const app=express();
var moment = require('moment');

const cors=require("cors");

const mysql=require("mysql");
const DateTime = require('node-datetime/src/datetime');

app.use(cors());

app.use(express.json());


 

const db=mysql.createConnection({

    host:"localhost",

    database:"insdb",

    user:"root",

    password:""

});

 

app.post("/create",(req,res)=>{

const pol_no=Math.floor((Math.random() * 10000) + 1);
const pol_year=req.body.pol_year;
const ins_comp=req.body.ins_comp
const acc_type=req.body.acc_type
const cust_acc=req.body.cust_acc;
const cust_name=req.body.cust_name;
const maj_ins=req.body.maj_ins
const min_ins=req.body.min_ins
const reg_dt=req.body.reg_dt
const start_dt=req.body.start_dt
const end_dt=req.body.end_dt
const cust_id=req.body.cust_id
const cust_jaw=req.body.cust_jaw
const plate_no=req.body.plate_no
const chas_no=req.body.chas_no
const sum_insur=req.body.sum_insur
const cover_details=req.body.cover_details
const prem=req.body.prem
const feez=req.body.feez
const discount=req.body.discount
const total_prem=req.body.total_prem
const notes=req.body.notes

db.query(
    "INSERT INTO insgen (pol_no,pol_year,ins_comp,acc_type,cust_acc,cust_name,maj_ins,min_ins,reg_dt,start_dt,end_dt,cust_id,cust_jaw,plate_no,chas_no,sum_insur,cover_details,prem,feez,discount,total_prem,notes) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",

    [pol_no,pol_year,ins_comp,acc_type,cust_acc,cust_name,maj_ins,min_ins,reg_dt,start_dt,end_dt,cust_id,cust_jaw,plate_no,chas_no,sum_insur,cover_details,prem,feez,discount,total_prem,notes],

    (err,result)=>{

        if (err){

  console.log(err)

        }else{

            res.send("inserted to DB")

        }}

)

});

 

app.put("/update",(req,res)=>{
    const pol_no=req.body.pol_no
    const pol_year=req.body.pol_year
    const acc_no=req.body.acc_no
    const id=req.body.id
    const ins_comp=req.body.ins_comp
    const acc_type=req.body.acc_type
    const cust_name=req.body.cust_name;
    const maj_ins=req.body.maj_ins
    const min_ins=req.body.min_ins
    const reg_dt=req.body.reg_dt
    const start_dt=req.body.start_dt
    const end_dt=req.body.end_dt
    const cust_id=req.body.cust_id
    const cust_jaw=req.body.cust_jaw
    const plate_no=req.body.plate_no
    const chas_no=req.body.chas_no
    const sum_insur=req.body.sum_insur
    const cover_details=req.body.cover_details
    const prem=req.body.prem
    const feez=req.body.feez
    const discount=req.body.discount
    const total_prem=req.body.total_prem
    const notes=req.body.notes

    db.query(
    
      //  "update insgen set ins_comp=?,acc_type=?,cust_name=?,maj_ins=?,min_ins=?,reg_dt=?,start_dt=?,end_dt=?,cust_id=?,cust_jaw=?,plate_no=?,chas_no=?,sum_insur=?,cover_details=?,prem=?,feez=?,discount=?,total_prem=?,notes=? where id=?",
       "update insgen set ins_comp=?,cust_name=?,acc_type=?,prem=?,feez=?,maj_ins=?,min_ins=?,reg_dt=?,start_dt=?,end_dt=? where id=?",
        [ins_comp,cust_name,acc_type,prem,feez,maj_ins,min_ins,reg_dt,start_dt,end_dt,id],

        (err,result)=>{

            if (err){

      console.log(err)

            }else{

                res.send(result)

            }}

    )

    });


    app.get("/showbyid/:id",(req,res)=>{

        const id=req.params.id
        db.query(
            "select * from insgen where id=?",
            [id],
    
            (err,result)=>{
    
                if (err){
    
          console.log(err)
    
                }else{
    
                    res.send(result)
    
                }}
    
        )
    
        });





app.get("/getpol",(req,res)=>{

    db.query(

        "select * from insgen ORDER BY id DESC LIMIT 10",

        (err,result)=>{

            if (err){

      console.log(err)

            }else{

                res.send(result)

            }}

    )

    });

    app.post("/addavd",(req,res)=>{

        const pol_no=req.body.pol_no
        const pol_year=req.body.pol_year;
        const cust_acc=req.body.cust_acc;
        const cust_name=req.body.cust_name
        const reg_dt=req.body.reg_dt
        const total_prem=req.body.total_prem
        const cash=req.body.cach
        const chqno=req.body.chqno
        const chqdt=req.body.chqdt
        const chqname=req.body.chqname
        const chqprem=req.body.chqprem

      
        
        db.query(
            "INSERT INTO insacc (polno,pol_year,cust_acc,cust_name,total_prem,reg_dt,cash,chq_no,chq_owner,chq_value,chq_date) values(?,?,?,?,?,?,?,?,?,?,?)",
        
            [pol_no,pol_year,cust_acc,cust_name,total_prem,reg_dt,cash,chqno,chqname,chqprem,chqdt],
        
            (err,result)=>{
        
                if (err){
        
          console.log(err)
        
                }else{
        
                    res.send("inserted to DB")
        
                }}
        
        )
        
        });

        app.get("/AccSearch/:doc",(req,res)=>{

            const doc=req.params.doc
            db.query(
                "select * from insacc where polno=?",
                [doc],
        
                (err,result)=>{
        
                    if (err){
        
              console.log(err)
        
                    }else{
        
                        res.send(result)
        
                    }}
        
            )
        
            });
    
    
            app.get("/dailyprod",(req,res)=>{
                
                var localTime = moment().format('YYYY-MM-DD');
                console.log(localTime)
                db.query(
            
                    "select * from insgen where reg_dt =? ",
                     [localTime],
                    (err,result)=>{
            
                        if (err){
            
                  console.log(err)
            
                        }else{
            
                            res.send(result)
                            console.log(localTime)
            
                        }}
            
                )
            
                });
        


                
            app.get("/totalprod",(req,res)=>{
               
                db.query(
            
                    "select * from insgen",
                    
                    (err,result)=>{
            
                        if (err){
            
                  console.log(err)
            
                        }else{
                            res.send(result)
                        
                        }})});
 
                        app.get("/rennual/:date1/:date2",(req,res)=>{
                         const date1=req.params.date1
                         const date2=req.params.date2
                        
                        
                            db.query(
                                "select * from insgen where end_dt BETWEEN ? AND  ? ",
                                [date1,date2],
                                (err,result)=>{
                        
                                    if (err){
                        
                              console.log(err)
                        
                                    }else{
                                        res.send(result)
                                        
                                    }})});

                                    app.get("/allchqs",(req,res)=>{
                                        const date1=req.params.date1
                                        const date2=req.params.date2
                                       
                                       
                                           db.query(
                                               "select * from insacc ",
                                               
                                               (err,result)=>{
                                       
                                                   if (err){
                                       
                                             console.log(err)
                                       
                                                   }else{
                                                       res.send(result)
                                                       
                                                   }})});



                          app.get("/dailyprod",(req,res)=>{
                
                var localTime = moment().format('YYYY-MM-DD');
                console.log(localTime)
                db.query(
            
                    "select * from insgen where reg_dt =? ",
                     [localTime],
                    (err,result)=>{
            
                        if (err){
            
                  console.log(err)
            
                        }else{
            
                            res.send(result)
                            console.log(localTime)
            
                        }}
            
                )
            
                });                            
                app.get("/currentcheqs",(req,res)=>{
                
                    var localTime = moment().format('YYYY-MM-DD');
                    
                    db.query(
                
                        "select * from insacc where chq_date =?",
                         [localTime],
                        (err,result)=>{
                
                            if (err){
                
                      console.log(err)
                
                            }else{
                
                                res.send(result)
                               
                
                            }}
                
                    )
                
                    });


app.listen(3001,()=>{

    console.log('your arr on server port 3001')

})
