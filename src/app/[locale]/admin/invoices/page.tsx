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
  DownloadIcon,
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
import { Label } from '@radix-ui/react-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DownloadInvoice from '@/components/invoice/download';
import { StatusBadge } from '@/components/status-badge';

const data: Invoice[] = [
  {
    invoice_id: '1001',
    access_log: 'Log text',
    site_id: '0001',
    tax: '1000',
    storage_fee: '100',
    total: '1100',
    created_at: '2025/01/14',
    updated_at: '2025/01/16',
    status: 'pending',
  },
  {
    invoice_id: '1002',
    access_log: 'Access log details',
    site_id: '0002',
    tax: '1500',
    storage_fee: '200',
    total: '1700',
    created_at: '2025/01/15',
    updated_at: '2025/01/17',
    status: 'processing',
  },
  {
    invoice_id: '1003',
    access_log: 'Another log entry',
    site_id: '0003',
    tax: '2000',
    storage_fee: '300',
    total: '2300',
    created_at: '2025/01/16',
    updated_at: '2025/01/18',
    status: 'success',
  },
  {
    invoice_id: '1004',
    access_log: 'Sample log for invoice 1004',
    site_id: '0004',
    tax: '1200',
    storage_fee: '150',
    total: '1350',
    created_at: '2025/01/17',
    updated_at: '2025/01/19',
    status: 'failed',
  },
];

export type Invoice = {
  invoice_id: string;
  access_log: string;
  site_id: string;
  tax: string;
  storage_fee: string;
  total: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
};

export default function Invoice() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isEditedDialogOpen, setIsEditedDialogOpen] = React.useState(false);
  const [isDownloadDialogOpen, setIsDownloadedDialogOpen] =
    React.useState(false);
  const handleEditInvoice = (payment: Invoice) => {
    setIsEditDialogOpen(true);
  };
  const handleDownloadInvoice = (payment: Invoice) => {
    setIsDownloadedDialogOpen(true);
  };

  function handleViewDetail() {
    router.push('/admin/invoices/detail');
  }

  const columns: ColumnDef<Invoice>[] = [
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
      accessorKey: 'invoice_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Invoice ID
            {/* {t(site_name)} */}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('invoice_id')}</div>
      ),
    },
    {
      accessorKey: 'tax',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tax
            {/* {t(site_name)} */}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="uppercase">{row.getValue('tax')}</div>,
    },
    {
      accessorKey: 'storage_fee',
      header: 'storage_fee',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('storage_fee')}</div>
      ),
    },
    {
      accessorKey: 'total',
      header: 'total',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('total')}</div>
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
        const invoice = row.original;
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
                {tb('view')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditInvoice(invoice)}>
                <PencilIcon />
                {tb('edit')}
              </DropdownMenuItem>
              <DownloadInvoice
                isButton={false}
                setIsDownloadedDialogOpen={setIsDownloadedDialogOpen}
              ></DownloadInvoice>
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
  function handleDownloadButton() {
    setIsDownloadedDialogOpen(true);
  }

  function handleCancel() {
    setIsEditDialogOpen(false);
  }

  function handleUpdate() {
    setIsEditDialogOpen(false);
    setIsEditedDialogOpen(true);
  }

  function handleBack() {
    setIsEditedDialogOpen(false);
    setIsDownloadedDialogOpen(false);
  }

  const [formData, setFormData] = React.useState({
    invoice_id: '1002',
    access_log: 'Log',
    total: '1000',
    site_id: '1001',
    tax: '100',
    storage_fee: '100',
    status: 'pending',
  });

  // Handle changes for all form fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // Extract name and value from the event
    setFormData((prevData) => ({
      ...prevData, // Spread the previous form data
      [name]: value, // Dynamically update the field using the name attribute
    }));
  };

  const t = useTranslations('Invoice');
  const menus = useTranslations('SideMenu');
  const s = useTranslations('Status');
  const tb = useTranslations('Table');
  const btn = useTranslations('Button');

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3">
        <h1 className="text-2xl">{menus('invoice_management')}</h1>
      </div>
      <div className="grid grid-cols-1 mt-4">
        <div>
          <DownloadInvoice
            isButton={true}
            setIsDownloadedDialogOpen={setIsDownloadedDialogOpen}
          ></DownloadInvoice>
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder={t('filter_invoice_id')}
          value={
            (table.getColumn('invoice_id')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('invoice_id')?.setFilterValue(event.target.value)
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
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('edit_invoice')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t('invoice_id')}
                </Label>
                <Input
                  id="invoice_id"
                  name="invoice_id"
                  value={formData.invoice_id}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              {/* Access Log */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="access_log" className="text-right">
                  {t('access_log')}
                </Label>
                <Input
                  id="access_log"
                  name="access_log"
                  value={formData.access_log}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              {/* Site ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="site_id" className="text-right">
                  {t('site_id')}
                </Label>
                <Input
                  id="site_id"
                  name="site_id"
                  value={formData.site_id}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              {/* Tax */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tax" className="text-right">
                  {t('tax')}
                </Label>
                <Input
                  id="tax"
                  name="tax"
                  value={formData.tax}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              {/* Storage Fee */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="storage_fee" className="text-right">
                  {t('storage_fee')}
                </Label>
                <Input
                  id="storage_fee"
                  name="storage_fee"
                  value={formData.storage_fee}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              {/* total */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total" className="text-right">
                  {t('total')}
                </Label>
                <Input
                  id="total"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              {/* Status */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total" className="text-right">
                  {t('status')}
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={s('select_status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{s('active')}</SelectItem>
                    <SelectItem value="inactive">{s('inactive')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end  gap-4">
                <Button variant="secondary" onClick={handleCancel}>
                  {btn('cancel')}
                </Button>
                <Button onClick={handleUpdate}>{btn('update')}</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isEditedDialogOpen} onOpenChange={setIsEditedDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('invoice_updated_success')}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleBack}>{btn('back')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isDownloadDialogOpen}
          onOpenChange={setIsDownloadedDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('invoice_downloaded_success')}</DialogTitle>
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
