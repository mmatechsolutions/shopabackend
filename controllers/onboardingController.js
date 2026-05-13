import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Business from "../models/Business.js";
import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

export const signup = async (req, res) => {
  try {
    const { firstName, secondName, phone, email, password } = req.body;

    if (!firstName || !secondName || !phone || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    /* CREATE USER */
    const newUser = await User.create({
      firstName,
      secondName,
      phone,
      email,
      password,
    });

    /* TOKEN */
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Signup successful",
      token,

      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        secondName: newUser.secondName,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createBusiness = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const business = await Business.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Business created",
      business,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();

    res.status(200).json({
      plans,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const selectPlan = async (req, res) => {
  try {
    const { tenantId, planId } = req.body;

    const business = await Business.findByIdAndUpdate(
      tenantId,
      {
        selectedPlan: planId,
      },
      { new: true },
    );

    if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }

    res.status(200).json({
      message: "Plan saved successfully",
      subscription: business,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
