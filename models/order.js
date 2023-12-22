import {model, Schema} from "mongoose";

const orderSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number, required: true },
        },
    ],
})

const Order = new model("orders",orderSchema)

export default Order