import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
type BreadCrumbData = {
  label: string;
  url: string;
};
const DynamicBreadcrumb = ({ data }: { data: BreadCrumbData[] }) => {
  const t = useTranslations('Breadcrumb');

  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {link!= 'create' && link!= 'edit' && link!= 'detail' ? (
                  <Link href={href}>{t(link)}</Link>
                ) : (
                  <Link href={href}>
                    {t(link + '_' + pathNames[index - 1])}
                  </Link>
                )}
              </BreadcrumbItem>
              {index < pathNames.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
