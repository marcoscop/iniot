const {Schema, model} = require('mongoose');

const NotebookSchema = new Schema({
    serie:{
        type:String,
        required: true
    },
    marca:{
        type:String,
        required:false
    },
    modelo:{
        type:String,
        required:false
    },
    mac:{
        type:String,
        required:false
    }
    //cuando fue creado y cuando se actualiza
},{
    timestamp:true
}
);

module.exports = model('Notebook', NotebookSchema);