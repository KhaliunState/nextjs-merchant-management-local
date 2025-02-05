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
import { useRouter } from '@/i18n/routing';

const data: Data = {
  service: {
    service_id: '0001',
    service_name: 'Mizuho',
    service_type: 'credit card',
    failure_fee: '5',
    created_at: '2025/01/14',
    updated_at: '2025/01/15',
    status: 'success',
  },
};

// Example data following the structure of Data type
type Data = {
  service: {
    service_id: string;
    service_name: string;
    service_type: string;
    failure_fee: string;
    created_at: string;
    updated_at: string;
    status: string;
  };
};

export function ServiceDetail() {
  const t = useTranslations('Service');
  const btn = useTranslations('Buttons');
  const router = useRouter();

  function handleUpdate(event: React.FormEvent) {
    router.push('/admin/services/edit');
  }

  function handleBack(event: React.FormEvent) {
    router.push('/admin/services');
  }

  return (
    <div className="w-4/5 ">
      <h1 className="text-2xl">{t('service_detail')}</h1>
      <Card className="mt-10">
        <CardContent className="mt-6">
          <div>
            <div className="grid grid-rows-none grid-cols-1 gap-4">
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('service_id')}
                  </p>
                </div>
                <div>
                  <p>{data.service.service_id}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('service_name')}</p>
                </div>
                <div>
                  <p>{data.service.service_name}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('service_type')}
                  </p>
                </div>
                <div>
                  <p>{data.service.service_type}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('failure_fee')}</p>
                </div>
                <div>
                  <p>{data.service.failure_fee}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('status')}</p>
                </div>
                <div>
                  <p>{data.service.status}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('created_at')}</p>
                </div>
                <div>
                  <p>{data.service.created_at}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('updated_at')}</p>
                </div>
                <div>
                  <p>{data.service.updated_at}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-5 gap-4">
        <Button variant="outline" className="w-20" onClick={handleBack}>
          {btn('back')}
        </Button>
      </div>
    </div>
  );
}
