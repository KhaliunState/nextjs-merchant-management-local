'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale } from 'use-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function SelectLanguage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const curLocale = useLocale();
  const t = useTranslations('LocaleSwitcher');

  const handleLanguageChange = (e: string) => {
    const nextLocale = e;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    // <div className="pb-10 w-full">
    //     <div className="float-right">
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="h-[26px]">
        <SelectValue placeholder={t(curLocale)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="jp">日本</SelectItem>
          <SelectItem value="kr">한국인</SelectItem>
          <SelectItem value="cn">中国</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    //     </div>
    // </div>
  );
}
