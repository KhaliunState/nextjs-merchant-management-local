'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const router = useRouter();
  function handleSubmit() {
    router.push('/admin');
  }

  const t = useTranslations('Login');

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {t('description')}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">{t('password')}</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {t('forgot_password')}
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          {t('login')}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            {t('or_continue_with')}
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        {t('no_account')}{' '}
        <Link href="/auth/signup" className="underline underline-offset-4">
          {t('signup')}
        </Link>
      </div>
    </form>
  );
}
