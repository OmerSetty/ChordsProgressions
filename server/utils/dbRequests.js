export const getDocuments = function(model, pipeline) {
  return model.aggregate(pipeline);
};

export const getAllDocuments = function(model) {
  return model.find();
};

export const postDocument = function(model, data) {
  const newDocument = new model(data);
  return newDocument.save();
};

export const updateDocument = function(model, _id, update) {
  return model.updateOne({ _id }, update);
};
