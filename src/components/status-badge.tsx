import React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';
export function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('Status');

  return (
    <div
      className={clsx(
        'capitalize inline-block px-4 py-1 rounded-md border text-xs',
        status === 'failed' ? 'bg-red-50 border-red-400 text-red-700' : '',
        status === 'success'
          ? 'bg-green-50 border-green-400 text-green-700'
          : '',
        status === 'processing'
          ? 'bg-blue-50 border-blue-400 text-blue-700'
          : '',
        status === 'pending'
          ? 'bg-orange-50 border-orange-400 text-orange-700'
          : '',
        status === 'active'
          ? 'bg-green-50 border-green-400 text-green-700'
          : '',
        status === 'inactive'
          ? 'bg-gray-50 border-gray-400 text-gray-700'
          : '',
      )}
    >
      {t(status)}
    </div>
  );
}
