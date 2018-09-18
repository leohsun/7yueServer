var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PeriodicalShchema = new Schema({
    title: String,
    content: String,
    type: {
        type: Number,
        default: 100
    },
    image: String,
    index: Number,
    source: String,
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


PeriodicalShchema.pre('save', function (next) {
    if (this.isNew) this.meta.createAt = Date.now();
    else this.meta.updateAt = Date.now();
    next();
})

module.exports = PeriodicalShchema