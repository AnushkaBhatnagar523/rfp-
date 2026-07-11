# Deployment Guide — Next.js with Persistent SQLite Backend

This guide outlines how to host your application on cloud hosting platforms with persistent database file storage.

---

## 1. Deploying to Render.com (Recommended)

Render is the easiest platform for this project as it supports persistent SSD disks connected to Web Services.

### Step 1: Create a Web Service
1. Sign in to [Render](https://render.com) and click **New > Web Service**.
2. Connect your GitHub/GitLab repository.
3. Configure settings:
   - **Language**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`

### Step 2: Configure Persistent Disk Mount
To prevent SQLite data loss during deploys:
1. Go to your Web Service dashboard on Render, click on **Disks** in the sidebar.
2. Click **Add Disk**:
   - **Name**: `sqlite-storage`
   - **Mount Path**: `/data`
   - **Size**: `1 GB` (More than enough for SQL entries and resumes)
3. Click **Save**.

### Step 3: Set Environment Variables
In your Render Service dashboard, click **Environment** and add:
- `SQLITE_DB_DIR` = `/data`
- `NODE_ENV` = `production`

---

## 2. Deploying to Railway.app

Railway offers dynamic container hosting with simple volume mounting.

### Step 1: Deploy from Github
1. Log in to [Railway](https://railway.app) and create a **New Project > Deploy from GitHub**.
2. Connect your repository.

### Step 2: Attach a Persistent Volume
1. Go to the project canvas, click **+ Add > Volume**.
2. Once the volume is created, open the service settings.
3. Go to **Variables** and add:
   - `SQLITE_DB_DIR` = `/data`
4. Go to **Settings > Volume** and mount the volume to `/data`.

---

## 3. Traditional VPS Hosting (DigitalOcean / AWS / Hostinger)

If you are running the service on a dedicated Linux VPS:

### Step 1: Setup PM2 Process Manager
1. Install Node.js v24+ on the server.
2. Clone this repository onto the server.
3. Run `npm install` and compile:
   ```bash
   npm run build
   ```
4. Install and configure **PM2** to keep the application running persistently:
   ```bash
   npm install -g pm2
   pm2 start npm --name "hans-foundation" -- run start
   pm2 save
   pm2 startup
   ```

### Step 2: Configure Reverse Proxy (Nginx)
Configure Nginx to route domain traffic to port `3000`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
