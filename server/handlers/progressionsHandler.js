import Progression from "../models/progression.js";
import { getAllDocuments, postDocument } from "../utils/dbRequests.js";

export const getProgressions = async (req, res) => {
  try {
    const progressions = await getAllDocuments(Progression);
    res.status(200).json(progressions);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getProgressionsByProgression = async (req, res) => {
  try {
    const progressions = await getDocuments(Progression, getSongsFavoredByUserPipeline(requestQuery));
    res.status(200).json(progressions);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createProgression = async (req, res) => {
  const progression = req.body;
  try {
    const newProgression = await postDocument(Progression, progression)
    res.status(201).json(newProgression);
  } catch (error) {
    res.status(409).json(error);
  }
};