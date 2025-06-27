// Main export
export { default as JsonSchemaViewer } from './JsonSchemaViewer';
export { default } from './JsonSchemaViewer';

// Export types for TypeScript users
export type { JsonSchemaProperty, SchemaNodeProps } from './JsonSchemaViewer';

// Re-export shadcn/ui components that users might need
export { Badge } from './components/ui/badge';
export { Card, CardContent } from './components/ui/card';
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible';
