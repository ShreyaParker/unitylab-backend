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
            name: { type: String, required: true },
            price: { type: Number, required: true }
        },
    ],
});

const Catalog = model('catalog', catalogSchema);

export default Catalog;
