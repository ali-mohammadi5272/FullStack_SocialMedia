const userModel = require("./../users/model");
const roles = require("./../../../utils/constants");
const registerValidate = require("./../../../utils/validators/auth/register");
const loginValidate = require("./../../../utils/validators/auth/login");
const { phoneNumberPrefixPattern } = require("./../../../utils/patterns");
const {
  generateAccessToken,
  hashPassword,
  checkDBCollectionIndexes,
  isValidHashedPassword,
  generateRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("./../../../utils/helperFunctions");

const register = async (req, res, next) => {
  const isValidRequestBody = registerValidate(req.body);
  if (!isValidRequestBody) {
    return res.status(422).json(registerValidate.errors);
  }
  const { firstname, lastname, password, phone, email, username, age } =
    req.body;

  const changedPhoneNumber = phone.replace(phoneNumberPrefixPattern, "");

  try {
    await checkDBCollectionIndexes(userModel);
  } catch (err) {
    const isUserExistBefore = await userModel
      .findOne({
        $or: [{ email }, { phone: changedPhoneNumber }, { username }],
      })
      .lean();
    if (isUserExistBefore) {
      return res.status(422).json({ message: "User is already exist !!" });
    }
  }

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.create({
      firstname,
      lastname,
      username,
      email,
      age,
      phone: changedPhoneNumber,
      password: hashedPassword,
      role: roles.USER,
    });
    if (!newUser) {
      return res.status(500).json({ message: "User registration failed !!" });
    }
    const newUserObject = newUser.toObject();
    Reflect.deleteProperty(newUserObject, "password");
    Reflect.deleteProperty(newUserObject, "__v");

    const accessToken = generateAccessToken({ _id: newUserObject._id });
    const refreshToken = generateRefreshToken({ _id: user._id });
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      message: "User registered successfully :))",
      user: newUserObject,
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const isValidRequestBody = loginValidate(req.body);
  if (!isValidRequestBody) {
    return res.status(422).json(loginValidate.errors);
  }
  const { identifier, password } = req.body;

  try {
    const user = await userModel
      .findOne({
        $or: [{ email: identifier }, { username: identifier }],
      })
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found !!" });
    }

    const isValidPassword = await isValidHashedPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return res
        .status(422)
        .json({ message: "Username/Email or Password is not valid !!" });
    }

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({ message: "Login successfully :))" });
  } catch (error) {
    return next(err);
  }
};

module.exports = {
  register,
  login,
};
