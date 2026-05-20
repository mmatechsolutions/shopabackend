import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    businessPhone: { type: String, required: true },
    businessEmail: { type: String },
    county: { type: String, required: true },
    town: { type: String, required: true },
    description: { type: String },

    slug: { type: String, unique: true },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    selectedPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
  },
  { timestamps: true },
);

businessSchema.pre("save", async function () {
  if (!this.isModified("businessName")) return;

  const base = this.businessName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");

  const existing = await this.constructor.findOne({ slug: base });

  if (!existing) {
    this.slug = base;
  } else {
    const unique = Math.random().toString(36).substring(2, 6);

    this.slug = `${base}-${unique}`;
  }
});

export default mongoose.model("Business", businessSchema);
