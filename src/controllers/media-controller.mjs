import {validationResult} from "express-validator";
import {addMedia, fetchAllMedia, fetchMediaById} from "../models/media-model.mjs";

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

const postMedia = async (req, res) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  if (!req.file) {
    return res.status(400).json({message: 'file missing or invalid'});
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log(errors.array())
    return res.status(400).json({message: 'invalid input fields'});
  }
  const {title, description} = req.body;
  const {filename, mimetype, size} = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  // TODO: add error handling when database error occurs
  const newMedia = {title, description, user_id, filename, mimetype, size};
  const result = await addMedia(newMedia);
  res.status(201);
  res.json({message: 'New media item added.', ...result});
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
