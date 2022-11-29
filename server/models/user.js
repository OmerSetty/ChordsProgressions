import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  likedSongs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Song'
  }
});

const User = mongoose.model('User', userSchema);

export default User;