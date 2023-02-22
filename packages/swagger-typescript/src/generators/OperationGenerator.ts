import { capitalCase } from 'change-case'

import type { File, FileManager, PathMode } from '@kubb/core'
import { getRelativePath, Generator } from '@kubb/core'

import { TypeBuilder } from '../builders'

import type { FileResolver } from './TypeGenerator'
import type { Operation } from 'oas'
import type { MediaTypeObject, RequestBodyObject } from 'oas/dist/rmoas.types'
import type Oas from 'oas'
import type { OpenAPIV3 } from 'openapi-types'
import type { Api } from '../types'

type Options = {
  oas: Oas
  resolveId: Api['resolveId']
  mode: PathMode
  fileManager: FileManager
  nameResolver: (name: string) => string
  directory: string
}

export class OperationGenerator extends Generator<Options> {
  private getSchemas(operation: Operation) {
    // TODO create function to get schema out of paramaters
    const schemaOperationPathParams = operation.getParameters().filter((v) => v.in === 'path')
    const schemaOperationPathParamsSchema = schemaOperationPathParams.reduce(
      (schema, pathParameters) => {
        return {
          ...schema,
          required: [...schema.required!, pathParameters.required ? pathParameters.name : undefined].filter(Boolean) as string[],
          properties: {
            ...schema.properties,
            [pathParameters.name]: pathParameters.schema as OpenAPIV3.SchemaObject,
          },
        }
      },
      { type: 'object', required: [], properties: {} } as OpenAPIV3.SchemaObject
    )

    const schemaOperationQueryParams = operation.getParameters().filter((v) => v.in === 'query')
    const schemaOperationQueryParamsSchema = schemaOperationQueryParams.reduce(
      (schema, pathParameters) => {
        return {
          ...schema,
          required: [...schema.required!, pathParameters.required ? pathParameters.name : undefined].filter(Boolean) as string[],
          properties: {
            ...schema.properties,
            [pathParameters.name]: pathParameters.schema as OpenAPIV3.SchemaObject,
          },
        }
      },
      { type: 'object', required: [], properties: {} } as OpenAPIV3.SchemaObject
    )

    const data = {
      pathParams: operation.hasParameters()
        ? {
            name: capitalCase(`${operation.getOperationId()} "PathParams"`, { delimiter: '' }),
            schema: schemaOperationPathParamsSchema,
          }
        : undefined,
      queryParams: operation.hasParameters()
        ? {
            name: capitalCase(`${operation.getOperationId()} "QueryParams"`, { delimiter: '' }),
            schema: schemaOperationQueryParamsSchema,
          }
        : undefined,
      request: {
        name: capitalCase(`${operation.getOperationId()} "Request"`, { delimiter: '' }),
        description: (operation.schema.requestBody as RequestBodyObject)?.description,
        schema: (operation.getRequestBody('application/json') as MediaTypeObject)?.schema as OpenAPIV3.SchemaObject,
      },
      response: {
        name: capitalCase(`${operation.getOperationId()} "Response"`, { delimiter: '' }),
        description: operation.getResponseAsJSONSchema('200')?.at(0)?.description,
        schema: operation.getResponseAsJSONSchema('200')?.at(0)?.schema as OpenAPIV3.SchemaObject,
      },
    } as const
    return data
  }

  async getGet(path: string) {
    const { resolveId, directory, mode, nameResolver, oas } = this.options

    const operation = oas.operation(path, 'get')

    if (!operation.schema.operationId) return null

    const schemas = this.getSchemas(operation)
    const typeName = `${nameResolver(operation.getOperationId())}.ts`
    const typeFilePath = await resolveId(typeName, directory)

    const fileResolver: FileResolver = async (name) => {
      // Used when a react-query type(request, response, params) has an import of a global type
      const filePath = await resolveId(mode === 'file' ? '' : typeName, directory)
      // refs import, will always been created with the swaggerTypescript plugin, our global type
      const resolvedTypeId = await resolveId(`${name}.ts`, directory)

      return getRelativePath(filePath, resolvedTypeId)
    }

    const typeSource = await new TypeBuilder(oas)
      .add(schemas.pathParams)
      .add(schemas.queryParams)
      .add(schemas.response)
      .configure({ fileResolver, withJSDocs: true })
      .print()

    if (typeFilePath) {
      return {
        path: typeFilePath,
        fileName: typeName,
        source: typeSource,
      }
    }

    return null
  }

  async getPost(path: string) {
    const { resolveId, directory, mode, nameResolver, oas } = this.options

    const operation = oas.operation(path, 'post')

    if (!operation.schema.operationId) return null

    const schemas = this.getSchemas(operation)
    const typeName = `${nameResolver(operation.getOperationId())}.ts`
    const typeFilePath = await resolveId(typeName, directory)

    const fileResolver: FileResolver = async (name) => {
      // Used when a react-query type(request, response, params) has an import of a global type
      const filePath = await resolveId(mode === 'file' ? '' : typeName, directory)
      // refs import, will always been created with the swaggerTypescript plugin, our global type
      const resolvedTypeId = await resolveId(`${name}.ts`, directory)

      return getRelativePath(filePath, resolvedTypeId)
    }

    const typeSource = await new TypeBuilder(oas)
      .add(schemas.pathParams)
      .add(schemas.queryParams)
      .add(schemas.request)
      .add(schemas.response)
      .configure({ fileResolver, withJSDocs: true })
      .print()

    if (typeFilePath) {
      return {
        path: typeFilePath,
        fileName: typeName,
        source: typeSource,
      }
    }

    return null
  }

  async getPut(path: string) {
    const { resolveId, directory, mode, nameResolver, oas } = this.options

    const operation = oas.operation(path, 'put')

    if (!operation.schema.operationId) return null

    const schemas = this.getSchemas(operation)
    const typeName = `${nameResolver(operation.getOperationId())}.ts`
    const typeFilePath = await resolveId(typeName, directory)

    const fileResolver: FileResolver = async (name) => {
      // Used when a react-query type(request, response, params) has an import of a global type
      const filePath = await resolveId(mode === 'file' ? '' : typeName, directory)
      // refs import, will always been created with the swaggerTypescript plugin, our global type
      const resolvedTypeId = await resolveId(`${name}.ts`, directory)

      return getRelativePath(filePath, resolvedTypeId)
    }

    const typeSource = await new TypeBuilder(oas)
      .add(schemas.pathParams)
      .add(schemas.queryParams)
      .add(schemas.request)
      .add(schemas.response)
      .configure({ fileResolver, withJSDocs: true })
      .print()

    if (typeFilePath) {
      return {
        path: typeFilePath,
        fileName: typeName,
        source: typeSource,
      }
    }

    return null
  }

  async getDelete(path: string) {
    const { resolveId, directory, mode, nameResolver, oas } = this.options

    const operation = oas.operation(path, 'delete')

    if (!operation.schema.operationId) return null

    const schemas = this.getSchemas(operation)
    const typeName = `${nameResolver(operation.getOperationId())}.ts`
    const typeFilePath = await resolveId(typeName, directory)

    const fileResolver: FileResolver = async (name) => {
      // Used when a react-query type(request, response, params) has an import of a global type
      const filePath = await resolveId(mode === 'file' ? '' : typeName, directory)
      // refs import, will always been created with the swaggerTypescript plugin, our global type
      const resolvedTypeId = await resolveId(`${name}.ts`, directory)

      return getRelativePath(filePath, resolvedTypeId)
    }

    const typeSource = await new TypeBuilder(oas)
      .add(schemas.pathParams)
      .add(schemas.request)
      .add(schemas.response)
      .configure({ fileResolver, withJSDocs: true })
      .print()

    if (typeFilePath) {
      return {
        path: typeFilePath,
        fileName: typeName,
        source: typeSource,
      }
    }

    return null
  }

  async build() {
    const { oas, fileManager } = this.options
    const paths = oas.getPaths()
    const promises: Promise<File | null>[] = []
    const filePromises: Promise<File>[] = []

    Object.keys(paths).forEach((path) => {
      promises.push(this.getGet(path))
      promises.push(this.getPost(path))
      promises.push(this.getPut(path))
      promises.push(this.getDelete(path))
    })

    const files = await Promise.all(promises).then((files) => {
      return fileManager.combine(files)
    })

    files.forEach((file) => {
      filePromises.push(fileManager.addOrAppend(file))
    })
    return Promise.all(filePromises)
  }
}