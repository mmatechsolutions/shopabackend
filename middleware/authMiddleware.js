import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const splitToken = token.split(" ")[1];

    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
