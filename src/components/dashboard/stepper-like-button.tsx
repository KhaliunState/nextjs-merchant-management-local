import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useRouter } from '@/i18n/routing';
import {
  CheckIcon,
  CircleCheckIcon,
  EarthIcon,
  MoveRight,
  MoveRightIcon,
  StoreIcon,
} from 'lucide-react';

export function Stepper2() {
  const t = useTranslations('Invoice');
  const btn = useTranslations('Button');
  const router = useRouter();

  function handleUpdate(event: React.FormEvent) {
    router.push('/admin/client/edit');
  }

  function handleBack(event: React.FormEvent) {
    router.push('/admin/invoices');
  }

  return (
    <ol className="flex space-x-4 w-full px-2">
      <li className="flex-1">
        <div
          className="w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
          role="alert"
        >
          <Link href={'/admin/client/create'}>
            <div className="flex items-center justify-between">
              <span className="sr-only">User info</span>
              <h3 className="font-medium">1. 加盟店作成</h3>
              <CheckIcon></CheckIcon>
            </div>
          </Link>
        </div>
      </li>
      <li className="flex-1">
        <div
          className="w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400"
          role="alert"
        >
          <Link href={'/admin/sites/create'}>
            <div className="flex items-center justify-between">
              <span className="sr-only">Social accounts</span>
              <h3 className="font-medium">2. サイト作成</h3>
              <MoveRightIcon />
            </div>
          </Link>
        </div>
      </li>
      <li className="flex-1">
        <div
          className="w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          role="alert"
        >
          <div className="flex items-center justify-between">
            <span className="sr-only">Review</span>
            <h3 className="font-medium">3. 完了</h3>
          </div>
        </div>
      </li>
      <li className="flex-1"></li>
    </ol>
  );
}
