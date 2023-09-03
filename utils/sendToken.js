const sendToken = (res, user, message) => {
  const token = user.getJWT();
  //   console.log("token", token);

  options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    message: message,
    token,
  });
};

module.exports = sendToken;
