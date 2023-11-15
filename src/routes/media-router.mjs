import express from 'express';
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from '../controllers/media-controller.mjs';

const mediaRouter = express.Router();

mediaRouter.route('/')
    .get(getMedia)
    .post(postMedia)
mediaRouter.route('/:id')
    .get(getMediaById)
    .put(putMedia)
    .delete(deleteMedia);

export default mediaRouter;
