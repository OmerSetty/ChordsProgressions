import mongoose from 'mongoose';

const songSchema = mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  artist: { 
    type: String,
    required: true
  },
  album: String,  
  genres: { 
    type: [String],
    required: true
  },
  year: { 
    type: Number,
    required: true
  },
  parts: [
    {
      part: { 
        type: String,
        required: true
      },
      progressions: [
        {
          progression: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Progression',
          },
          key: String,
        }
      ],
      chords: [
        {
          chord: String, 
          position: Number 
        }
      ],
      lyrics: String 
    }
  ],
  uploader: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  likesAmount: { 
    type: Number,
    default: 0
  } 
});

const Song = mongoose.model('Song', songSchema);

export default Song;