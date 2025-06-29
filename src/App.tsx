import JsonSchemaViewer from './JsonSchemaViewer'
import './App.css'

// 테스트용 간단한 JSON Schema
const sampleSchema = {
  "type": "object",
  "properties": {
    "targets": {
      "type": "array",
      "items": {
        "type": "number"
      }
    }
  },
  "required": ["targets"],
  "additionalProperties": false
}


function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          JSON Schema Tree Viewer
        </h1>
        <JsonSchemaViewer schema={sampleSchema} />
      </div>
    </div>
  )
}

export default App
