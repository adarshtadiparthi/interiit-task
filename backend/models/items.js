const mongoose = require('mongoose');

// Item JSON structure example
// {
//     "item_id": "9b7b6b4a543c4bb090de37870a49d70b",
//     "name": "Black & Decker Screwdriver Series B",
//     "quantity": 339,
//     "category": "Tools",
//     "price": 448.43,
//     "status": "in_stock",
//     "godown_id": "b3f0e83bb8ee4e308d759c95e2c3507d",
//     "brand": "Black & Decker",
//     "attributes": { "type": "Hand Tool", "material": "Plastic", "warranty_years": 1 },
//     "image_url": "https://m.media-amazon.com/images/I/41-T3GBGYUL.jpg"
// }

const ItemSchema = new mongoose.Schema({
    item_id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },                   
    quantity: { type: Number, required: true },               
    category: { type: String, required: true },               
    price: { type: Number, required: true },                  
    status: { type: String, default: 'in_stock' },            
    godown_id: { type: String, required: true },              
    brand: { type: String },                                  
    attributes: { type: Object },                             
    image_url: { type: String }                               
});

module.exports = mongoose.model('Item', ItemSchema);
