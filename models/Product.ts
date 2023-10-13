import mongoose from 'mongoose'
const imageSchema = new mongoose.Schema(
  {
    ImageUrl: { type: String },
  },
  { _id: false }
)

const specificationSchema = new mongoose.Schema(
  {
    ActualMetalWeight: String,
    CoinWeight: String,
    Diameter: String,
    Thickness: String,
    EdgeDesign: String,
    Series: String,
    Fineness: String,
    IraApproved: String,
  },
  { _id: false }
)

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  ProductName: String,
  Metal: String,
  mainImages: {
    obverse: { type: String, default: null },
    reverse: { type: String, default: null },
  },
  additionalImages: [imageSchema],
  specification: [specificationSchema],
  slug: { type: String, required: true, unique: true },
  category: { id: String, name: String },
  isFeatured: { type: Boolean, default: false },
  description: String,
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
