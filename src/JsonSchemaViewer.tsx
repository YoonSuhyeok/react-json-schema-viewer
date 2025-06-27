
function JsonSchemaViewer({ schema }: { schema: any }) {
  return (
    <div className="json-schema-viewer">
      <pre>{JSON.stringify(schema, null, 2)}</pre>
    </div>
  );
}

export default JsonSchemaViewer;