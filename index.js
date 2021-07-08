const db=require('./config/mongoose');
const Contact=require('./models/contact');
const express=require('express');
const port=8000;
const path=require('path');
const process = require('process');
//to get all the functionalities of express we call express as a function
const app=express();//now the app has all the functionalities of this library'express' which are needed to run a server

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//this only reads the form data that has been submitted not the params  **

app.use(express.static('assets'));//what this will do is it will go and find out assets in our current directory

// // middleware1
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();// if we do not call the next() here then our page will just load and nothing happens this happens because we did not told our middleware that what route or where we have to go

// });

// //middleware2
// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     next();
// });

var contactlist=[
    {
        name:"Shobhit",
        phone:'11111111'
    },
    {
        name:"Shobhit2",
        phone:'111111112'
    },
    {
        name:"Shobhit3",
        phone:'111111122'
    }
];
app.post('/create-contact', function(req,res){
    // contactlist.push({
    //     name :req.body.name,
    //     phone :req.body.phone
    // });instead of this what we can write is that
    // contactlist.push(req.body); now after adding the database what we will do is that we will push this into out database serve

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log('error in creating a contact');
            return ;
        }
        console.log('new contact',newContact);
        return res.redirect('back');
    });

    // return res.redirect('back');//instead the / we can also add the back option here.
    // console.log(req.body.name);
    // console.log(req.body.name);
    // return res.redirect('/practice');
});

app.get('/',function(request,response){
    // response.send('<h1>yes the server is running now</h1>');//now sice we are going to render the file we will remove this
    Contact.find({},function(err,contact)
    {
        if(err)
        {
            console.log("error getting data from database");
            return;
        }
        return response.render('home',{
            title:'Contact List',
            contact_list:contact
        });
    });
});

app.get('/practice',function(request,response){
    
    response.render('practice',{
        title:'Let us play with EJS'
    });
});

app.get('/delete-contact',function(req,res){
    // console.log(req.query); for deleting the contact get the query from the url
    // let phone=req.query.phone;//now the params are also the objects that is handled in the express
    // let contactIndex= contactlist.findIndex(contact => (contact.phone==phone));
    // if(contactIndex!=-1)
    // {
    //     contactlist.splice(contactIndex,1);
    //     return res.redirect('back');
    // }

    //now from here we are writting our code when we have implied the database to our server
    //STEPS
    //get the id of the query in the url
    let id=req.query.id;
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log("error in deleting the contact");
            return;
        }
        return res.redirect('back');
    })
});

app.listen(port,function(err){
    if(err)
    {
        console.log('Error in running the server',err);
        return;
    }
    console.log('Express server running on port',port);
});