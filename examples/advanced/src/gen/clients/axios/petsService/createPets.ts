import client from '../../../../axios-client.ts'
import type { ResponseConfig } from '../../../../axios-client.ts'
import type {
  CreatePetsMutationRequest,
  CreatePetsMutationResponse,
  CreatePetsPathParams,
  CreatePetsQueryParams,
  CreatePetsHeaderParams,
} from '../../../models/ts/petsController/CreatePets.ts'

/**
 * @summary Create a pet
 * @link /pets/:uuid
 */
export async function createPets(
  {
    uuid,
  }: {
    uuid: CreatePetsPathParams['uuid']
  },
  data: CreatePetsMutationRequest,
  headers: CreatePetsHeaderParams,
  params?: CreatePetsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<CreatePetsMutationResponse>> {
  const res = await client<CreatePetsMutationResponse, CreatePetsMutationRequest>({
    method: 'post',
    url: `/pets/${uuid}`,
    baseURL: 'https://petstore3.swagger.io/api/v3',
    params,
    data,
    headers: { ...headers, ...options.headers },
    ...options,
  })
  return res
}
