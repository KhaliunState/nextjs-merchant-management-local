import type { SearchParams } from '@/types';
import * as React from 'react';
import { getValidFilters } from '@/lib/data-table';
import { getTasks } from './_lib/queries';
import { searchParamsCache } from './_lib/validations';
import { TasksTable } from './_components/sites-table';

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function IndexPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getTasks({
      ...search,
      filters: validFilters,
    }),
  ]);

  return (
    <div>
      <TasksTable promises={promises} />
    </div>
  );
}
