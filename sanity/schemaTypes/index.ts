import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {blogPostType} from './blogPostType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {vendorUpdateType} from './vendorUpdateType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, blogPostType, authorType, vendorUpdateType],
}
