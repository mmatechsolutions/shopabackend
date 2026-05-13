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

/* AUTO SLUG GENERATION */
businessSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("businessName")) return next();

    const base = this.businessName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    // check if slug already exists
    const existing = await Business.findOne({ slug: base });

    if (!existing) {
      // unique → use clean slug only
      this.slug = base;
    } else {
      // collision → add random suffix
      const unique = Math.random().toString(36).substring(2, 6);

      this.slug = `${base}-${unique}`;
    }

    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Business", businessSchema);
