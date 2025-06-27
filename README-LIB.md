# React JSON Schema Viewer

A beautiful, interactive React component for visualizing JSON Schema as a tree structure using shadcn/ui components.

## Features

- 🌳 **Tree Structure**: Hierarchical visualization of JSON Schema
- 🎨 **Beautiful UI**: Built with shadcn/ui components and Tailwind CSS
- 🔧 **Interactive**: Expandable/collapsible nodes with click-to-expand details
- 📱 **Responsive**: Works great on all screen sizes
- 🚀 **TypeScript**: Full TypeScript support with exported types
- 🎯 **JSON Schema Support**: Handles $ref, definitions, anyOf, oneOf, allOf, and more

## Installation

### Local Development

```bash
# Clone and link locally
cd react-json-schema-viewer
npm install
npm run build-lib
npm link

# In your project
npm link react-json-schema-viewer
```

## Usage

```tsx
import { JsonSchemaViewer } from 'react-json-schema-viewer';

const schema = {
  type: 'object',
  title: 'User',
  description: 'A user object',
  properties: {
    name: { 
      type: 'string',
      description: 'User name'
    },
    age: { 
      type: 'integer',
      description: 'User age'
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User email address'
    }
  },
  required: ['name', 'email']
};

function App() {
  return (
    <div>
      <h1>My Schema</h1>
      <JsonSchemaViewer schema={schema} />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `schema` | `JsonSchemaProperty` | Yes | The JSON Schema object to visualize |

## Supported JSON Schema Features

- ✅ Basic types (`string`, `number`, `integer`, `boolean`, `array`, `object`, `null`)
- ✅ Object properties with nested schemas
- ✅ Array items
- ✅ Required properties (marked with `*`)
- ✅ Descriptions
- ✅ Formats (`email`, `date-time`, etc.)
- ✅ Enums with expandable value lists
- ✅ Constants with expandable values
- ✅ Examples with expandable value lists
- ✅ Default values with expandable display
- ✅ Schema references (`$ref`) with resolution
- ✅ Schema composition (`anyOf`, `oneOf`, `allOf`)
- ✅ Property constraints (`readOnly`, `writeOnly`, `deprecated`)
- ✅ Additional properties control

## TypeScript Support

The library exports TypeScript definitions:

```tsx
import { JsonSchemaViewer, JsonSchemaProperty } from 'react-json-schema-viewer';

const schema: JsonSchemaProperty = {
  // your schema here
};
```

## Dependencies

This library requires the following peer dependencies:

- `react >= 18.0.0`
- `react-dom >= 18.0.0`

The following dependencies are bundled:

- `@radix-ui/react-collapsible`
- `@radix-ui/react-slot`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `tailwind-merge`

## Styling

The component uses Tailwind CSS classes. Make sure your project has Tailwind CSS configured, or the styling won't work properly.

## License

MIT
