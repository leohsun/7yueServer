var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var LikeSchema = new Schema({
    bookId: ObjectId,
    userId: String,
    periodicalId: ObjectId,
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
});

LikeSchema.pre('save', function (next) {
    if (this.isNew) this.meta.createAt = Date.now();
    else this.meta.updateAt = Date.now();
    next();
})

module.exports = LikeSchema