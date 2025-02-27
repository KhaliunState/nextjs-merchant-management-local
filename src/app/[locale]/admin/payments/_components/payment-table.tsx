'use client';

import { statusValues, Channels } from '@/db/schema';
import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction,
} from '@/types';
import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { toSentenceCase } from '@/lib/utils';
import { getStatusIcon } from '../_lib/utils';

import type { getPaymentChannels } from '../_lib/queries';
import { DeleteChannelDialog } from './delete-payment-dialog';
import { getColumns } from './payment-table-columns';
import { TasksTableToolbarActions } from './payment-table-toolbar-actions';
import { UpdatePaymentChannelSheet } from './update-payment-sheet';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ViewPaymentChannelDialog } from './view-payment-dialog';

interface PaymentsTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getPaymentChannels>>]>;
}

export function PaymentsTable({ promises }: PaymentsTableProps) {
  const [{ data, pageCount }] = React.use(promises);

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<Channels> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const router = useRouter();
  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */

  const t = useTranslations('Table');
  const s = useTranslations('Status');
  const payment = useTranslations('Payment');
  const br = useTranslations('Breadcrumb');
  const filterFields: DataTableFilterField<Channels>[] = [
    {
      id: 'api_key',
      label: 'Title',
      placeholder: payment('filter_psp'),
    },
    {
      id: 'status',
      label: s('status'),
      options: statusValues.map((status) => ({
        label: s(status),
        value: status,
        icon: getStatusIcon(status),
        // count: statusCounts[status],
      })),
    },
  ];

  /**
   * Advanced filter fields for the data table.
   * These fields provide more complex filtering options compared to the regular filterFields.
   *
   * Key differences from regular filterFields:
   * 1. More field types: Includes 'text', 'multi-select', 'date', and 'boolean'.
   * 2. Enhanced flexibility: Allows for more precise and varied filtering options.
   * 3. Used with DataTableAdvancedToolbar: Enables a more sophisticated filtering UI.
   * 4. Date and boolean types: Adds support for filtering by date ranges and boolean values.
   */
  const advancedFilterFields: DataTableAdvancedFilterField<Channels>[] = [
    {
      id: 'api_key',
      label: 'Title',
      type: 'text',
    },
    {
      id: 'status',
      label: 'Status',
      type: 'multi-select',
      options: statusValues.map((status) => ({
        label: toSentenceCase(status),
        value: status,
        icon: getStatusIcon(status),
        // count: statusCounts[status],
      })),
    },
    {
      id: 'created_at',
      label: 'Created at',
      type: 'date',
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [{ id: 'created_at', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });
  function handleButton() {
    router.push('/admin/payments/create');
  }
  return (
    <>
      <div className="flex justify-between items-center gap-3 mb-10">
        <h1 className="text-2xl">{payment('payment_channels')}</h1>
        <Button className="ml-4" onClick={handleButton}>
          {br('create_payments')}
        </Button>
      </div>

      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
      <UpdatePaymentChannelSheet
        open={rowAction?.type === 'update'}
        onOpenChange={() => setRowAction(null)}
        payment={rowAction?.row.original ?? null}
      />
      <DeleteChannelDialog
        open={rowAction?.type === 'delete'}
        onOpenChange={() => setRowAction(null)}
        channels={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
      <ViewPaymentChannelDialog
        open={rowAction?.type === 'view'}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
}
