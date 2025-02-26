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
    client_id: '0001',
    client_name: 'AEON',
    home_page_url: 'aeon.jp  ',
    email: 'example@gmail.com',
    created_at: '2025/01/14',
    status: 'pending',
  },
  {
    client_id: '0001',
    client_name: 'COSTCO',
    home_page_url: 'aeon.jp  ',
    email: 'example@gmail.com',
    created_at: '2025/01/14',
    status: 'pending',
  },
  {
    client_id: '0001',
    client_name: 'AEON',
    home_page_url: 'aeon.jp  ',
    email: 'example@gmail.com',
    created_at: '2025/01/14',
    status: 'success',
  },
  {
    client_id: '0001',
    client_name: 'MITSUI',
    home_page_url: 'aeon.jp  ',
    email: 'example@gmail.com',
    created_at: '2025/01/14',
    status: 'failed',
  },
  {
    client_id: '0001',
    client_name: 'LALA',
    home_page_url: 'aeon.jp  ',
    email: 'example@gmail.com',
    created_at: '2025/01/14',
    status: 'success',
  },
];

export type Payment = {
  client_id: string;
  client_name: string;
  home_page_url: string;
  email: string;
  created_at: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
};

export default function Clients() {
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
    router.push('/admin/clients/detail');
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
      accessorKey: 'client_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Site ID
            {/* {t(client_name)} */}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('client_id')}</div>
      ),
    },
    {
      accessorKey: 'client_name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Site name
            {/* {t(client_name)} */}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue('client_name')}</div>
      ),
    },
    {
      accessorKey: 'home_page_url',
      header: 'home_page_url',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('home_page_url')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Client ID',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created date',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('created_at')}</div>
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
                {btn('edit')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteSite(payment)}>
                <TrashIcon />
                {btn('delete')}
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
    router.push('/admin/clients/create');
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

  const t = useTranslations('Client');
  const smenu = useTranslations('SideMenu');
  const s = useTranslations('Status');
  const tb = useTranslations('Table');
  const btn = useTranslations('Button');

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3">
        <h1 className="text-2xl">{smenu('client_list')}</h1>
      </div>
      <div className="grid grid-cols-1 mt-4">
        <div>
          <Button className="float-right" onClick={handleButton}>
            {smenu('create_client')}
          </Button>
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder={t('filter_client_name')}
          value={
            (table.getColumn('client_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('client_name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {btn('columns')} <ChevronDown />
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
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
              table.getRowModel().rows.map((row) => (
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
              <DialogTitle>{t('confirm_delete_client')}</DialogTitle>
            </DialogHeader>
            <div className="mt-6 grid grid-rows-5 grid-flow-col gap-4">
              <div className="flex">
                <div className="w-40">{t('client_name')}</div>
                <div>client_name</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('home_page_url')}</div>
                <div>home_page_url</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('email')}</div>
                <div>email</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('created_at')}</div>
                <div>created_at</div>
              </div>
              <div className="flex">
                <div className="w-40">{s('status')}</div>
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
              <DialogTitle>{t('client_deleted_success')}</DialogTitle>
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
