const Notification = require("../models/notification");
const { User } = require("../models/users");
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
  console.log(req.user); // { id: '60f3e3e3e3e3e3e3e3e3e3e3', role: 'admin'}
  // i want whosend to be the user id from the token
  try {
    // Destructure the userReference and whoSend from the request body
    const { userReference, whoSend } = req.body;

    // Check if both users exist in the User model
    const userRefExists = await User.findOne({ _id: userReference });
    const whoSendExists = await User.findOne({ _id: req.user.id });

    // If either user does not exist, return an error
    if (!userRefExists)
      return res.status(400).json({ message: "User reference does not exist" });
    if (!whoSendExists)
      return res.status(400).json({ message: "Who send does not exist" });

    // If both users exist, create and save the new notification
    const newNotification = new Notification({
      userReference,
      whoSend: req.user.id,
      ...req.body,
    });

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
