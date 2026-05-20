import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      default: "staff",
    },

    password: {
      type: String,
      required: true,
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Staff", staffSchema);
