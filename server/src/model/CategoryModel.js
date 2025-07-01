const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    categoryImage: {
        type: String,
        required: true,
        trim: true,
    },
    
}, {
    timestamps: true,
    versionKey: false,
}
)

const CategoryModel = mongoose.model("Category", DataSchema);

module.exports = CategoryModel;