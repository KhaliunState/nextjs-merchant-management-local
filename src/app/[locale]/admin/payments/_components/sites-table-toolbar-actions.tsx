'use client';

import type { Site } from '@/db/schema';
import type { Table } from '@tanstack/react-table';
import { DeleteTasksDialog } from './delete-sites-dialog';

interface TasksTableToolbarActionsProps {
  table: Table<Site>;
}

export function TasksTableToolbarActions({
  table,
}: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
    </div>
  );
}
