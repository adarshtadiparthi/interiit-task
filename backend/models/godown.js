const mongoose = require('mongoose');

const GodownSchema = new mongoose.Schema({
    id : {type : String , required: true , unique : true},
    name : {type : String, required: true},
    parent_godown : {type : String} 
});
const GodownItemSchema = new mongoose.Schema({
    id : {type : String , required: true , unique : true},
    name : {type : String, required: true},
    itemList : [{
        item_id: { type: String, required: true },
        name: { type: String, required: true }
    }],
    parent_godown : {type : String}
})
const FinalSchema = new mongoose.Schema({
    id : {type : String , required: true , unique : true},
    name : {type : String, required: true},
    subGodownList : [{
        id : {type : String , required: true , unique : true},
        name : {type : String, required: true},
        itemList : [{
            item_id: { type: String, required: true },
            name: { type: String, required: true }
        }],
        parent_godown : {type : String}
    }]
})
const Godown = mongoose.model('Godown', GodownSchema);
const GodownItem = mongoose.model('GodownItem', GodownItemSchema);
const FinalGodown = mongoose.model('FinalGodown',FinalSchema);

module.exports = {Godown,GodownItem,FinalGodown};