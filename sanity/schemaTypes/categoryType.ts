import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'Used on the blog category grid.',
      type: 'string',
      options: {
        list: [
          {title: 'Server / AI', value: 'server'},
          {title: 'Shield', value: 'shield'},
          {title: 'Cloud', value: 'cloud'},
          {title: 'Network', value: 'network'},
          {title: 'Data center', value: 'datacenter'},
          {title: 'Enterprise', value: 'enterprise'},
          {title: 'Procurement', value: 'cart'},
          {title: 'Automation', value: 'rocket'},
        ],
      },
    }),
  ],
})
