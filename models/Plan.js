import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "KES",
    },

    billing: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },

    features: [
      {
        type: String,
      },
    ],

    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Plan", planSchema);
