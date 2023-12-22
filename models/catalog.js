import {model, Schema} from "mongoose";

const catalogSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
    ],
});

const Catalog = model('catalogs', catalogSchema);

export default Catalog;
