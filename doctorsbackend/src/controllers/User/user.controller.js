const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { userService } = require('../../services');
const { sendAccountCreationEmailUser } = require('../../services/email.service');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  if(user) {
    await sendAccountCreationEmailUser(user);
    res.status(httpStatus.CREATED).send(user);
  } else {
    res.status(httpStatus.NOT_ACCEPTABLE).send(null);
  }
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const { options } = req.body;
  //options.populate = 'salary, salary.salaryCategory, shift,';
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserByName = catchAsync(async (req, res) => {
  const user = await userService.getUserByName(req.body.name);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserByShift = catchAsync(async (req, res) => {
  const user = await userService.getUserByShift(req.body.shiftId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
})

const updateUser = catchAsync(async (req, res) => {
  req.body.updated_at = new Date();
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByName,
  getUserByShift,
  updateUser,
  deleteUser,
};
