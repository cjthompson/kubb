import { faker } from '@faker-js/faker'

import type { Tag } from '../models/ts/Tag'

export function createTag(): Tag {
  return { id: faker.number.float({}), name: faker.string.alpha() }
}
