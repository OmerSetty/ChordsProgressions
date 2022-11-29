import mongoose from 'mongoose';

const progressionSchema = mongoose.Schema({
  progression: {
    type: [String],
    require: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Progression'
  },
});

const Progression = mongoose.model('Progression', progressionSchema);

export default Progression;