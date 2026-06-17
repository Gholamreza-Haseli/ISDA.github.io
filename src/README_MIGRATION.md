# راهنمای مهاجرت از Base44 به Supabase + Vercel

## ۱. نصب پکیج‌ها (در terminal پروژه)
```bash
npm install @supabase/supabase-js
```

## ۲. ساخت فایل `.env` در root پروژه
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```
این فایل را به `.gitignore` اضافه کن تا به GitHub push نشه.

## ۳. ساخت جداول در Supabase
SQL Editor در Supabase را باز کن و فایل `supabase_schema.sql` را اجرا کن.

## ۴. Environment Variables در Vercel
در داشبورد Vercel → Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `RESEND_API_KEY` (از resend.com بگیر)

## ۵. ایمیل
در فایل `api/send-email.js` مقدار `from` را به دامنه تایید شده‌ات تغییر بده:
```
from: 'ISDA <noreply@isda.org>'
``
