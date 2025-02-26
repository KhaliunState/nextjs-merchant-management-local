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
  client: {
    transaction_id: '0001', // Example ID
    amount: '1000.00', // Example amount
    payment_method_id: 'credit_card', // Example payment method
    site_id: 'site_01', // Example site ID
    description: 'Purchase of goods', // Example description
    status: 'pending', // Example status
    created_at: '2025/01/17', // Current timestamp
    updated_at: '2025/01/17', // Current timestamp
  },
};

// Example data following the structure of Data type
type Data = {
  client: {
    transaction_id: string;
    amount: string;
    payment_method_id: string;
    site_id: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
};

export function TransactionDetail() {
  const t = useTranslations('Transaction');
  const btn = useTranslations('Button');
  const router = useRouter();

  function handleUpdate(event: React.FormEvent) {
    router.push('/admin/client/edit');
  }

  function handleBack(event: React.FormEvent) {
    router.push('/admin/transactions');
  }

  return (
    <div className="w-4/5 ">
      <h1 className="text-2xl">{t('transaction_detail')}</h1>
      <Card className="mt-10">
        <CardContent className="mt-6">
          <div>
            <div className="grid grid-rows-none grid-cols-1 gap-4">
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('transaction_id')}
                  </p>
                </div>
                <div>
                  <p>{data.client.transaction_id}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('amount')}</p>
                </div>
                <div>
                  <p>{data.client.amount}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('payment_method_id')}
                  </p>
                </div>
                <div>
                  <p>{data.client.payment_method_id}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('site_id')}</p>
                </div>
                <div>
                  <p>{data.client.site_id}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('description')}
                  </p>
                </div>
                <div>
                  <p>{data.client.description}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('status')}</p>
                </div>
                <div>
                  <p>{data.client.status}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('created_at')}</p>
                </div>
                <div>
                  <p>{data.client.created_at}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('updated_at')}</p>
                </div>
                <div>
                  <p>{data.client.updated_at}</p>
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
