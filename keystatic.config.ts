import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local'
  },
  ui: {
    brand: {
      name: 'Figma MCP Prompts',
    },
  },
  collections: {
    prompts: collection({
      label: 'Prompts',
      slugField: 'title',
      path: 'content/prompts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Auto Populate', value: 'auto-populate' },
            { label: 'Annotation', value: 'annotation' },
            { label: 'Overrides', value: 'overrides' },
            { label: 'Connectors', value: 'connectors' },
            { label: 'Vibe Design', value: 'vibe-design' },
          ],
          defaultValue: 'vibe-design',
        }),
        language: fields.select({
          label: 'Language',
          options: [
            { label: 'English', value: 'English' },
            { label: '한국어', value: '한국어' },
            { label: '中文', value: '中文' },
          ],
          defaultValue: 'English',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags (Optional)',
            description: 'For search and filtering',
            itemLabel: props => props.value,
          }
        ),
        content: fields.mdx({
          label: 'Content',
          description: 'Full content including prompt and how-to sections (use # Prompt and # How to Use headers)',
        }),
      },
    }),
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'content/categories/*',
      schema: {
        name: fields.slug({ name: { label: 'Category Name' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        icon: fields.text({
          label: 'Icon',
          description: 'Emoji (e.g., 🎨, 📝, 🔧)',
        }),
      },
    }),
  },
}); 