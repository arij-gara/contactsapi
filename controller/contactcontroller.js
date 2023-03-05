const Contact = require("../models/contactModel")
const asynchandler = require("express-async-handler")

//Get all contacts 
//@route Get api/contacts
//@access private

const getcontacts = asynchandler( async (req,res)=> {
    const contacts= await Contact.find()

    res.status(200).json(contacts)
})

//Create contact 
//@route POST api/contacts
//@access private

const createcontact = asynchandler(async (req,res)=> {
//    const contact = new Contact(req.body)
//    const savedcontact = contact.save()
//     res.status(200).json(savedcontact)
const {name, email, phone}= req.body;
if(!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are required")

}
const contact = await Contact.create({name, email, phone, user_id:req.user.id})
res.status(201).json(contact)
 })

//Update contact 
//@route PUT api/contacts/:id
//@accessprivate

const updatecontact = asynchandler(async (req,res)=> {
    const contact =  await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true}
    )

   res.status(200).json(updatedcontact)
})

//Get one  contacts 
//@route Get api/contacts/:id
//@access private

const getcontact = asynchandler (async (req,res)=> {
    const contact =  await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json("contact not found")
    
    }
    res.status(201).json(contact)
})
//Delete contact 
//@route DELETE api/contacts/:id
//@access private

const deletecontact = asynchandler(async (req,res)=> {
    const contact =  await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    await Contact.findOneAndRemove()
    res.status(200).json(contact)
})

module.exports= {getcontacts,createcontact,getcontact,updatecontact, deletecontact}