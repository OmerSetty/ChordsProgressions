import Song from "../models/song.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { getDocuments, postDocument, updateDocument } from "../utils/dbRequests.js";
import { getAllSongsPipeline, getSongsByTitlePipeline, getSongsPostedByUserPipeline, getSongsFavoredByUserPipeline, getSongsByDataPipeline, getSongDataPipeline } from "../utils/mongodbAggregationPipelines.js"

export const getSongsByTitle = async (req, res) => {
  try {
    const requestQuery = req.query;
    const songs = await getDocuments(Song, getSongsByTitlePipeline(requestQuery));
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getSongsPostedByUser = async (req, res) => {
  try {
    const requestQuery = req.query;
    requestQuery.userId = mongoose.Types.ObjectId(requestQuery.userId);
    const songs = await getDocuments(Song, getSongsPostedByUserPipeline(requestQuery));
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getSongsFavoredByUser = async (req, res) => {
  try {
    const requestQuery = req.query;
    requestQuery.userId = mongoose.Types.ObjectId(requestQuery.userId);
    const songs = await getDocuments(User, getSongsFavoredByUserPipeline(requestQuery));
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getSongsByData = async (req, res) => {
  try {
    const requestQuery = req.query;
    requestQuery.progressions = requestQuery.progressions.map(progression => {
      const parsedProgression = JSON.parse(progression);
      parsedProgression.progressions = parsedProgression.progressions.map(progression => mongoose.Types.ObjectId(progression));
      return parsedProgression;
    });
    const songs = await getDocuments(Song, getSongsByDataPipeline(requestQuery));
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await getDocuments(Song, getAllSongsPipeline());
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getSongData = async (req, res) => {
  try {
    const requestQuery = req.query;
    const songId = mongoose.Types.ObjectId(requestQuery.songId)
    const songData = await getDocuments(Song, getSongDataPipeline(songId));
    res.status(200).json(songData);
  } catch (error) {
    res.status(404).json(error);
  }
};


export const postSong = async (req, res) => {
  const song = req.body;
  try {
    const newSong = await postDocument(Song, song)
    res.status(201).json(newSong);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const addSongToFavorites = async (req, res) => {
  const request = req.body;
  const updateInUser = { $push: { likedSongs: request.songId } };
  const updateInSong = { $inc : {likesAmount : 1} };
  try {
    const updatedSong = await updateDocument(User, request.userId, updateInUser);
    await updateDocument(Song, request.songId, updateInSong);
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(409).json(error);
  }
};

