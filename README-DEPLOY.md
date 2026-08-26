# Hướng dẫn Deploy lên Vercel

## Bước 1: Tạo tài khoản Vercel
- Vào https://vercel.com → Sign up (dùng GitHub cho dễ)

## Bước 2: Push code lên GitHub
```bash
cd /home/z/my-project
git init
git add .
git commit -m "Initial commit - HSK vocab learning app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hsk-vocab-app.git
git push -u origin main
```

## Bước 3: Tạo database PostgreSQL miễn phí
### Option A: Neon (khuyên dùng - free 0.5GB)
1. Vào https://neon.tech → Sign up
2. Create new project → "hsk-vocab"
3. Copy connection string: `postgresql://user:pass@host/db?sslmode=require`

### Option B: Supabase (free 500MB)
1. Vào https://supabase.com → Sign up
2. New project → "hsk-vocab"
3. Settings → Database → Connection string
4. Copy: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### Option C: Vercel Postgres (free)
1. Vercel Dashboard → Storage → Create Database → Postgres
2. Copy connection string

## Bước 4: Import project vào Vercel
1. Vào https://vercel.com/new
2. Import Git Repository → chọn "hsk-vocab-app"
3. Configure Project:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (đã có sẵn)
   - Install Command: `npm install`

## Bước 5: Set Environment Variables
Trong Vercel project settings → Environment Variables:
- Name: `DATABASE_URL`
- Value: `postgresql://...` (từ Bước 3)
- Environment: Production, Preview, Development (chọn tất cả)

## Bước 6: Deploy
- Click "Deploy"
- Đợi 2-3 phút build xong
- Vercel sẽ tự chạy `prisma generate` + `next build`

## Bước 7: Tạo bảng DB
Sau khi deploy xong, chạy lệnh:
```bash
# Cài Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
cd /home/z/my-project
vercel link

# Push schema lên DB
npx prisma db push
```

## Bước 8: Truy cập web
- Vercel sẽ cấp domain: `https://hsk-vocab-app.vercel.app`
- Web chạy ổn định 24/7, không lo crash!

## Lưu ý
- **Vercel free tier**: 100GB bandwidth/tháng, đủ dùng
- **Neon/Supabase free**: 500MB DB, đủ cho hàng nghìn users
- **Auto-deploy**: mỗi khi push code lên GitHub, Vercel tự rebuild
- **Custom domain**: có thể thêm domain riêng (vd: hsk.mysite.com)

## Troubleshooting
- Lỗi build: check Vercel build logs
- Lỗi DB: check DATABASE_URL đúng chưa
- Lỗi 500: check function logs trong Vercel dashboard
