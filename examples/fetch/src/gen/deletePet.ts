import client from '../client.ts'
import type { ResponseConfig } from '../client.ts'
import type { DeletePetMutationResponse, DeletePetPathParams, DeletePetHeaderParams } from './models.ts'

/**
 * @description delete a pet
 * @summary Deletes a pet
 * @link /pet/:petId
 */
export async function deletePet(
  petId: DeletePetPathParams['petId'],
  headers?: DeletePetHeaderParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<DeletePetMutationResponse>['data']> {
  const res = await client<DeletePetMutationResponse>({
    method: 'delete',
    url: `/pet/${petId}`,
    baseURL: 'https://petstore3.swagger.io/api/v3',
    headers: { ...headers, ...options.headers },
    ...options,
  })
  return res.data
}
