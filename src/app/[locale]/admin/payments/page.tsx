import type { SearchParams } from '@/types';
import * as React from 'react';
import { getValidFilters } from '@/lib/data-table';
import { getPaymentChannels } from './_lib/queries';
import { searchParamsCache } from './_lib/validations';
import { PaymentsTable } from './_components/payment-table';

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function IndexPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getPaymentChannels({
      ...search,
      filters: validFilters,
    }),
  ]);

  return (
    <div>
      <PaymentsTable promises={promises} />
    </div>
  );
}
