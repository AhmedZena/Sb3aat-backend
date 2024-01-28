const Notification = require("../models/notification");

// get all notifications
let getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let getNotificationsByUserId = async (req, res) => {
  console.log(req);
  try {
    // Assuming user ID is stored in req.user after authentication
    const notifications = await Notification.find({
      userReference: req.user.id,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let updateNotificationReadStatus = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let postNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
    getAllNotifications, 
  getNotificationsByUserId,
  updateNotificationReadStatus,
  postNotification,
};
