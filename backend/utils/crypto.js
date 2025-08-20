import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();


const ALGORITHM = process.env.ALGORITHM
const SECRET_KEY = process.env.SECRET_KEY;
const IV_SECRET = Buffer.from(process.env.IV_SECRET)


export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), IV_SECRET);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), IV_SECRET);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};