const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = (user) => {
    const username = user.firstName + " " + user.lastName;
  
    return jwt.sign(
      {
        name: username,
        id: user.id,
        userType: user.userType,
        email: user.email,
        photo: user.photo,
        disciplineId: user.disciplineId,
      },
      "Stack",
      { expiresIn: "1d" }
    );
  };


exports.register = catchAsync( async(req, res, next)=>{
    const user = await User.create(req.body);
    res.status(200).json({
        status: "success",
        message: "User Created Successfully",
        user
    });
});


exports.login = catchAsync(async(req, res, next) => {
    const user = await User.findOne({
        where: { email: req.body.email}
    });

    const token = signToken(user);
    const cookieOptions = res.cookie('jwt', token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        httpOnly : true
    });
    cookieOptions.secure = true;
    res.status(200).json({
        status: 'success',
        message: 'Successfully logged in ',
        token,
        user
    })
});