import { faker } from '@faker-js/faker';
import { z } from 'zod';

export const studyResourceSchema = z.object({
  title: z.string().min(3).max(80),
  note: z.string().min(3).max(240),
});

export type StudyResource = z.infer<typeof studyResourceSchema>;

export function buildStudyResource(overrides: Partial<StudyResource> = {}): StudyResource {
  const candidate: StudyResource = {
    title: `PW-${faker.word.noun()}-${faker.number.int({ min: 100, max: 999 })}`,
    note: faker.lorem.sentence(),
    ...overrides,
  };

  return studyResourceSchema.parse(candidate);
}
