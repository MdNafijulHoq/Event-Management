const mongoose = require("mongoose");
const EventModel = require("../model/EventModel");
const AttendeeModel = require("../model/AttendeeModel");

const CreateEvent = async (req, res) => {
  const {
    title,
    description,
    image,
    organizer,
    eventDate,
    startTime,
    endTime,
    location,
    categoryId,
  } = req.body;

  try {
    if (
      !title ||
      !description ||
      !image ||
      !organizer ||
      !eventDate ||
      !startTime ||
      !endTime ||
      !location ||
      !categoryId
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }
    const userId = req.user._id;
    let data = await EventModel.create({
      title: title,
      description: description,
      image: image,
      organizer: organizer,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      location: location,
      categoryId: categoryId,
      userId: userId,
    });
    return res.status(201).json({
      status: "success",
      message: "Event created",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const GetEvent = async (req, res) => {
  try {
    let JoinWithCategory = {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnWindCategory = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    let data = await EventModel.aggregate([
      JoinWithCategory,
      UnWindCategory,
      ProjectionStage,
    ]);
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

const GetEventDetailsByID = async (req, res) => {
  try {
    let eventId = new mongoose.Types.ObjectId(req.params.EventId);
    let MatchStage = { $match: { _id: eventId } };
    let JoinWithCategory = {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnWindCategory = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    let data = await EventModel.aggregate([
      MatchStage,
      JoinWithCategory,
      UnWindCategory,
      ProjectionStage,
    ]);
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

const EventByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    let data = await EventModel.find({ userId: userId });
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

const UpdateEvent = async (req, res) => {
  const { EventId } = req.params;
  const updates = req.body;
  const userId = req.user._id;

  try {
    const event = await EventModel.findOne({ _id: EventId, userId: userId });
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found or you don't have permission to update it",
      });
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(
      EventId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const EventDelete = async (req, res) => {
  try {
    const EventId = new mongoose.Types.ObjectId(req.params.EventId);
    const userId = req.user._id;
    const checkItem = await EventModel.findOne({
      _id: EventId,
      userId: userId,
    });
    if (!checkItem) {
      return res.status(400).json({
        status: "success",
        message: "item not found",
      });
    }
    let data = await EventModel.deleteOne({ _id: EventId });
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

const JoinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await EventModel.findById(eventId);

    if (event.userId === userId) {
      return res.status(400).json({
        status: "fail",
        message: "You cannot join your own event",
      });
    }
    const alreadyJoined = await AttendeeModel.findOne({
      eventId,
      userId,
    });

    if (alreadyJoined) {
      return res.status(400).json({
        status: "fail",
        message: "You have already joined this event",
      });
    }

    await AttendeeModel.create({ eventId, userId });

    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { $inc: { attendeeCount: 1 } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Successfully joined event",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const SearchEvents = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    
    let matchStage = {};
    if (searchTerm) {
      matchStage.title = { $regex: searchTerm, $options: 'i' };
    }

    let data = await EventModel.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          "category.createdAt": 0,
          "category.updatedAt": 0
        }
      }
    ]);

    return res.status(200).json({
      status: "success",
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

const FilterEvents = async (req, res) => {
  try {
    const { filterType } = req.query;
    let dateFilter = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch(filterType) {
      case 'today':
        dateFilter.eventDate = {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        };
        break;
      case 'currentWeek':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        dateFilter.eventDate = {
          $gte: startOfWeek,
          $lt: new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
        };
        break;
      case 'lastWeek':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
        dateFilter.eventDate = {
          $gte: lastWeekStart,
          $lt: new Date(lastWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
        };
        break;
      case 'currentMonth':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        dateFilter.eventDate = {
          $gte: startOfMonth,
          $lte: endOfMonth
        };
        break;
      case 'lastMonth':
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        dateFilter.eventDate = {
          $gte: startOfLastMonth,
          $lte: endOfLastMonth
        };
        break;
      case 'customRange':
        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
          dateFilter.eventDate = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          };
        }
        break;
    }

    let data = await EventModel.aggregate([
      { $match: dateFilter },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          "category.createdAt": 0,
          "category.updatedAt": 0
        }
      }
    ]);

    return res.status(200).json({
      status: "success",
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = {
  CreateEvent,
  GetEvent,
  GetEventDetailsByID,
  EventByUser,
  UpdateEvent,
  EventDelete,
  JoinEvent,
  SearchEvents,
  FilterEvents,
};
