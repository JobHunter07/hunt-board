import { faker } from '@faker-js/faker';

export type DataProfile = 'normal' | 'boundary' | 'extreme';

export interface JobTargetTestData {
  id: string;
  company: string;
  role: string;
  notes: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  columnId: string;
  warmUpScore: number;
  nextFollowUpDate?: string;
}

export interface JobTargetBatchOptions {
  profile?: DataProfile;
  count?: number;
  columnIds?: string[];
}

const defaultColumnIds = [
  'targets-identified',
  'intel-gathering',
  'warm-up-phase',
  'outreach-initiated',
  'follow-up-required',
  'conversation-started',
  'interview-pipeline',
  'stalled-cold',
  'offer-success',
] as const;

export const setFakerSeed = (seed: number): void => {
  faker.seed(seed);
};

export const clearFakerSeed = (): void => {
  faker.seed();
};

export const buildNormalJobTarget = (
  overrides: Partial<JobTargetTestData> = {},
): JobTargetTestData => {
  const generatedId = `jt_${Date.now()}_${faker.string.alphanumeric({ length: 8 })}`;

  return {
    id: generatedId,
    company: faker.company.name(),
    role: faker.person.jobTitle(),
    notes: faker.lorem.sentence(),
    tags: faker.helpers.arrayElements(['high-priority', 'stealth-role', 'referral-ready', 'warm-intro'], {
      min: 1,
      max: 3,
    }),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    columnId: faker.helpers.arrayElement([...defaultColumnIds]),
    warmUpScore: faker.number.int({ min: 0, max: 100 }),
    nextFollowUpDate: faker.date.soon({ days: 14 }).toISOString(),
    ...overrides,
  };
};

export const buildBoundaryJobTarget = (
  overrides: Partial<JobTargetTestData> = {},
): JobTargetTestData => {
  const maxLengthCompany = faker.string.alphanumeric({ length: 100 });
  const maxLengthRole = faker.string.alphanumeric({ length: 100 });
  const edgeNotes = faker.string.alphanumeric({ length: 1000 });

  return {
    id: `jt_${Date.now()}_${faker.string.alphanumeric({ length: 12 })}`,
    company: maxLengthCompany,
    role: maxLengthRole,
    notes: edgeNotes,
    tags: [faker.string.alphanumeric({ length: 24 }), faker.string.alphanumeric({ length: 24 })],
    priority: 'high',
    columnId: 'follow-up-required',
    warmUpScore: 100,
    nextFollowUpDate: faker.date.soon({ days: 1 }).toISOString(),
    ...overrides,
  };
};

export const buildExtremeJobTarget = (
  overrides: Partial<JobTargetTestData> = {},
): JobTargetTestData => {
  const unicodeHeavyCompany = faker.helpers.arrayElement([
    `🚀${faker.string.alphanumeric({ length: 80 })}株式会社`,
    `Δ${faker.string.alphanumeric({ length: 90 })}ООО`,
    `شركة-${faker.string.alphanumeric({ length: 70 })}-公司`,
  ]);

  const punctuationHeavyRole = faker.string.fromCharacters('!@#$%^&*()_+-=[]{}|;:,.<>?/`~', 64);

  return {
    id: `jt_${Date.now()}_${faker.string.alphanumeric({ length: 24 })}`,
    company: unicodeHeavyCompany,
    role: punctuationHeavyRole,
    notes: faker.string.alphanumeric({ length: 5000 }),
    tags: Array.from({ length: 12 }, () => faker.string.alphanumeric({ length: 32 })),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    columnId: faker.helpers.arrayElement([...defaultColumnIds]),
    warmUpScore: faker.helpers.arrayElement([0, 100]),
    nextFollowUpDate: faker.date.soon({ days: 365 }).toISOString(),
    ...overrides,
  };
};

export const buildJobTargetByProfile = (
  profile: DataProfile,
  overrides: Partial<JobTargetTestData> = {},
): JobTargetTestData => {
  if (profile === 'boundary') {
    return buildBoundaryJobTarget(overrides);
  }

  if (profile === 'extreme') {
    return buildExtremeJobTarget(overrides);
  }

  return buildNormalJobTarget(overrides);
};

export const buildJobTargetBatch = ({
  profile = 'normal',
  count = 10,
  columnIds,
}: JobTargetBatchOptions = {}): JobTargetTestData[] => {
  const availableColumns = columnIds && columnIds.length > 0 ? columnIds : [...defaultColumnIds];

  return Array.from({ length: count }, (_, index) => {
    const selectedColumn =
      availableColumns[index % availableColumns.length] ?? availableColumns[0] ?? 'targets-identified';

    return buildJobTargetByProfile(profile, {
      columnId: selectedColumn,
    });
  });
};

export const buildBoardLoadProfile = (profile: DataProfile): JobTargetTestData[] => {
  if (profile === 'boundary') {
    return buildJobTargetBatch({ profile: 'boundary', count: 50 });
  }

  if (profile === 'extreme') {
    return buildJobTargetBatch({ profile: 'extreme', count: 1000 });
  }

  return buildJobTargetBatch({ profile: 'normal', count: 12 });
};
