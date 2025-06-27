import type { Meta, StoryObj } from '@storybook/react-vite';
import JsonSchemaViewer from '../JsonSchemaViewer';

// Root level fixtures
import defaultSchema from '../__fixtures__/default-schema.json';
import formatsSchema from '../__fixtures__/formats-schema.json';
import ticketsSchema from '../__fixtures__/tickets.schema.json';

// Arrays fixtures
import arrayOfObjects from '../__fixtures__/arrays/of-objects.json';
import arrayOfComplexObjects from '../__fixtures__/arrays/of-complex-objects.json';
import arrayOfArrays from '../__fixtures__/arrays/of-arrays.json';
import arrayOfAllofs from '../__fixtures__/arrays/of-allofs.json';
import arrayOfRefs from '../__fixtures__/arrays/of-refs.json';
import arrayWithOrderedItems from '../__fixtures__/arrays/with-ordered-items.json';
import arrayWithSingleArrayishItems from '../__fixtures__/arrays/with-single-arrayish-items.json';
import arrayWithMultipleArrayishItems from '../__fixtures__/arrays/with-multiple-arrayish-items.json';

// References fixtures
import referencesBase from '../__fixtures__/references/base.json';
import referencesNested from '../__fixtures__/references/nested.json';
import referencesNullish from '../__fixtures__/references/nullish.json';
import referencesAllOfReference from '../__fixtures__/references/allOfReference.json';
import referencesFullAllOfReference from '../__fixtures__/references/fullAllOfReference.json';

// Combiners fixtures
import combinersAnyOf from '../__fixtures__/combiners/anyOf.json';
import combinersOneofWithArrayType from '../__fixtures__/combiners/oneof-with-array-type.json';
import combinersOneofWithMultiTypes from '../__fixtures__/combiners/oneof-with-multi-types.json';
import combinersOneofWithAllofChildren from '../__fixtures__/combiners/oneof-with-allof-children.json';
import combinersOneofWithinArrayItem from '../__fixtures__/combiners/oneof-within-array-item.json';

// AllOfs fixtures
import allOfsBase from '../__fixtures__/combiners/allOfs/base.json';
import allOfsComplex from '../__fixtures__/combiners/allOfs/complex.json';
import allOfsTodoFull from '../__fixtures__/combiners/allOfs/todo-full.json';
import allOfsTodoFull2 from '../__fixtures__/combiners/allOfs/todo-full-2.json';
import allOfsWithType from '../__fixtures__/combiners/allOfs/with-type.json';

// Real-world fixtures
import realWorldGithubIssue from '../__fixtures__/real-world/github-issue.json';
import realWorldBoxFile from '../__fixtures__/real-world/box-file.json';

// Extensions fixtures
import extensionsSimple from '../__fixtures__/extensions/simple.json';

// Diff fixtures
import diffSimpleExample from '../__fixtures__/diff/simple-example.json';
import diffRootRef from '../__fixtures__/diff/root-ref.json';

const meta = {
  title: 'Example/JsonSchemaViewer',
  component: JsonSchemaViewer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof JsonSchemaViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========== 기본 예제들 ==========
export const Simple: Story = {
  args: {
    schema: {
      type: 'object',
      title: 'Simple User',
      description: 'A simple user object',
      properties: {
        name: { 
          type: 'string',
          description: 'User name'
        },
        age: { 
          type: 'integer',
          description: 'User age'
        },
      },
      required: ['name'],
    }
  }
};

export const Complex: Story = {
  args: {
    schema: {
      type: 'object',
      title: 'User Profile',
      description: 'A comprehensive user profile schema',
      properties: {
        name: {
          type: 'string',
          description: 'The user\'s full name'
        },
        age: {
          type: 'integer',
          description: 'The user\'s age in years'
        },
        email: {
          type: 'string',
          description: 'The user\'s email address'
        },
        isActive: {
          type: 'boolean',
          description: 'Whether the user account is active'
        },
        address: {
          type: 'object',
          description: 'The user\'s address information',
          properties: {
            street: {
              type: 'string',
              description: 'Street address'
            },
            city: {
              type: 'string',
              description: 'City name'
            },
            zipCode: {
              type: 'string',
              description: 'Postal code'
            },
            country: {
              type: 'string',
              description: 'Country name'
            }
          },
          required: ['street', 'city']
        },
        hobbies: {
          type: 'array',
          description: 'List of user\'s hobbies',
          items: {
            type: 'string',
            description: 'A hobby'
          }
        },
        preferences: {
          type: 'object',
          description: 'User preferences',
          properties: {
            theme: {
              type: 'string',
              description: 'UI theme preference'
            },
            notifications: {
              type: 'boolean',
              description: 'Email notifications enabled'
            }
          }
        }
      },
      required: ['name', 'email']
    }
  }
};

// ========== Root Level Fixtures ==========
export const DefaultSchema: Story = {
  args: {
    schema: defaultSchema as any
  }
};

export const FormatsSchema: Story = {
  args: {
    schema: formatsSchema as any
  }
};

export const TicketsSchema: Story = {
  args: {
    schema: ticketsSchema as any
  }
};

// ========== Arrays Examples ==========
export const ArrayOfObjects: Story = {
  args: {
    schema: arrayOfObjects
  }
};

export const ArrayOfComplexObjects: Story = {
  args: {
    schema: arrayOfComplexObjects
  }
};

export const ArrayOfArrays: Story = {
  args: {
    schema: arrayOfArrays
  }
};

export const ArrayOfAllofs: Story = {
  args: {
    schema: arrayOfAllofs as any
  }
};

export const ArrayOfRefs: Story = {
  args: {
    schema: arrayOfRefs
  }
};

export const ArrayWithOrderedItems: Story = {
  args: {
    schema: arrayWithOrderedItems
  }
};

export const ArrayWithSingleArrayishItems: Story = {
  args: {
    schema: arrayWithSingleArrayishItems
  }
};

export const ArrayWithMultipleArrayishItems: Story = {
  args: {
    schema: arrayWithMultipleArrayishItems
  }
};

// ========== References Examples ==========
export const ReferencesBase: Story = {
  args: {
    schema: referencesBase
  }
};

export const ReferencesNested: Story = {
  args: {
    schema: referencesNested
  }
};

export const ReferencesNullish: Story = {
  args: {
    schema: referencesNullish as any
  }
};

export const ReferencesAllOfReference: Story = {
  args: {
    schema: referencesAllOfReference
  }
};

export const ReferencesFullAllOfReference: Story = {
  args: {
    schema: referencesFullAllOfReference
  }
};

// ========== Combiners Examples ==========
export const CombinersAnyOf: Story = {
  args: {
    schema: combinersAnyOf as any
  }
};

export const CombinersOneofWithArrayType: Story = {
  args: {
    schema: combinersOneofWithArrayType as any
  }
};

export const CombinersOneofWithMultiTypes: Story = {
  args: {
    schema: combinersOneofWithMultiTypes
  }
};

export const CombinersOneofWithAllofChildren: Story = {
  args: {
    schema: combinersOneofWithAllofChildren as any
  }
};

export const CombinersOneofWithinArrayItem: Story = {
  args: {
    schema: combinersOneofWithinArrayItem
  }
};

// ========== AllOfs Examples ==========
export const AllOfsBase: Story = {
  args: {
    schema: allOfsBase as any
  }
};

export const AllOfsComplex: Story = {
  args: {
    schema: allOfsComplex
  }
};

export const AllOfsTodoFull: Story = {
  args: {
    schema: allOfsTodoFull as any
  }
};

export const AllOfsTodoFull2: Story = {
  args: {
    schema: allOfsTodoFull2 as any
  }
};

export const AllOfsWithType: Story = {
  args: {
    schema: allOfsWithType as any
  }
};

// ========== Real-world Examples ==========
export const RealWorldGithubIssue: Story = {
  args: {
    schema: realWorldGithubIssue
  }
};

export const RealWorldBoxFile: Story = {
  args: {
    schema: realWorldBoxFile
  }
};

// ========== Extensions Examples ==========
export const ExtensionsSimple: Story = {
  args: {
    schema: extensionsSimple
  }
};

// ========== Diff Examples ==========
export const DiffSimpleExample: Story = {
  args: {
    schema: diffSimpleExample
  }
};

export const DiffRootRef: Story = {
  args: {
    schema: diffRootRef
  }
};

// ========== Reference Example with Sum Request ==========
export const ArraySchemaWithItems: Story = {
  args: {
    schema: {
      "$ref": "#/definitions/sumRequestType",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {
        "sumRequestType": {
          "additionalProperties": false,
          "properties": {
            "targets": {
              "items": {
                "type": "number"
              },
              "type": "array"
            }
          },
          "required": [
            "targets"
          ],
          "type": "object"
        }
      }
    }
  }
};