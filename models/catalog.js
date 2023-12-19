import {model, Schema} from "mongoose";

const catalogSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    ],
});

const Catalog = model('catalog', catalogSchema);

export default Catalog;
