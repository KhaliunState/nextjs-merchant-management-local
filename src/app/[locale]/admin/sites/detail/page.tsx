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
  ChevronDownIcon,
  ChevronUpIcon,
  LucideArrowDownWideNarrow,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import clsx from 'clsx';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/status-badge';

const data: Service[] = [
  {
    service_id: '0001',
    service_name: 'Mizuho',
    service_type: 'credit card',
    created_at: '2025/01/14',
    updated_at: '2025/01/15',
    status: 'active',
  },
  {
    service_id: '0002',
    service_name: 'Seven Eleven',
    service_type: 'Conbini',

    created_at: '2025/01/14',
    updated_at: '2025/01/15',
    status: 'inactive',
  },
  {
    service_id: '0003',
    service_name: 'Rakuten',
    service_type: 'credit card',

    created_at: '2025/01/14',
    updated_at: '2025/01/15',
    status: 'active',
  },
];

export type Service = {
  service_id: string;
  service_name: string;
  service_type: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive';
};

const site = {
  site_id: '1001',
  site_name: 'AEON',
  url: 'https://aeon.jp',
  client_id: '1001',
  created_at: '2025/01/14',
  status: 'pending',
};

const psp = {
  psp_id: '2001',
  key: 'sample-key',
  shared_secret: 'sample-secret',
  connector_label: 'AEON-Connector',
  acquirer_bin: '123456',
  acquirer_merchant_id: '987654',
  acquirer_country_code: 'JP',
  source_verification_code: 'abc123',
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
  const handleDeleteSite = (payment: Service) => {
    setIsDeleteDialogOpen(true);
  };

  function handleViewDetail() {
    router.push('/admin/sites/detail');
  }

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: 'service_id',
      header: ({ column }) => {
        return <div>service_id</div>;
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue('service_id')}</div>
      ),
    },
    {
      accessorKey: 'service_name',
      header: ({ column }) => {
        return <div>service_name</div>;
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue('service_name')}</div>
      ),
    },
    {
      accessorKey: 'service_type',
      header: ({ column }) => {
        return <div>service_type</div>;
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue('service_type')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <div>status</div>;
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => {
        return <div>created_at</div>;
      },
      cell: ({ row }) => <div>{row.getValue('created_at')}</div>,
    },
    {
      accessorKey: 'updated_at',
      header: ({ column }) => {
        return <div>updated_at</div>;
      },
      cell: ({ row }) => <div>{row.getValue('updated_at')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="transition-transform duration-600 ease-in-out">
            <ChevronDownIcon
              className={`w-5 h-5 transform transition-transform duration-300 ease-in-out ${
                expandedRow === row.id ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
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
  const br = useTranslations('Breadcrumb');
  const sv = useTranslations('Service');
  // State to track the expanded row
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);

  // Handle row click to toggle expansion
  const handleRowClick = (rowId: string) => {
    setExpandedRow((prev) => (prev === rowId ? null : rowId));
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3 mb-10">
        <h1 className="text-2xl">{br('detail_sites')}</h1>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 gap-2">
          <h1 className="text-lg">{t('site_info')}</h1>
          <Card>
            <CardContent className="mt-6">
              <div>
                <div className="grid grid-rows-none grid-cols-1 gap-4">
                  <div className="flex">
                    <div className="w-80">
                      <p className="text-gray-600 font-medium">
                        {t('site_id')}
                      </p>
                    </div>
                    <div>
                      <p>{site.site_id}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-80">
                      <p className="text-gray-600 font-medium">
                        {t('site_name')}
                      </p>
                    </div>
                    <div>
                      <p>{site.site_name}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-80">
                      <p className="text-gray-600 font-medium">{t('url')}</p>
                    </div>
                    <div>
                      <a
                        href={site.url}
                        className="text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {site.url}
                      </a>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-80">
                      <p className="text-gray-600 font-medium">
                        {t('client_id')}
                      </p>
                    </div>
                    <div>
                      <p>{site.client_id}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-80">
                      <p className="text-gray-600 font-medium">
                        {t('created_at')}
                      </p>
                    </div>
                    <div>
                      <p>{site.created_at}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <h1 className="text-lg">{sv('service_info')}</h1>
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
                                header.id != 'actions'
                                  ? sv(header.id)
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
                    <React.Fragment key={row.id}>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        onClick={() => handleRowClick(row.id)}
                        className={clsx(
                          expandedRow === row.id
                            ? 'hover:hover:bg-gray-200 !hover:bg-gray-200 bg-gray-200'
                            : '',
                        )}
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

                      {/* Expanded Row */}
                      {expandedRow === row.id && (
                        <TableRow
                          key={`${row.id}-expanded`}
                          data-state={row.getIsSelected() && 'selected'}
                          className="hover:hover:bg-gray-100 !hover:bg-gray-100 bg-gray-100"
                        >
                          <TableCell colSpan={columns.length}>
                            <div className="grid grid-cols-1 gap-2 ml-14 py-4 w-max">
                              <h1 className="text-lg">{t('psp_info')}</h1>
                              <Card>
                                <CardContent className="mt-6">
                                  <div>
                                    <div className="grid grid-rows-none grid-cols-1 gap-4">
                                      {/* Displaying psp_id */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('psp_id')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.psp_id}</p>
                                        </div>
                                      </div>

                                      {/* Displaying key */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('key')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.key}</p>
                                        </div>
                                      </div>

                                      {/* Displaying shared_secret */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('shared_secret')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.shared_secret}</p>
                                        </div>
                                      </div>

                                      {/* Displaying connector_label */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('connector_label')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.connector_label}</p>
                                        </div>
                                      </div>

                                      {/* Displaying acquirer_bin */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('acquirer_bin')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.acquirer_bin}</p>
                                        </div>
                                      </div>

                                      {/* Displaying acquirer_merchant_id */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('acquirer_merchant_id')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.acquirer_merchant_id}</p>
                                        </div>
                                      </div>

                                      {/* Displaying acquirer_country_code */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('acquirer_country_code')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.acquirer_country_code}</p>
                                        </div>
                                      </div>

                                      {/* Displaying source_verification_code */}
                                      <div className="flex">
                                        <div className="w-80">
                                          <p className="text-gray-600 font-medium">
                                            {t('source_verification_code')}
                                          </p>
                                        </div>
                                        <div>
                                          <p>{psp.source_verification_code}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
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
          </div>
        </div>
      </div>
    </div>
  );
}
