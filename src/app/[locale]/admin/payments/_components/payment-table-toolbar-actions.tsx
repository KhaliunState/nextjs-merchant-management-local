'use client';

import type { Channels } from '@/db/schema';
import type { Table } from '@tanstack/react-table';
import { DeleteChannelDialog } from './delete-payment-dialog';

interface TasksTableToolbarActionsProps {
  table: Table<Channels>;
}

export function TasksTableToolbarActions({
  table,
}: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteChannelDialog
          channels={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
    </div>
  );
}
