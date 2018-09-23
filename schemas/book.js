var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// "作者": "author",
// "出版社": "publisher",
// "出品方": "producer",
// "原作名": "raw_bookname",
// "译者": "translotor",
// "出版年": "pub_year",
// "页数": "total",
// "定价": "price",
// "装帧": "binding_layout",
// "丛书": "categroy",
// "ISBN": "isbn"
//"封面图":'cover
var bookSchema = new Schema({
    title: String,
    author: String,
    cover: String,
    producer:String,
    raw_bookname:String,
    translotor: String,
    pub_year: String,
    total: String,
    price: String,
    binding_layout: String,
    isbn: String,
    summary: String,
    categroy: String,
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