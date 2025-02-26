'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/status-badge';

const data: Payment[] = [
  {
    site_id: '0001',
    site_name: 'AEON',
    url: 'aeon.jp  ',
    client_id: '1001',
    created_date: '2025/01/14',
    status: 'pending',
  },
  {
    site_id: '0001',
    site_name: 'COSTCO',
    url: 'aeon.jp  ',
    client_id: '1001',
    created_date: '2025/01/14',
    status: 'pending',
  },
  {
    site_id: '0001',
    site_name: 'AEON',
    url: 'aeon.jp  ',
    client_id: '1001',
    created_date: '2025/01/14',
    status: 'success',
  },
  {
    site_id: '0001',
    site_name: 'MITSUI',
    url: 'aeon.jp  ',
    client_id: '1001',
    created_date: '2025/01/14',
    status: 'failed',
  },
  {
    site_id: '0001',
    site_name: 'LALA',
    url: 'aeon.jp  ',
    client_id: '1001',
    created_date: '2025/01/14',
    status: 'success',
  },
];

export type Payment = {
  site_id: string;
  site_name: string;
  url: string;
  client_id: string;
  created_date: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
};

export default function Sites() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isDeletedDialogOpen, setIsDeletedDialogOpen] = React.useState(false);
  const handleDeleteSite = (payment: Payment) => {
    setIsDeleteDialogOpen(true);
  };

  function handleViewDetail() {
    router.push('/admin/sites/detail');
  }

  const columns: ColumnDef<Payment>[] = [
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'site_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Site ID
            {/* {t(site_name)} */}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('site_id')}</div>
      ),
    },
    {
      accessorKey: 'site_name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Site name
            {/* {t(site_name)} */}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue('site_name')}</div>
      ),
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => <div className="lowercase">{row.getValue('url')}</div>,
    },
    {
      accessorKey: 'client_id',
      header: 'Client ID',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('client_id')}</div>
      ),
    },
    {
      accessorKey: 'created_date',
      header: 'Created date',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('created_date')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        // <Badge variant="outline" className="capitalize">
        //   {row.getValue('status')}265
        // </Badge>
        <div className="capitalize">{row.getValue('status')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        const t = useTranslations('Site');
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetail()}>
                <EyeIcon />
                {btn('view_detail')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilIcon />
                {t('edit_site')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteSite(payment)}>
                <TrashIcon />
                {t('delete_site')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const router = useRouter();
  function handleButton() {
    router.push('/admin/sites/create');
  }

  function handleCancel() {
    setIsDeleteDialogOpen(false);
  }

  function handleDelete() {
    setIsDeleteDialogOpen(false);
    setIsDeletedDialogOpen(true);
  }

  function handleBack() {
    setIsDeletedDialogOpen(false);
  }

  const t = useTranslations('Site');
  const s = useTranslations('Status');
  const tb = useTranslations('Table');
  const btn = useTranslations('Button');

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3">
        <h1 className="text-2xl">{t('site_management')}</h1>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder={t('filter_site_name')}
          value={
            (table.getColumn('site_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('site_name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t('columns')} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {t(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="float-right ml-4" onClick={handleButton}>
          {t('create_site')}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.id != 'select' && header.id != 'actions'
                              ? t(header.id)
                              : header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.id.includes('status') ? (
                          <StatusBadge
                            status={row.getValue('status')}
                          ></StatusBadge>
                        ) : (
                          cell.column.columnDef.cell
                        ),
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('confirm_delete_site')}</DialogTitle>
            </DialogHeader>
            <div className="mt-6 grid grid-rows-5 grid-flow-col gap-4">
              <div className="flex">
                <div className="w-40">{t('site_name')}</div>
                <div>site_name</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('url')}</div>
                <div>url</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('client_id')}</div>
                <div>client_id</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('created_at')}</div>
                <div>created_at</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('status')}</div>
                <div>status</div>
              </div>
            </div>
            <DialogFooter>
              <div className="mt-10 flex justify-end  gap-4">
                <Button variant="secondary" onClick={handleCancel}>
                  {btn('cancel')}
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  {btn('delete')}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isDeletedDialogOpen}
          onOpenChange={setIsDeletedDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('site_deleted_success')}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleBack}>{btn('back')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {tb('previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {tb('next')}
          </Button>
        </div>
      </div>
    </div>
  );
}
