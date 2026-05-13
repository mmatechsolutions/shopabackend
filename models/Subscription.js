import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "pending", "inactive"],
      default: "active", // MVP: auto-activate free flow
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscription", subscriptionSchema);
