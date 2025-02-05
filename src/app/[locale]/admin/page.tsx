'use client';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useTranslations } from 'next-intl';
import { Stepper2 } from '@/components/dashboard/stepper-like-button';
import { WarningBadge } from '@/components/dashboard/warning-badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';

const chartData = [
  { date: '2024-04-01', client: 150 },
  { date: '2024-04-02', client: 180 },
  { date: '2024-04-03', client: 120 },
  { date: '2024-04-04', client: 260 },
  { date: '2024-04-05', client: 290 },
  { date: '2024-04-06', client: 340 },
  { date: '2024-04-07', client: 180 },
  { date: '2024-04-08', client: 320 },
  { date: '2024-04-09', client: 110 },
  { date: '2024-04-10', client: 190 },
  { date: '2024-04-11', client: 350 },
  { date: '2024-04-12', client: 210 },
  { date: '2024-04-13', client: 380 },
  { date: '2024-04-14', client: 220 },
  { date: '2024-04-15', client: 170 },
  { date: '2024-04-16', client: 190 },
  { date: '2024-04-17', client: 360 },
  { date: '2024-04-18', client: 410 },
  { date: '2024-04-19', client: 180 },
  { date: '2024-04-20', client: 150 },
  { date: '2024-04-21', client: 200 },
  { date: '2024-04-22', client: 170 },
  { date: '2024-04-23', client: 230 },
  { date: '2024-04-24', client: 290 },
  { date: '2024-04-25', client: 250 },
  { date: '2024-04-26', client: 130 },
  { date: '2024-04-27', client: 420 },
  { date: '2024-04-28', client: 180 },
  { date: '2024-04-29', client: 240 },
  { date: '2024-04-30', client: 380 },
  { date: '2024-05-01', client: 220 },
  { date: '2024-05-02', client: 310 },
  { date: '2024-05-03', client: 190 },
  { date: '2024-05-04', client: 420 },
  { date: '2024-05-05', client: 390 },
  { date: '2024-05-06', client: 520 },
  { date: '2024-05-07', client: 300 },
  { date: '2024-05-08', client: 210 },
  { date: '2024-05-09', client: 180 },
  { date: '2024-05-10', client: 330 },
  { date: '2024-05-11', client: 270 },
  { date: '2024-05-12', client: 240 },
  { date: '2024-05-13', client: 160 },
  { date: '2024-05-14', client: 490 },
  { date: '2024-05-15', client: 380 },
  { date: '2024-05-16', client: 400 },
  { date: '2024-05-17', client: 420 },
  { date: '2024-05-18', client: 350 },
  { date: '2024-05-19', client: 180 },
  { date: '2024-05-20', client: 230 },
  { date: '2024-05-21', client: 140 },
  { date: '2024-05-22', client: 120 },
  { date: '2024-05-23', client: 290 },
  { date: '2024-05-24', client: 220 },
  { date: '2024-05-25', client: 250 },
  { date: '2024-05-26', client: 170 },
  { date: '2024-05-27', client: 460 },
  { date: '2024-05-28', client: 190 },
  { date: '2024-05-29', client: 130 },
  { date: '2024-05-30', client: 280 },
  { date: '2024-05-31', client: 230 },
  { date: '2024-06-01', client: 200 },
  { date: '2024-06-02', client: 410 },
  { date: '2024-06-03', client: 160 },
  { date: '2024-06-04', client: 380 },
  { date: '2024-06-05', client: 140 },
  { date: '2024-06-06', client: 250 },
  { date: '2024-06-07', client: 370 },
  { date: '2024-06-08', client: 320 },
  { date: '2024-06-09', client: 480 },
  { date: '2024-06-10', client: 200 },
  { date: '2024-06-11', client: 150 },
  { date: '2024-06-12', client: 420 },
  { date: '2024-06-13', client: 130 },
  { date: '2024-06-14', client: 380 },
  { date: '2024-06-15', client: 350 },
  { date: '2024-06-16', client: 310 },
  { date: '2024-06-17', client: 520 },
  { date: '2024-06-18', client: 170 },
  { date: '2024-06-19', client: 290 },
  { date: '2024-06-20', client: 450 },
  { date: '2024-06-21', client: 210 },
  { date: '2024-06-22', client: 270 },
  { date: '2024-06-23', client: 530 },
  { date: '2024-06-24', client: 180 },
  { date: '2024-06-25', client: 190 },
  { date: '2024-06-26', client: 380 },
  { date: '2024-06-27', client: 490 },
  { date: '2024-06-28', client: 200 },
  { date: '2024-06-29', client: 160 },
  { date: '2024-06-30', client: 400 },
];
const chartConfig = {
  views: {
    label: 'Page Views',
  },
  client: {
    label: 'sales_chart',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const t = useTranslations('Dashboard');
  const sm = useTranslations('SideMenu');
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('client');
  const total = React.useMemo(
    () => ({
      client: chartData.reduce((acc, curr) => acc + curr.client, 0),
    }),
    [],
  );
  const [pending, setPending] = React.useState(13);
  const [failed, setFailed] = React.useState(13);
  const [completed, setCompleted] = React.useState(13);

  React.useEffect(() => {
    const pendingTimer = setTimeout(() => setPending(30), 500);
    const failedTimer = setTimeout(() => setFailed(70), 500);
    const completedTimer = setTimeout(() => setCompleted(100), 500);
    return () => {
      clearTimeout(pendingTimer);
      clearTimeout(failedTimer);
      clearTimeout(completedTimer);
    };
  }, []);
  const router = useRouter();

  const [showDialog, setShowDialog] = React.useState(false);
  const getTemporaryData = () => {
    const data = sessionStorage.getItem("isNewUser");
    return data ? JSON.parse(data) : true;
  };
  function handleCreateClient() {
    router.push('/admin/client/create');
  }

  useEffect(() => {
    const hasShownDialog = sessionStorage.getItem("hasShownDialog");
    if (!hasShownDialog) {
      setShowDialog(true);
      sessionStorage.setItem("hasShownDialog", "true");
    }
  }, []);

  return (
    
    <div>
      <div className="flex flex-col items-start space-y-2">
        {/* <div className="w-auto">
          <ErrorBadge />
        </div> */}
        <div className="w-auto">
          <WarningBadge />
        </div>
      </div>
      <div>
        <div className="border border-gray-300 rounded-xl shadow p-4">
          <Stepper2 />
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-2 py-4">
          <div className="basis-1/4">
            <Card>
              <CardHeader>
                <p>{t('total_sales_current_month')}</p>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">13,500万円</p>
                <p className="text-xs">+21%↑先月から</p>
              </CardContent>
            </Card>
          </div>
          <div className="basis-1/4">
            <Card>
              <CardHeader>
                <p>{t('total_sales_same_period_last_month')}</p>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">+1200</p>
                <p className="text-xs">+180%↑先月から</p>
              </CardContent>
            </Card>
          </div>
          <div className="basis-1/4">
            <Card>
              <CardHeader>
                <p>{t('budgeted_sales_current_month')}</p>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">+1500万円</p>
                <p className="text-xs">+5%↑先月から</p>
              </CardContent>
            </Card>
          </div>
          <div className="basis-1/4">
            <Card>
              <CardHeader>
                <p>{t('total_sales_last_month')}</p>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">+1500万円</p>
                <p className="text-xs">+5%↑先月から</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* <div>
        <div className="flex flex-row mt-5 mb-5">
          <div className="basis-1/3">
            <div className="flex">
              <div className="flex-shrink-0 w-auto">
                <CircleDotIcon className="w-[40px] h-[40px] stroke-blue-700" />
              </div>

              <div className="ml-4 w-full">
                <div>
                  <strong className="text-xl pr-2">30%</strong>
                  {t('review_pending')}
                </div>
                <div className="mt-1">
                  <Progress value={pending} />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1/3">
            <div className="flex">
              <div className="flex-shrink-0 w-auto">
                <CircleXIcon className="w-[40px] h-[40px] stroke-red-500" />
              </div>

              <div className="ml-4 w-full">
                <div>
                  <strong className="text-xl pr-2">70%</strong>
                  {t('review_rejected')}
                </div>
                <div className="mt-1">
                  <Progress value={failed} />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1/3">
            <div className="flex">
              <div className="flex-shrink-0 w-auto">
                <CircleCheckIcon className="w-[40px] h-[40px] stroke-green-700" />
              </div>

              <div className="ml-4 w-full">
                <div>
                  <strong className="text-xl pr-2">100%</strong>
                  {t('review_completed')}
                </div>
                <div className="mt-1">
                  <Progress value={completed} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>{t('sales_chart')}</CardTitle>
            <CardDescription>{t('last_6_months')}</CardDescription>
          </div>
          <div className="flex">
            {['client'].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {t(chartConfig[chart].label)}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Dialog
        open={showDialog}
        onOpenChange={setShowDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('pls_create_client')}</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              加盟店作成は、自社のブランドやサービスを提供するために他の事業者と提携することです。主な流れは、契約条件の設定、加盟店の募集・選定、契約締結、サポートと立ち上げ支援、運営支援、そしてロイヤリティの収集です。成功するためには、明確な契約内容と適切なサポート体制を整え、加盟店の成功をサポートすることが重要です。
            </p>
          </div>
          <DialogFooter>
            <div>
              <Button onClick={handleCreateClient}>
                {sm('create_client')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
