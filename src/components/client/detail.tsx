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
    business_id: '0001',
    business_type: 'ecommers',
    corporate_number: '0002',
    company_name: 'Example Company',
    company_name_kana: 'エグザンプルカンパニー',
    home_page_url: 'https://example.com',
    post_code: '123-4567',
    address_line1: '123 Example St.',
    address_line2: 'Suite 101',
    phone_number: '012-345-6789',
    email: 'contact@example.com',
    establishment_date: '2020-01-01',
    total_employees: '100',
    annual_sales: '50000000',
    business_description: 'A leading e-commerce company.',
    industr: 'Retail',
    representative_name: 'John Doe',
    representative_name_kana: 'ジョン・ドウ',
    representative_birth_date: '1980-12-15',
    representative_post_code: '123-4567',
    representative_line_address1: '456 Representative Rd.',
    representative_line_address2: 'Building B',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    notes: 'This is an example note for the business.',
  },
};

// Example data following the structure of Data type
type Data = {
  client: {
    business_id: string;
    business_type: string;
    corporate_number: string;
    company_name: string;
    company_name_kana: string;
    home_page_url: string;
    post_code: string;
    address_line1: string;
    address_line2: string;
    phone_number: string;
    email: string;
    establishment_date: string;
    total_employees: string;
    annual_sales: string;
    business_description: string;
    industr: string;
    representative_name: string;
    representative_name_kana: string;
    representative_birth_date: string;
    representative_post_code: string;
    representative_line_address1: string;
    representative_line_address2: string;
    created_at: string;
    updated_at: string;
    notes: string;
  };
};

export function ClientDetail() {
  const t = useTranslations('Client');
  const btn = useTranslations('Button');
  const router = useRouter();

  function handleUpdate(event: React.FormEvent) {
    router.push('/admin/clients/edit');
  }

  function handleBack(event: React.FormEvent) {
    router.push('/admin/clients');
  }

  return (
    <div className="w-4/5 ">
      <h1 className="text-2xl">{t('client_detail')}</h1>
      <Card className="mt-10">
        <CardContent className="mt-6">
          <div>
            <div className="grid grid-rows-none grid-cols-1 gap-4">
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('business_id')}
                  </p>
                </div>
                <div>
                  <p> {data.client.business_id}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('business_type')}
                  </p>
                </div>
                <div>
                  <p> {data.client.business_type}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('corporate_number')}
                  </p>
                </div>
                <div>
                  <p> {data.client.corporate_number}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('company_name')}
                  </p>
                </div>
                <div>
                  <p> {data.client.company_name}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('company_name_kana')}
                  </p>
                </div>
                <div>
                  <p> {data.client.company_name_kana}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('home_page_url')}
                  </p>
                </div>
                <div>
                  <p> {data.client.home_page_url}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('post_code')}</p>
                </div>
                <div>
                  <p> {data.client.post_code}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('address_line1')}
                  </p>
                </div>
                <div>
                  <p> {data.client.address_line1}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('address_line2')}
                  </p>
                </div>
                <div>
                  <p> {data.client.address_line2}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('phone_number')}
                  </p>
                </div>
                <div>
                  <p> {data.client.phone_number}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('email')}</p>
                </div>
                <div>
                  <p> {data.client.email}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('establishment_date')}
                  </p>
                </div>
                <div>
                  <p> {data.client.establishment_date}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('total_employees')}
                  </p>
                </div>
                <div>
                  <p> {data.client.total_employees}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('annual_sales')}
                  </p>
                </div>
                <div>
                  <p> {data.client.annual_sales}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('business_description')}
                  </p>
                </div>
                <div>
                  <p> {data.client.business_description}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('industr')}</p>
                </div>
                <div>
                  <p> {data.client.industr}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('representative_name')}
                  </p>
                </div>
                <div>
                  <p> {data.client.representative_name}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('representative_name_kana')}
                  </p>
                </div>
                <div>
                  <p> {data.client.representative_name_kana}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('representative_birth_date')}
                  </p>
                </div>
                <div>
                  <p> {data.client.representative_birth_date}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('representative_post_code')}
                  </p>
                </div>
                <div>
                  <p> {data.client.representative_post_code}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('representative_line_address1')}
                  </p>
                </div>
                <div>
                  <p> {data.client.representative_line_address1}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {t('representative_line_address2')}
                  </p>
                </div>
                <div>
                  <p> {data.client.representative_line_address2}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('created_at')}</p>
                </div>
                <div>
                  <p> {data.client.created_at}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('updated_at')}</p>
                </div>
                <div>
                  <p> {data.client.updated_at}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{t('notes')}</p>
                </div>
                <div>
                  <p> {data.client.notes}</p>
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
        <Button className="w-20" onClick={handleUpdate}>
          {btn('update')}
        </Button>
      </div>
    </div>
  );
}
