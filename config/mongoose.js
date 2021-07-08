//require the library
const mongoose=require('mongoose');//1

//connect to database
mongoose.connect('mongodb://localhost/contact_list_db');//2  this is how mongoose will connect to the database

//acquire the connection(to check if it is successful)
const db = mongoose.connection;//3 when step 2 has connected then this step gives the acess to the database ie dbto access

//error
db.on('error',console.error.bind(console,'error connecting to db'));//3 in this step it checks that the connection is successful or not if not then this will give the eroor justified

//up and running
db.once('open',function(){
    console.log('successfully connected to the database');
});
//now what we have to do is include this file when i am firing up my server