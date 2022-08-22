const { Schema, model } = require('mongoose');

const ItemSchema = Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

ItemSchema.method('toJSON', function () {
    const { __v, _id, ...item } = this.toObject();
    item.id = _id;
    return item;
});


module.exports = model('Item', ItemSchema);
