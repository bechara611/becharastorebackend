import { model, Schema } from "mongoose";

const Productos = new Schema({
    title:{
        type:String,
        required:[true,'PLEASE, INSERT A TITLE']
    },
    idstore:{
        type:String,
        required:[true,'PLEASE, INSERT A IDSTORE']
    }
})

export default model('Productos',Productos)
//TODO crear modelo completo de productos guiate del frontend

// _id: 'abc123',
// idstore: 'store124',
// urlimg: 'https://media.wuerth.com/stmedia/modyf/eshop/products/std.lang.all/resolutions/category/png-546x410px/24899640.png',
// title: '1',
// description: 'Esto es una camisa linda',
// categoria: 'MEN',
// descriptionLong:'Loremfa-rotate-180 esto es una descripcion muchisimo mas larga que la anterior para demostrar que simplemente si se puede ok ok ',
// price:15