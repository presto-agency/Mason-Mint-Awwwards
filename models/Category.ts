import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
  },
  { _id: false }
)

const categorySchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  products: [productSchema],
})

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
