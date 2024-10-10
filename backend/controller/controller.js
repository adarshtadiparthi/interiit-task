// const mongoose = require('mongoose');
const {FinalGodown} = require('../models/godown');
const {Items} = require('../models/items');

/**GET : https://localhost:5000/api*/
const getData = async(req,res) => {
    try{
        const data = await FinalGodown.find();
        res.status(200).json({success : true,data : data});
    }
    catch(err){
        res.status(500).json({success : false,error : err});
    }
}

/**GET : https://localhost:5000/api/item/:id*/
const getItemData = async(req,res) => {
    try{
        const id = req.params.id;
        const itemData = await Items.findOne({id : id});
        if(itemData) 
            res.status(200).json({success : true,data : itemData});
        else 
            res.status(404).json({success : false,error : "Item not found"});
    }
    catch(err){
        res.status(500).json({success : false, error : err});
    }
}

module.exports = {getData,getItemData};