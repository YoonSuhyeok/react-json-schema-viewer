
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface JsonSchemaProperty {
  type?: string | string[];
  properties?: Record<string, JsonSchemaProperty>;
  items?: JsonSchemaProperty | JsonSchemaProperty[];
  required?: string[];
  description?: string;
  title?: string;
  enum?: any[];
  default?: any;
  $ref?: string;
  $schema?: string;
  definitions?: Record<string, JsonSchemaProperty>;
  additionalProperties?: boolean | JsonSchemaProperty;
  // 추가 JSON Schema 속성들
  anyOf?: JsonSchemaProperty[];
  oneOf?: JsonSchemaProperty[];
  allOf?: JsonSchemaProperty[];
  not?: JsonSchemaProperty;
  format?: string;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  multipleOf?: number;
  uniqueItems?: boolean;
  const?: any;
  examples?: any[];
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
  contentMediaType?: string;
  patternProperties?: Record<string, JsonSchemaProperty>;
  xml?: any;
  example?: any;
  [key: string]: any; // 추가적인 속성들을 허용
}

interface SchemaNodeProps {
  name: string;
  schema: JsonSchemaProperty;
  isRequired?: boolean;
  level?: number;
  rootSchema?: JsonSchemaProperty; // 전체 스키마 참조를 위해 추가
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    object: 'bg-blue-100 text-blue-800',
    array: 'bg-green-100 text-green-800', 
    string: 'bg-yellow-100 text-yellow-800',
    number: 'bg-purple-100 text-purple-800',
    integer: 'bg-purple-100 text-purple-800',
    boolean: 'bg-red-100 text-red-800',
    null: 'bg-gray-100 text-gray-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

// $ref를 해결하는 함수
function resolveRef(ref: string, rootSchema: JsonSchemaProperty): JsonSchemaProperty | null {
  if (!ref.startsWith('#/')) {
    return null; // 외부 참조는 지원하지 않음
  }
  
  const path = ref.slice(2).split('/'); // '#/' 제거하고 경로 분할
  let current: any = rootSchema;
  
  for (const segment of path) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment];
    } else {
      return null;
    }
  }
  
  return current as JsonSchemaProperty;
}

function SchemaNode({ name, schema, isRequired = false, level = 0, rootSchema }: SchemaNodeProps) {
  const [isOpen, setIsOpen] = useState(level < 2); // 처음 2레벨까지만 열어둠
  const [showConstDetails, setShowConstDetails] = useState(false);
  const [showEnumDetails, setShowEnumDetails] = useState(false);
  const [showExamplesDetails, setShowExamplesDetails] = useState(false);
  const [showDefaultDetails, setShowDefaultDetails] = useState(false);
  
  // $ref가 있으면 참조된 스키마로 교체
  let resolvedSchema = schema;
  if (schema.$ref && rootSchema) {
    const resolved = resolveRef(schema.$ref, rootSchema);
    if (resolved) {
      resolvedSchema = resolved;
    }
  }
  
  const type = Array.isArray(resolvedSchema.type) ? resolvedSchema.type.join(' | ') : resolvedSchema.type || 'unknown';
  const hasChildren = resolvedSchema.properties || resolvedSchema.items || resolvedSchema.anyOf || resolvedSchema.oneOf || resolvedSchema.allOf;

  return (
    <div className="border-l border-gray-200" style={{ marginLeft: `${level * 15}px` }}>
      <div className="flex items-start gap-2 p-2 hover:bg-gray-50">
        {hasChildren && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center gap-1 mt-0.5">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </CollapsibleTrigger>
          </Collapsible>
        )}
        
        {!hasChildren && <div className="w-5" />}
        
        <div className="flex-1 min-w-0">
          {/* 기본 정보 */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-medium text-gray-900">
              {name}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </span>
            
            <Badge variant="secondary" className={`text-xs ${getTypeColor(type.split(' | ')[0])}`}>
              {type}
            </Badge>
            
            {schema.$ref && (
              <Badge variant="outline" className="text-xs">
                ref: {schema.$ref.length > 25 ? `${schema.$ref.substring(0, 25)}...` : schema.$ref}
              </Badge>
            )}
            
            {resolvedSchema.format && (
              <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700">
                {resolvedSchema.format}
              </Badge>
            )}
          </div>

          {/* 속성 badges */}
          <div className="flex items-center gap-1 flex-wrap mb-2">
            {resolvedSchema.readOnly && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                read-only
              </Badge>
            )}
            
            {resolvedSchema.writeOnly && (
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                write-only
              </Badge>
            )}
            
            {resolvedSchema.deprecated && (
              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                deprecated
              </Badge>
            )}
            
            {resolvedSchema.additionalProperties === false && (
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                no additional
              </Badge>
            )}
          </div>
          
          {/* 설명 */}
          {resolvedSchema.description && (
            <p className="text-sm text-gray-500 mb-2 break-words">
              {resolvedSchema.description}
            </p>
          )}
          
          {/* 확장 가능한 정보들 */}
          <div className="space-y-2">
            {resolvedSchema.const !== undefined && (
              <div>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-green-50 text-green-700 cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => setShowConstDetails(!showConstDetails)}
                >
                  const {showConstDetails ? '▼' : '▶'}
                </Badge>
                {showConstDetails && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                    <div className="font-semibold text-sm mb-2 text-gray-700">Constant value:</div>
                    <div className="px-3 py-2 bg-white rounded border text-sm text-gray-800 break-all font-mono">
                      {typeof resolvedSchema.const === 'string' 
                        ? `"${resolvedSchema.const}"` 
                        : JSON.stringify(resolvedSchema.const, null, 2)
                      }
                    </div>
                  </div>
                )}
              </div>
            )}

            {resolvedSchema.enum && (
              <div>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-yellow-50 text-yellow-700 cursor-pointer hover:bg-yellow-100 transition-colors"
                  onClick={() => setShowEnumDetails(!showEnumDetails)}
                >
                  enum ({resolvedSchema.enum.length}) {showEnumDetails ? '▼' : '▶'}
                </Badge>
                {showEnumDetails && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                    <div className="font-semibold text-sm mb-2 text-gray-700">Allowed values:</div>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {resolvedSchema.enum.map((value, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-white rounded border text-sm text-gray-800 font-mono"
                        >
                          {typeof value === 'string' ? `"${value}"` : JSON.stringify(value)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {resolvedSchema.examples && resolvedSchema.examples.length > 0 && (
              <div>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => setShowExamplesDetails(!showExamplesDetails)}
                >
                  examples ({resolvedSchema.examples.length}) {showExamplesDetails ? '▼' : '▶'}
                </Badge>
                {showExamplesDetails && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                    <div className="font-semibold text-sm mb-2 text-gray-700">Example values:</div>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {resolvedSchema.examples.slice(0, 10).map((value, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-white rounded border text-sm text-gray-800 font-mono break-all"
                        >
                          {typeof value === 'string' ? `"${value}"` : JSON.stringify(value)}
                        </span>
                      ))}
                      {resolvedSchema.examples.length > 10 && (
                        <span className="text-sm text-gray-500 italic">
                          ... and {resolvedSchema.examples.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {resolvedSchema.default !== undefined && (
              <div>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-purple-50 text-purple-700 cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => setShowDefaultDetails(!showDefaultDetails)}
                >
                  default {showDefaultDetails ? '▼' : '▶'}
                </Badge>
                {showDefaultDetails && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                    <div className="font-semibold text-sm mb-2 text-gray-700">Default value:</div>
                    <div className="px-3 py-2 bg-white rounded border text-sm text-gray-800 break-all font-mono">
                      {typeof resolvedSchema.default === 'string' 
                        ? `"${resolvedSchema.default}"` 
                        : JSON.stringify(resolvedSchema.default, null, 2)
                      }
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {hasChildren && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            {/* Object properties */}
            {resolvedSchema.properties && Object.entries(resolvedSchema.properties).map(([propName, propSchema]) => (
              <SchemaNode
                key={propName}
                name={propName}
                schema={propSchema}
                isRequired={resolvedSchema.required?.includes(propName)}
                level={level + 1}
                rootSchema={rootSchema}
              />
            ))}
            
            {/* Array items */}
            {resolvedSchema.items && !Array.isArray(resolvedSchema.items) && (
              <SchemaNode
                name="items"
                schema={resolvedSchema.items}
                level={level + 1}
                rootSchema={rootSchema}
              />
            )}
            
            {/* anyOf */}
            {resolvedSchema.anyOf && resolvedSchema.anyOf.map((subSchema, index) => (
              <SchemaNode
                key={`anyOf-${index}`}
                name={`anyOf[${index}]`}
                schema={subSchema}
                level={level + 1}
                rootSchema={rootSchema}
              />
            ))}
            
            {/* oneOf */}
            {resolvedSchema.oneOf && resolvedSchema.oneOf.map((subSchema, index) => (
              <SchemaNode
                key={`oneOf-${index}`}
                name={`oneOf[${index}]`}
                schema={subSchema}
                level={level + 1}
                rootSchema={rootSchema}
              />
            ))}
            
            {/* allOf */}
            {resolvedSchema.allOf && resolvedSchema.allOf.map((subSchema, index) => (
              <SchemaNode
                key={`allOf-${index}`}
                name={`allOf[${index}]`}
                schema={subSchema}
                level={level + 1}
                rootSchema={rootSchema}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

function JsonSchemaViewer({ schema }: { schema: JsonSchemaProperty }) {
  // 루트 스키마가 $ref를 가지고 있으면 해결
  let rootSchema = schema;
  let displaySchema = schema;
  
  if (schema.$ref && schema.definitions) {
    const resolved = resolveRef(schema.$ref, schema);
    if (resolved) {
      displaySchema = resolved;
      rootSchema = schema; // 원본 스키마를 rootSchema로 유지
    }
  }
  
  const rootTitle = displaySchema.title || schema.$ref?.split('/').pop() || 'Root Schema';
  
  return (
    <Card className="w-full max-w-none border-0 shadow-none">
      <CardContent className="pt-6 px-0">
        <div className="space-y-1">
          <SchemaNode
            name={rootTitle}
            schema={displaySchema}
            level={0}
            rootSchema={rootSchema}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default JsonSchemaViewer;