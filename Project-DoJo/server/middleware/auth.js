import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({ msg: "Authentication Failed" });
    req.id = verified.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuth;
