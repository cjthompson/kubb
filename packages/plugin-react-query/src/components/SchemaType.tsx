import { useOperation } from '@kubb/plugin-oas/hooks'
import { Type } from '@kubb/react'

import type { ReactNode } from 'react'
import type { PluginReactQuery } from '../types.ts'
import type { OperationSchemas } from '@kubb/plugin-oas'

type Props = {
  typeName: string
  typedSchemas: OperationSchemas
  options: PluginReactQuery['resolvedOptions']
}

export function SchemaType({ typeName, typedSchemas, options }: Props): ReactNode {
  const operation = useOperation()

  const [TData, TError, TRequest, TPathParams, TQueryParams, THeaderParams, TResponse] = [
    typedSchemas.response.name,
    typedSchemas.errors?.map((item) => item.name).join(' | ') || 'never',
    typedSchemas.request?.name || 'never',
    typedSchemas.pathParams?.name || 'never',
    typedSchemas.queryParams?.name || 'never',
    typedSchemas.headerParams?.name || 'never',
    typedSchemas.response.name,
  ]

  const clientType = `${typeName}Client`
  const isFormData = operation.getContentType() === 'multipart/form-data'

  return (
    <>
      <Type name={clientType}>{`typeof client<${TResponse}, ${TError}, ${isFormData ? 'FormData' : TRequest}>`}</Type>
      <Type name={typeName}>
        {`
        {
          data: ${TData}
          error: ${TError}
          request: ${isFormData ? 'FormData' : TRequest}
          pathParams: ${TPathParams}
          queryParams: ${TQueryParams}
          headerParams: ${THeaderParams}
          response: ${options.dataReturnType === 'data' ? TData : `Awaited<ReturnType<${clientType}>>`}
          client: {
            parameters: Partial<Parameters<${clientType}>[0]>
            return: Awaited<ReturnType<${clientType}>>
          }
        }
        `}
      </Type>
    </>
  )
}