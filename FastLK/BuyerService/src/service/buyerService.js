"use strict";

const Buyer = require("../model/buyer");
const { validateBuyer } = require("./buyerValidation");
const bcrypt = require("bcryptjs");

//adding buyer
const addBuyer = async (req, res) => {
  const buyer = req.body;
  let newBuyer = await validateBuyer(buyer);
  try {
    if (newBuyer === 0) {
      res.status(400).json({ msg: "Please Enter All Fields!" });
    } else if (newBuyer === 1) {
      res.status(400).json({ msg: "User Already Exists!" });
    } else {
      newBuyer = new Buyer(buyer);
      newBuyer.password = bcrypt.hashSync(newBuyer.password, 10);
      await newBuyer.save();
      res.status(201).json({ msg: "added" });
    }
  } catch (error) {
    res.status(409).json({ message: "Buyer Not Created!" });
  }
};

//retrieve all buyers
const getAllBuyers = async (req, res) => {
  try {
    const allBuyers = await Buyer.find();
    res.json(allBuyers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get buyer by id
const getBuyer = async (req, res) => {
  try {
    if (req.params.id != req.user._id) {
      throw new Error("Unauthorized access");
    }

    const currentBuyer = await Buyer.findById(req.params.id);
    res.json(currentBuyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update buyer details
const updateBuyer = async (req, res) => {
  try {
    if (req.params.id != req.user._id) {
      throw new Error("Unauthorized access");
    }

    const currentBuyer = await Buyer.findById(req.params.id);
    currentBuyer.firstName = req.body.firstName;
    currentBuyer.lastName = req.body.lastName;
    currentBuyer.userName = req.body.userName;
    currentBuyer.email = req.body.email;
    currentBuyer.password = bcrypt.hashSync(req.body.password, 10);
    currentBuyer.phoneNumber = req.body.phoneNumber;
    currentBuyer.address = req.body.address;
    await currentBuyer.save();
    res.status(201).json(currentBuyer);
  } catch (error) {
    res.status(409).json({ msg: "No Such Buyer!" });
  }
};

//delete buyer
const deleteBuyer = async (req, res) => {
  try {
    if (req.params.id != req.user._id) {
      throw new Error("Unauthorized access");
    }
    
    const currentBuyer = await Buyer.findById(req.params.id);
    await currentBuyer.remove();
    res.status(201).json("deleted");
  } catch (error) {
    res.status(409).json({ msg: "Could Not Delete!" });
  }
};

module.exports.addBuyer = addBuyer;
module.exports.getAllBuyers = getAllBuyers;
module.exports.getBuyer = getBuyer;
module.exports.updateBuyer = updateBuyer;
module.exports.deleteBuyer = deleteBuyer;