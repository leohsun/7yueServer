var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bookSchema = new Schema({
    title: String,
    author: String,
    cover: String,
    summary: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now(),
        },
        updateAt: {
            type: Date,
            default: Date.now(),
        }
    }
})

bookSchema.pre('save', function (next) {
    if (this.isNew) this.meta.createAt = Date.now();
    else this.meta.updateAt = Date.now();
    next();
})
module.exports = bookSchema