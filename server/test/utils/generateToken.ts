import jwt from "jsonwebtoken";
interface TokenUser {
  id: string;
  email: string;
}

const generateToken = (user: TokenUser) => {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET || "your_jwt_secret";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

export default generateToken;
