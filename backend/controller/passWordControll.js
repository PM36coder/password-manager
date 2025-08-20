import { encrypt, decrypt } from "../utils/crypto.js";
import { ManagerPass } from "../model/managerPassSchema.js";

// Save password
const savePassword = async (req, res) => {
  const { website, url, username, password } = req.body;
  const user = req.user._id;

  try {
    if (!website || !url || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const encryptedPassword = encrypt(password);

    const newPass = await ManagerPass.create({
      user,
      website,
      url,
      username,
      password: encryptedPassword
    });

    res.status(200).json({ message: "Password saved successfully", newPass });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get one password (when user clicks "show")
const getPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const passDoc = await ManagerPass.findById(id);

    if (!passDoc) {
      return res.status(404).json({ message: "Password not found" });
    }

    const decryptedPass = decrypt(passDoc.password);

    res.status(200).json({
      message: "Password retrieved successfully",
      password: decryptedPass
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving password", error: error.message });
  }
};

//get all
const getAllPasswords = async (req, res) => {
  try {
    const user = req.user._id; // user ke hisaab se filter karna h
    const passwords = await ManagerPass.find({ user }).select("-password"); // password mat bhejna
    res.status(200).json({ message: "All passwords", passwords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching passwords", error: error.message });
  }
};

// Delete
const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ManagerPass.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting password", error: error.message });
  }
};

// Update
const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { website, url, username, password } = req.body;

    let updateData = { website, url, username };
    if (password) {
      updateData.password = encrypt(password);
    }

    const updated = await ManagerPass.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.status(200).json({ message: "Password updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};

export { savePassword, getPassword, deletePassword, updatePassword ,getAllPasswords};
