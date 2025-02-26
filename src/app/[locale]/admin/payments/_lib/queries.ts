import 'server-only';
import { unstable_cache } from '@/lib/unstable-cache';

import type { GetTasksSchema } from './validations';

async function fetchUserData(query: string) {
  const res = await fetch(`https://dummyjson.com/users/search?q=${query}`); // Pass the query dynamically
  const data = await res.json();
  return data;
}

export async function getPaymentChannels(input: GetTasksSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage;
        const fromDate = input.from ? new Date(input.from) : undefined;
        const toDate = input.to ? new Date(input.to) : undefined;
        const advancedTable = input.flags.includes('advancedTable');

        const statuses = ['pending', 'processing', 'success', 'failed'] as const;
        const priorities = ['low', 'medium', 'high'] as const;

        const data = Array.from({ length: 10 }, (_, i) => {
          const id = `ID-${i + 1}`;
          return {
            id,
            payment_id: `Payment ID-${i + 1}`,
            api_key: `${Math.floor(1000 + Math.random() * 9000)}`,
            password: `Password ${i + 1}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            created_at: new Date(),
            updated_at: Math.random() < 0.5 ? new Date() : null,
          };
        });
        const total = 10;
        const pageCount = Math.ceil(total / input.perPage);
        return { data, pageCount };
      } catch (_err) {
        return { data: [], pageCount: 0 };
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: 3600,
      tags: ['tasks'],
    },
  )();
}