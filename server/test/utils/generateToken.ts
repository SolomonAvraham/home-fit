import jwt from "jsonwebtoken";
import { UserAttributes } from "../../src/models/User"; // Adjust the import based on your project structure

const generateToken = (user: UserAttributes) => {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET || "your_jwt_secret"; // Ensure this matches your secret
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

export default generateToken;
