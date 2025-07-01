const mongoose = require("mongoose");
const CategoryModel = require("../model/CategoryModel");
const EventModel = require("../model/EventModel");

const CreateCategory = async (req, res) => {
  const { categoryName, categoryImage } = req.body;
  try {
    if (!categoryName || !categoryImage) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }
    let data = await CategoryModel.create({
        categoryName: categoryName,
        categoryImage: categoryImage,
    })
    return res.status(201).json({
      status: "success",
      message: "category created",
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const ViewCategory = async (req, res) => {
    try {
        let data = await CategoryModel.find()
        return res.status(200).json({
            status: "success",
            data: data,
          });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message,
          });
    }
};

const ListByCategory = async (req, res) => {
  try {
    let categoryId =new mongoose.Types.ObjectId( req.params.categoryId);
    console.log(categoryId)
    let MatchStage = {$match: {categoryId: categoryId}}
    let JoinWithCategory = { $lookup:{ from: "categories", localField: "categoryId", foreignField: "_id", as: "category"}
         }
    let UnWindCategory = {$unwind: "$category"}
    let ProjectionStage = {$project: {"createdAt": 0, "updatedAt": 0, "category.createdAt": 0, "category.updatedAt": 0}}
    let data = await EventModel.aggregate([
      MatchStage, JoinWithCategory, UnWindCategory, ProjectionStage
    ])
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

module.exports = {
  CreateCategory,
  ViewCategory,
  ListByCategory,
};
