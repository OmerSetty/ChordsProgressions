import express from 'express';
import { getAllSongs, addSongToFavorites, getSongsByTitle, getSongsPostedByUser, getSongsFavoredByUser, getSongsByData, getSongData, postSong } from '../handlers/songsHandler.js';
const router = express.Router();

router.get('/', getAllSongs);
router.post('/', postSong);
router.post('/addSongToFavorites', addSongToFavorites);
router.get('/getSongsByTitle', getSongsByTitle);
router.get('/getSongsPostedByUser', getSongsPostedByUser);
router.get('/getSongsFavoredByUser', getSongsFavoredByUser);
router.get('/getSongsByData', getSongsByData);
router.get('/getSongData', getSongData);

export default router;