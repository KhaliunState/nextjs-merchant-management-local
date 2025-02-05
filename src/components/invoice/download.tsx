'use client';
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Image from 'next/image';
import { Button } from '../ui/button';
import { DownloadIcon, PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Invoice from '@/app/[locale]/admin/invoices/page';
import { DropdownMenuItem } from '../ui/dropdown-menu';


export default function DownloadInvoice({
  isButton,
  setIsDownloadedDialogOpen,
}: {
  isButton: boolean;
  setIsDownloadedDialogOpen: (isOpen: boolean) => void;
}) {
  const i = useTranslations('Invoice');
  const c = useTranslations('Client');
  async function downloadPDF() {
    const doc = new jsPDF();
    const margin = 20;

    const fontResponse = await fetch('/assets/fonts/font-base64.txt');
    let base64Font = await fontResponse.text();
    doc.addFileToVFS('NotoSansJP-VariableFont_wght.ttf', base64Font);
    doc.addFont('NotoSansJP-VariableFont_wght.ttf', 'NotoSans', 'normal');
    doc.setFont('NotoSans');

    doc.setFontSize(18);
    doc.text(`${i('invoice')}`, margin, 20);

    doc.setFontSize(12);
    doc.text(`${c('client_id')} : 0004`, margin, 30);
    doc.text(`${c('client_name')} : AEON`, margin, 40);
    doc.text(`${c('address')} : Address Line 1, Address Line 2`, margin, 50);
    doc.text(`${c('email')} : customer@example.com`, margin, 60);

    // Invoice Information
    doc.setFontSize(14);
    doc.text(`${i('invoice_info')}`, margin, 80);
    doc.setFontSize(12);
    doc.text(`${i('invoice_id')} : 1004`, margin, 90);
    doc.text(`${i('invoice_date')}: 2025/01/17`, margin, 100);
    doc.text(`${i('due_date')}: 2025/01/19`, margin, 110);
    doc.text(`${i('status')}: failed`, margin, 120);

    doc.setLineWidth(0.5);
    doc.line(margin, 130, 200, 130);

    doc.setFontSize(14);
    doc.text(`${i('itemized_charges')}`, margin, 140);
    doc.setFontSize(12);

    doc.text(`${i('description')}`, margin, 150);
    doc.text(`${i('amount')}`, 150, 150);

    const items = [
      { description: `${i('storage_fee')}`, amount: '¥150' },
      { description: `${i('tax')}`, amount: '¥1200' },
      { description: `${i('total')}`, amount: '¥1350' },
    ];

    let yPos = 160;
    items.forEach((item) => {
      doc.text(item.description, margin, yPos);
      doc.text(item.amount, 150, yPos);
      yPos += 10;
    });

    doc.setLineWidth(0.5);
    doc.line(margin, yPos + 10, 200, yPos + 10);

    doc.setFontSize(14);
    doc.text(`${i('total_amount_due')}`, margin, yPos + 20);
    doc.setFontSize(12);
    doc.text(`${i('total')}: ¥1350`, margin, yPos + 30);

    doc.setFontSize(10);
    doc.text('Thank you for your business!', margin, yPos + 50);
    doc.text(
      'Please make your payment by the due date to avoid any interruptions in service.',
      margin,
      yPos + 60,
    );
    doc.text('For any inquiries, contact support@aws.com', margin, yPos + 70);

    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
    // setIsDownloadedDialogOpen(true);
  }

  return (
    <div>
      {isButton === true ? (
        <Button className="float-right" onClick={downloadPDF}>
          <DownloadIcon />
          {i('download')}
        </Button>
      ) : (
        <DropdownMenuItem onClick={downloadPDF}>
          <DownloadIcon />
          {i('download')}
        </DropdownMenuItem>
      )}
    </div>
  );
}
