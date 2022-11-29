import User from "../models/user.js";
import { getAllDocuments } from "../utils/dbRequests.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllDocuments(User);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};
