const {Schema, model} = require('mongoose');

const CarrtioSchema = new Schema({
    nombre:{
        type:String,
        require: true,
        unique: true
    },
    detalle:{
        type:String,
        require:false
    },
    cantidad:{
        type:Number,
        require:true
    }
},{
    timestamps: { createdAt: 'created_at' }
});

module.exports = model('Carritos', CarrtioSchema); 