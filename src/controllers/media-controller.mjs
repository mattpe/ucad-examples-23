import {fetchAllMedia, fetchMediaById} from "../models/media-model.mjs";


const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

const getMediaById = async (req, res) => {
  console.log(req.params);
  const result = await fetchMediaById(req.params.id); 
  // "error handling" for different scenarios 
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({error: 'Not Found', media_id: req.params.id});
  }
};

const postMedia = (req, res) => {
  console.log('uploaded file', req.file);
  console.log('uploaded form data', req.body);
  const {title, description, user_id} = req.body;
  const {filename, mimetype, size} = req.file;
  const newId = mediaItems[0].media_id + 1;
  if (filename && title && user_id) {
    mediaItems.unshift({
      media_id: newId,
      filename,
      title,
      description,
      user_id,
      media_type: mimetype,
      filesize: size
    });
    res.status(201);
    res.json({message: 'New media item added.', media_id: newId});
  } else {
    res.sendStatus(400);
  }
};

const putMedia = (req, res) => {
  // placeholder
  res.sendStatus(200);
};

const deleteMedia = (req, res) => {
  // placeholder
  res.sendStatus(200);
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};
