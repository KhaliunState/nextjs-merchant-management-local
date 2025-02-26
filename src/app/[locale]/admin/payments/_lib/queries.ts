import 'server-only';
import { unstable_cache } from '@/lib/unstable-cache';

import type { GetTasksSchema } from './validations';

async function fetchUserData(query: string) {
  const res = await fetch(`https://dummyjson.com/users/search?q=${query}`); // Pass the query dynamically
  const data = await res.json();
  return data;
}

export async function getTasks(input: GetTasksSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage;
        const fromDate = input.from ? new Date(input.from) : undefined;
        const toDate = input.to ? new Date(input.to) : undefined;
        const advancedTable = input.flags.includes('advancedTable');

        // const data = await fetchUserData(input.site_name); 
        // console.log("data : "+JSON.stringify(data, null, 2));
        // console.log("input : "+JSON.stringify(input, null, 2));

        const statuses = ['pending', 'processing', 'success', 'failed'] as const;
        const priorities = ['low', 'medium', 'high'] as const;

        const data = Array.from({ length: 10 }, (_, i) => {
          const id = `task-${i + 1}`;
          return {
            id,
            code: `${Math.floor(1000 + Math.random() * 9000)}`,
            site_name: `Site ${i + 1}`,
            url: `URL ${i + 1}`,
            client_id: `Client ${i + 1}`,
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