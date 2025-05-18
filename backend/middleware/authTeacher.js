const jwt = require("jsonwebtoken");

const authTeacher = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,process.env.SECRET_KEY);

    req.teacher = {
      id: decoded.teacherId,
      schoolId: decoded.schoolId
    };

    next();
  } catch (err) {
    console.error("Token error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authTeacher;
