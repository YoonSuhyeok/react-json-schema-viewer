import JsonSchemaViewer from './JsonSchemaViewer'
import './App.css'

// 테스트용 간단한 JSON Schema
const sampleSchema = {
  type: "object",
  title: "User Profile",
  description: "A simple user profile schema",
  properties: {
    name: {
      type: "string",
      description: "The user's full name"
    },
    age: {
      type: "integer",
      description: "The user's age in years"
    },
    email: {
      type: "string",
      description: "The user's email address"
    },
    isActive: {
      type: "boolean",
      description: "Whether the user account is active"
    },
    address: {
      type: "object",
      description: "The user's address information",
      properties: {
        street: {
          type: "string",
          description: "Street address"
        },
        city: {
          type: "string",
          description: "City name"
        },
        zipCode: {
          type: "string",
          description: "Postal code"
        }
      },
      required: ["street", "city"]
    },
    hobbies: {
      type: "array",
      description: "List of user's hobbies",
      items: {
        type: "string",
        description: "A hobby"
      }
    }
  },
  required: ["name", "email"]
};

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
