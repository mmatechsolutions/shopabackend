import Tenant from "../models/Tenant.js";

export default async function resolveTenant(req, res, next) {
  const slug = req.params.slug || req.headers["x-tenant-slug"];

  if (!slug) {
    return res.status(400).json({ message: "Tenant slug required" });
  }

  const tenant = await Tenant.findOne({ slug });

  if (!tenant) {
    return res.status(404).json({ message: "Tenant not found" });
  }

  req.tenant = tenant;
  next();
}
