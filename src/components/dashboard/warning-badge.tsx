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
  CircleAlertIcon,
  CircleCheckIcon,
  EarthIcon,
  MoveRight,
  MoveRightIcon,
  StoreIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from 'lucide-react';

export function WarningBadge() {
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
    // <div className="bg-yellow-50 inline-block p-4 rounded-md mb-4" role="alert">
    //   <Link href={'/admin/sites/create'}>
    //     <div className="flex flex-col space-y-2  text-sm">
    //       <div className="flex items-center space-x-2  text-yellow-800">
    //         <TriangleAlertIcon className="w-5" />
    //         <p className="pl-1">注意:</p>
    //         <p className="pl-1">有効期限が間もなく切れます。お早めに更新手続きを行ってください。</p>
    //       </div>
    //       {/* <p className="list-disc list-inside text-sm text-yellow-700 pl-10">
    //         有効期限が間もなく切れます。お早めに更新手続きを行ってください。
    //       </p> */}
    //     </div>
    //   </Link>
    // </div>
    <div className="bg-yellow-50 inline-block p-4 rounded-md mb-4" role="alert">
      <Link href={'/admin/sites/create'}>
        <div className="flex flex-col space-y-2  text-sm">
          <div className="flex items-center space-x-2  text-yellow-800">
            <CircleAlertIcon className="w-5" />
            <p className="pl-1">お知らせ</p>
          </div>
          <p className="list-disc list-inside text-sm text-yellow-700 pl-8">
            有効期限が間もなく切れます。お早めに更新手続きを行ってください。
          </p>
        </div>
      </Link>
    </div>
  );
}
