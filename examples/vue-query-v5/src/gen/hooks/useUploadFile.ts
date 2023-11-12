import client from '@kubb/swagger-client/client'
import { useMutation } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { KubbQueryFactory } from './types'
import type { UploadFileMutationRequest, UploadFileMutationResponse, UploadFilePathParams, UploadFileQueryParams } from '../models/UploadFile'
import type { UseMutationOptions, UseMutationReturnType } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'

type UploadFile = KubbQueryFactory<
  UploadFileMutationResponse,
  never,
  UploadFileMutationRequest,
  UploadFilePathParams,
  UploadFileQueryParams,
  never,
  UploadFileMutationResponse,
  {
    dataReturnType: 'data'
    type: 'mutation'
  }
> /**
 * @summary uploads an image
 * @link /pet/:petId/uploadImage
 */

export function useUploadFile<TData = UploadFile['response'], TError = UploadFile['error']>(
  refPetId: MaybeRef<UploadFilePathParams['petId']>,
  refParams?: MaybeRef<UploadFileQueryParams>,
  options: {
    mutation?: UseMutationOptions<TData, TError, UploadFile['request'], unknown>
    client?: UploadFile['client']['paramaters']
  } = {},
): UseMutationReturnType<TData, TError, UploadFile['request'], unknown> {
  const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {}
  return useMutation<TData, TError, UploadFile['request'], unknown>({
    mutationFn: (data) => {
      const petId = unref(refPetId)
      const params = unref(refParams)
      return client<UploadFile['data'], TError, UploadFile['request']>({
        method: 'post',
        url: `/pet/${petId}/uploadImage`,
        params,
        data,
        ...clientOptions,
      }).then((res) => res as TData)
    },
    ...mutationOptions,
  })
}