const userModel = require("./../users/model");
const roles = require("./../../../utils/constants");
const registerValidate = require("./../../../utils/validators/auth/register");
const { phoneNumberPrefixPattern } = require("./../../../utils/patterns");
const {
  generateAccessToken,
  hashPassword,
  checkDBCollectionIndexes,
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
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 24,
      httpOnly: true,
      path: "/",
      secure: true,
      signed: true,
    });
    return res.status(201).json({
      message: "User registered successfully :))",
      user: newUserObject,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
};
