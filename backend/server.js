const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

/* STATUS API */
app.get('/api/status', (req, res) => {
  exec('pm2 jlist', (err, stdout) => {
    let pm2Status = 'Offline';

    if (!err && stdout) {
      try {
        const pm2Data = JSON.parse(stdout);
        pm2Status = pm2Data[0]?.pm2_env?.status || 'Offline';
      } catch {}
    }

    res.json({
      environment: 'Production',
      server: 'AWS EC2 Ubuntu Live',
      pipeline: 'GitHub Actions CI/CD Active',
      uptime: Math.floor(os.uptime() / 60) + ' mins',
      status: pm2Status === 'online' ? 'Healthy' : 'Warning'
    });
  });
});

/* METRICS API */
app.get('/api/metrics', (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMemPercent = (((totalMem - freeMem) / totalMem) * 100).toFixed(0);

  const cpuLoad = (os.loadavg()[0] * 25).toFixed(0);

  res.json({
    cpu: cpuLoad,
    memory: usedMemPercent,
    visitors: Math.floor(Math.random() * 2000) + 800,
    deployments: Math.floor(Math.random() * 50) + 15
  });
});

/* DEPLOYMENT TIMELINE API */
app.get('/api/deployments', (req, res) => {
  const now = new Date().toLocaleTimeString();

  res.json([
    { id: 1, message: 'Developer pushed latest commit to GitHub repository', time: now },
    { id: 2, message: 'GitHub Actions workflow triggered on main branch', time: now },
    { id: 3, message: 'AWS EC2 instance pulled newest application build', time: now },
    { id: 4, message: 'PM2 process manager restarted Node production server', time: now }
  ]);
});

/* REACT BUILD SERVE */
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));