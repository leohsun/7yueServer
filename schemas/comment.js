var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var commentSchema = new Schema({
    userId: String,
    bookID: ObjectId,
    periodicalId: ObjectId,
    comment: String,
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

commentSchema.pre('save', function (next) {
    if (this.isNew) this.meta.createAt = Date.now();
    else this.meta.updateAt = Date.now();
    next();
})
module.exports = commentSchema