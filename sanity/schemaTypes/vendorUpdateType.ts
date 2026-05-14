import {EarthGlobeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * AI-enriched vendor news ingested by the content-automation service.
 * `sourceId` is a stable hash of the canonical URL — used for duplicate detection.
 */
export const vendorUpdateType = defineType({
  name: 'vendorUpdate',
  title: 'Vendor update',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'sourceId',
      title: 'Source ID (hash)',
      type: 'string',
      description: 'SHA-256 of normalized source URL. Set by automation; do not edit manually.',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vendor',
      title: 'Vendor',
      type: 'string',
      options: {
        list: [
          {title: 'Microsoft', value: 'microsoft'},
          {title: 'AWS', value: 'aws'},
          {title: 'Dell', value: 'dell'},
          {title: 'NVIDIA', value: 'nvidia'},
          {title: 'Cisco', value: 'cisco'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'businessImpact',
      title: 'Business impact',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'High-level bucket from AI (e.g. Security, Cloud, Hardware).',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Optional richer body; automation may mirror summary here.',
    }),
    defineField({
      name: 'rawRssTitle',
      title: 'Original RSS title',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {title: 'title', vendor: 'vendor'},
    prepare({title, vendor}) {
      return {
        title: title ?? 'Untitled',
        subtitle: vendor ? String(vendor).toUpperCase() : '',
      }
    },
  },
})
