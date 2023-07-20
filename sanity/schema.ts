import { type SchemaTypeDefinition } from 'sanity'
import product from './lib/schemas/product'
import banner from './lib/schemas/banner'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,banner],
}
