import express from 'express';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import session from 'express-session'; 
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import 'dotenv/config';
import './passport.js';
import songsRouter from './routes/songs.js';
import progressionsRouter from './routes/progressions.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(express.static("public"));
app.use(bodyParse.json({ extended: true }));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const CONNECTION_URL = `mongodb+srv://OmerSetty:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.qvxq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3001;
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


app.use(passport.initialize());
app.use(passport.session());

app.use('/songs', songsRouter);
app.use('/progressions', progressionsRouter);
app.use('/auth', authRouter);