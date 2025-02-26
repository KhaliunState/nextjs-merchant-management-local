'use client';

import { statusValues, type Channels } from '@/db/schema';
import type { DataTableRowAction } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Ellipsis, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import * as React from 'react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getStatusIcon } from '../_lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Channels> | null>
  >;
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<Channels>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'payment_id',
      header: ({ column }) => {
        const t = useTranslations('Payment');
        return (
          <DataTableColumnHeader column={column} site_name={t('payment_id')} />
        );
      },
      cell: ({ row }) => (
        <div className="w-20">{row.getValue('payment_id')}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'api_key',
      header: ({ column }) => {
        const t = useTranslations('Payment');
        return (
          <DataTableColumnHeader column={column} site_name={t('api_key')} />
        );
      },
      cell: ({ row }) => {
        return <div className="w-20">{row.getValue('api_key')}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        const t = useTranslations('Status');
        return (
          <DataTableColumnHeader column={column} site_name={t('status')} />
        );
      },
      cell: ({ row }) => {
        const status = statusValues.find(
          (status) => status === row.original.status,
        );

        if (!status) return null;

        const Icon = getStatusIcon(status);
        const s = useTranslations('Status');
        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon
              className="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="capitalize">{s(status)}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => {
        const t = useTranslations('Column');
        return (
          <DataTableColumnHeader column={column} site_name={t('created_at')} />
        );
      },
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        const b = useTranslations('Button');
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: 'view' })}
              >
                <EyeIcon />
                {b('view_detail')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: 'update' })}
              >
                <PencilIcon></PencilIcon>
                {b('edit')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: 'delete' })}
              >
                <TrashIcon className="text-red-400" />
                <p className="text-red-400">{b('delete')}</p>
                <DropdownMenuShortcut className="text-red-400">
                  ⌘⌫
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
