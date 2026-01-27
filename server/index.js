import express from 'express';
import bodyParse from 'body-parser';
import session from 'express-session'; 
import cors from 'cors';
import { mockUsers, mockSongs, mockProgressions } from './mockData.js';

// Original imports (commented out for mock version)
/*
import mongoose from 'mongoose';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import 'dotenv/config';
import './passport.js';
import songsRouter from './routes/songs.js';
import progressionsRouter from './routes/progressions.js';
import authRouter from './routes/auth.js';
*/

const app = express();

app.use(express.static("public"));
app.use(bodyParse.json({ extended: true }));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Original MongoDB connection code (commented out for mock version)
/*
const CONNECTION_URL = `mongodb+srv://OmerSetty:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.qvxq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connection = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const sessionStore = MongoStore.create({ mongoUrl: CONNECTION_URL, collection: 'sessions' });
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

connection
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));
*/

const PORT = process.env.PORT || 3001;

// Simple session configuration without MongoDB
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));


// Original routes (commented out for mock version)
/*
app.use(passport.initialize());
app.use(passport.session());

app.use('/songs', songsRouter);
app.use('/progressions', progressionsRouter);
app.use('/auth', authRouter);
*/

// Mock routes
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = mockUsers[0]; // Always return demo user
  req.session.userId = user.id;
  res.json({ user: { username: user.username, id: user.id } });
});

app.post('/auth/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

app.get('/songs', (req, res) => {
  res.json(mockSongs);
});

app.get('/songs/:id', (req, res) => {
  const song = mockSongs.find(s => s.id === req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json(song);
});

app.get('/progressions', (req, res) => {
  res.json(mockProgressions);
});

app.post('/songs/:id/like', (req, res) => {
  const song = mockSongs.find(s => s.id === req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  song.likesAmount += 1;
  res.json(song);
});

// Start the server
app.listen(PORT, () => console.log(`Mock server running on port: ${PORT}`));