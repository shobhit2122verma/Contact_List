const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
//this is the Schema we have created and now we have to tell about the collection that is using this schema

const Contact = mongoose.model('Contact',contactSchema);
module.exports =Contact;