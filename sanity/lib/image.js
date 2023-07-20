import createImageUrlBuilder from '@sanity/image-url'

const imageBuilder = createImageUrlBuilder({
  projectId: "a509gpor",
  dataset: "ecommerce-dataset",
})

export const urlForImage = (source) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
