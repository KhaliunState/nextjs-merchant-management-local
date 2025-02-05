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
    user_id: '12345', // Default user ID
    username: 'john_doe', // Default username
    client_id: 'abc123', // Default client ID
    email: 'john.doe@example.com', // Default email
    password: 'password123', // Default password
    role: 'admin', // Default role
    cognito_id: 'cognito12345', // Default cognito ID
    status: 'pending', // Default status
    created_at: '2025-01-01', // Default created at
    updated_at: '2025-01-01', // Default updated at
  },
  {
    user_id: '67890', // Another example with different defaults
    username: 'jane_smith', // Default username
    client_id: 'xyz456', // Default client ID
    email: 'jane.smith@example.com', // Default email
    password: 'password456', // Default password
    role: 'user', // Default role
    cognito_id: 'cognito67890', // Default cognito ID
    status: 'processing', // Default status
    created_at: '2025-02-01', // Default created at
    updated_at: '2025-02-01', // Default updated at
  },
  {
    user_id: '12345', // Default user ID
    username: 'john_doe', // Default username
    client_id: 'abc123', // Default client ID
    email: 'john.doe@example.com', // Default email
    password: 'password123', // Default password
    role: 'admin', // Default role
    cognito_id: 'cognito12345', // Default cognito ID
    status: 'pending', // Default status
    created_at: '2025-01-01', // Default created at
    updated_at: '2025-01-01', // Default updated at
  },
  {
    user_id: '67890', // Another example with different defaults
    username: 'jane_smith', // Default username
    client_id: 'xyz456', // Default client ID
    email: 'jane.smith@example.com', // Default email
    password: 'password456', // Default password
    role: 'user', // Default role
    cognito_id: 'cognito67890', // Default cognito ID
    status: 'processing', // Default status
    created_at: '2025-02-01', // Default created at
    updated_at: '2025-02-01', // Default updated at
  },
];

export type Payment = {
  user_id: string;
  username: string;
  client_id: string;
  email: string;
  password: string;
  role: string;
  cognito_id: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
};

export default function Users() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isDeletedDialogOpen, setIsDeletedDialogOpen] = React.useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);
  const handleDeleteSite = (payment: Payment) => {
    setIsDeleteDialogOpen(true);
  };

  function handleViewDetail() {
    setIsDetailDialogOpen(true);
  }
  function handleEdit() {
    router.push('/admin/users/edit');
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
      accessorKey: 'user_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            user_id
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('user_id')}</div>
      ),
    },
    {
      accessorKey: 'username',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            username
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue('username')}</div>
      ),
    },
    {
      accessorKey: 'client_id',
      header: 'client_id',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('client_id')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'email',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'role',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('role')}</div>
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
      header: 'created_at',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('created_at')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        const t = useTranslations('User');
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{tb('actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetail()}>
                <EyeIcon />
                {btn('view_detail')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit()}>
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
  function handleCreateButton() {
    router.push('/admin/users/create');
  }

  function handleCancel() {
    setIsDeleteDialogOpen(false);
    setIsDetailDialogOpen(false);
  }

  function handleDelete() {
    setIsDeleteDialogOpen(false);
    setIsDeletedDialogOpen(true);
  }

  function handleBack() {
    setIsDeletedDialogOpen(false);
  }

  const t = useTranslations('User');
  const menus = useTranslations('SideMenu');
  const s = useTranslations('Status');
  const tb = useTranslations('Table');
  const btn = useTranslations('Buttons');

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3">
        <h1 className="text-2xl">{menus('user_management')}</h1>
      </div>
      <div className="grid grid-cols-1 mt-4">
        <div>
          <Button className="float-right" onClick={handleCreateButton}>
            {t('create_user')}
          </Button>
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder={t('filter_username')}
          value={
            (table.getColumn('username')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('username')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {tb('columns')} <ChevronDown />
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

        {/* </Delete dialog> */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('confirm_delete_user')}</DialogTitle>
            </DialogHeader>
            <div className="mt-6 grid grid-rows-5 grid-flow-col gap-4">
              <div className="flex">
                <div className="w-40">{t('user_id')}</div>
                <div>user_id</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('username')}</div>
                <div>username</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('email')}</div>
                <div>email</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('role')}</div>
                <div>role</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('status')}</div>
                <div>status</div>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end  gap-4">
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
              <DialogTitle>{t('user_deleted_success')}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleBack}>{btn('back')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* </Detail dialog> */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('user_detail')}</DialogTitle>
            </DialogHeader>
            <div className="mt-6 grid grid-rows-5 grid-flow-col gap-4">
              <div className="flex">
                <div className="w-40">{t('user_id')}</div>
                <div>user_id</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('username')}</div>
                <div>username</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('email')}</div>
                <div>email</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('role')}</div>
                <div>role</div>
              </div>
              <div className="flex">
                <div className="w-40">{t('status')}</div>
                <div>status</div>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end  gap-4">
                <Button variant="secondary" onClick={handleCancel}>
                  {btn('back')}
                </Button>
              </div>
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
