import { definePlugin } from '../plugin.ts'
import { OperationGenerator } from './OperationGenerator.ts'

import type { File } from '@kubb/core'
import type { Oas, Operation, Resolver } from '../types.ts'

class DummyOperationGenerator extends OperationGenerator {
  resolve(operation: Operation): Resolver {
    return {
      fileName: 'fileName.ts',
      filePath: 'models/fileName/ts',
      name: 'fileName',
    }
  }

  all(): Promise<File | null> {
    return Promise.resolve(null)
  }

  get(operation: Operation): Promise<File | null> {
    return new Promise((resolve) => {
      resolve(null)
    })
  }

  post(operation: Operation): Promise<File | null> {
    return new Promise((resolve) => {
      resolve(null)
    })
  }

  put(operation: Operation): Promise<File | null> {
    return new Promise((resolve) => {
      resolve(null)
    })
  }

  delete(operation: Operation): Promise<File | null> {
    return new Promise((resolve) => {
      resolve(null)
    })
  }

  build(): Promise<File[]> {
    return new Promise((resolve) => {
      resolve([] as File[])
    })
  }
}

const swaggerApi = definePlugin({}).api

describe('abstract class OperationGenerator', () => {
  test('if pathParams return undefined when there are no params in path', async () => {
    const oas = (await swaggerApi?.getOas({
      root: './',
      output: { path: 'test', clean: true },
      input: { path: 'packages/swagger/mocks/petStore.yaml' },
    })) as Oas

    const og = new DummyOperationGenerator({ oas })

    expect(og.getSchemas(oas.operation('/pets', 'get')).pathParams).toBeUndefined()
    expect(og.getSchemas(oas.operation('/pets', 'get')).queryParams).toBeDefined()
  })
})
