import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { useTranslations } from 'next-intl';
import { Button } from '../../ui/button';

type Data = {
  site: {
    site_id: string;
    site_name: string;
    url: string;
    client_id: string;
    created_at: string;
    status: string;
  };
  psp: {
    psp_id: string;
    key: string;
    shared_secret: string;
    connector_label: string;
    acquirer_bin: string;
    acquirer_merchant_id: string;
    acquirer_country_code: string;
    source_verification_code: string;
  };
};

// Example data following the structure of Data type
const data: Data = {
  site: {
    site_id: '0001',
    site_name: 'AEON',
    url: 'https://aeon.jp',
    client_id: '1001',
    created_at: '2025/01/14',
    status: 'pending',
  },
  psp: {
    psp_id: '2001',
    key: 'sample-key',
    shared_secret: 'sample-secret',
    connector_label: 'AEON-Connector',
    acquirer_bin: '123456',
    acquirer_merchant_id: '987654',
    acquirer_country_code: 'JP',
    source_verification_code: 'abc123',
  },
};

export function SiteConfirmation({
  setActiveStep,
  setIsDialogOpen,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations('Site');
  const btn = useTranslations('Buttons');
  function handleSubmit(event: React.FormEvent) {
    setActiveStep(4);
    setIsDialogOpen(true);
  }
  function handleBack(event: React.FormEvent) {
    setActiveStep(2);
  }

  return (
    <>
      <div>
        <Accordion
          type="single"
          defaultValue="item-1"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>{t('site_info')}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-rows-5 grid-flow-col gap-4">
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('site_name')}</strong>
                  </div>
                  <div>
                    <p> {data.site.site_name}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('url')}</strong>
                  </div>
                  <div>
                    <p> {data.site.url}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('client_id')}</strong>
                  </div>
                  <div>
                    <p> {data.site.client_id}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('created_at')}</strong>
                  </div>
                  <div>
                    <p> {data.site.created_at}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('status')}</strong>
                  </div>
                  <div>
                    <p> {data.site.status}</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion
          type="single"
          defaultValue="item-2"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-2">
            <AccordionTrigger>{t('psp_info')}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-rows-8 grid-flow-col gap-4">
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('psp_id')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.psp_id}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('key')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.key}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('shared_secret')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.shared_secret}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('connector_label')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.connector_label}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('acquirer_bin')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.acquirer_bin}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('acquirer_merchant_id')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.acquirer_merchant_id}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('acquirer_country_code')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.acquirer_country_code}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-80">
                    <strong>{t('source_verification_code')}</strong>
                  </div>
                  <div>
                    <p> {data.psp.source_verification_code}</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-10 flex justify-end  gap-4">
          <Button onClick={handleBack} className="w-20" variant="secondary">
            {btn('back')}
          </Button>
          <Button onClick={handleSubmit} className="w-20">
            {btn('create')}
          </Button>
        </div>
      </div>
    </>
  );
}
