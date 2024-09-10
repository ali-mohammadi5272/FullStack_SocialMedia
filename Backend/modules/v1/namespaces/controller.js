const namespaceModel = require("./model");
const createNamespaceValidate = require("./../../../utils/validators/namespaces/createNamespace");
const {
  checkDBCollectionIndexes,
} = require("./../../../utils/helperFunctions");
const { isValidObjectId } = require("mongoose");

const createNamespace = async (req, res, next) => {
  const isValidRequestBody = createNamespaceValidate(req.body);
  if (!isValidRequestBody) {
    return res.status(422).json(createNamespaceValidate.errors);
  }
  const { title, href } = req.body;

  try {
    await checkDBCollectionIndexes(namespaceModel);
  } catch (err) {
    const isNamespaceExistBefore = await namespaceModel
      .findOne({
        $or: [{ title }, { href }],
      })
      .lean();
    if (isNamespaceExistBefore) {
      return res.status(422).json({ message: "Namespace is already exist !!" });
    }
  }

  try {
    const newNamespace = await namespaceModel.create(req.body);
    if (!newNamespace) {
      return res.status(500).json({ message: "Create Namespace failed !!" });
    }
    const newNamespaceObject = newNamespace.toObject();
    Reflect.deleteProperty(newNamespaceObject, "__v");

    return res.status(201).json({
      message: "Namespace created successfully :))",
      namespace: newNamespaceObject,
    });
  } catch (err) {
    return next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const namespaces = await namespaceModel.find({}).select("-__v").lean();

    return res.status(200).json(namespaces);
  } catch (err) {
    next(err);
  }
};

const removeNamespace = async (req, res, next) => {
  const { id } = req.params;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return res.status(422).json({ message: "NamespaceId is not valid !!" });
  }

  try {
    const namespace = await namespaceModel.findOneAndDelete({ _id: id });

    if (!namespace) {
      return res.status(422).json({ message: "Remove Namespace failed !!" });
    }

    return res
      .status(200)
      .json({ message: "Namespace removed successfully :))" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createNamespace, getAll, removeNamespace };
