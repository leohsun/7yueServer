var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
    appkey:String,
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

userSchema.pre('save', function (next) {
    if (this.isNew) this.meta.createAt = Date.now();
    else this.meta.updateAt = Date.now();
    next();
})