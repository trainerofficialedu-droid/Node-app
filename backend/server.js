const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.get('/api/status', (req, res) => {
  res.json({
    environment: 'Production',
    server: 'AWS EC2 Ubuntu Live',
    pipeline: 'GitHub Actions Connected',
    uptime: process.uptime().toFixed(0) + ' sec',
    status: 'Healthy'
  });
});

app.get('/api/metrics', (req, res) => {
  res.json({
    cpu: Math.floor(Math.random() * 40) + 20,
    memory: Math.floor(Math.random() * 30) + 35,
    visitors: Math.floor(Math.random() * 1000) + 500,
    deployments: Math.floor(Math.random() * 20) + 10
  });
});

app.get('/api/deployments', (req, res) => {
  const now = new Date().toLocaleTimeString();

  res.json([
    { id: 1, message: 'Developer pushed code to GitHub', time: now },
    { id: 2, message: 'GitHub Actions pipeline executed', time: now },
    { id: 3, message: 'EC2 server synchronized latest commit', time: now },
    { id: 4, message: 'PM2 restarted application successfully', time: now }
  ]);
});

/* serve react production build */
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
