import Business from "../models/Business.js";

export const getTenantBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const tenant = await Business.findOne({
      slug,
    });

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    res.status(200).json({
      success: true,
      tenant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
