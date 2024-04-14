// factory pattern to get data , post data , update data and delete data
// handlersFactory.js

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const data = await Model.find();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "No dataument found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.createOne = (Model) => async (req, res, next) => {
  try {
    const newdata = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: newdata,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "No dataument found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "No dataument found with that ID",
      });
    }
    res.status(204).send("data deleted successfully");
  } catch (err) {
    next(err);
  }
};
