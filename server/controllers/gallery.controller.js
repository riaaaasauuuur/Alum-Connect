import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Gallery, GalleryPhotos } = Model.getDb();

export default class GalleryController extends BaseController {
  constructor() {
    super(Gallery);
  }

  async create(req) {
    try {
      
      let data =  req.body;
      let gallery = await this.model.create(data);

      let photos = [];
      data.photos.forEach(photo => {
        photos.push({
          image: photo,
          galleryId: gallery._id
        })
      });
      await GalleryPhotos.insertMany(photos);
      
      return this.createResponse(data);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async updatePhotos(req) {
    try {
      
      let data = req.body;

      const updatedGallery = await this.model.findByIdAndUpdate(data._id, data, { includes: "photos" });
      let galleryPhotoArr = [];

      let galleryPhoto = await (new GalleryPhotos).find({
        galleryId: updatedGallery._id
      }).exec();

      if(galleryPhoto.rows && galleryPhoto.rows.length) {
        const ids = galleryPhoto.rows.map(x => x._id);
        await (new GalleryPhotos).destroy({ _id: { $in: ids } });
      }
      data.photos.forEach(y => {
        galleryPhotoArr.push({
          image: { ...y },
          galleryId: updatedGallery._id
        })
      });
      await GalleryPhotos.insertMany(galleryPhotoArr);


      return this.createResponse(data);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

}
