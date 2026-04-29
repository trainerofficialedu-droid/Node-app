import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import StatusCard from './components/StatusCard';
import MetricsPanel from './components/MetricsPanel';
import DeploymentTimeline from './components/DeploymentTimeline';
import './App.css';

function App() {
  const [status, setStatus] = useState({});
  const [metrics, setMetrics] = useState({});
  const [deployments, setDeployments] = useState([]);

  const fetchData = async () => {
    const statusRes = await axios.get('/api/status');
    const metricsRes = await axios.get('/api/metrics');
    const deployRes = await axios.get('/api/deployments');

    setStatus(statusRes.data);
    setMetrics(metricsRes.data);
    setDeployments(deployRes.data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <motion.h1 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }}
        className="main-title"
      >
        AWS DevOps Live Monitoring Dashboard
      </motion.h1>

      <div className="grid-layout">
        <StatusCard status={status} />
        <MetricsPanel metrics={metrics} />
      </div>

      <DeploymentTimeline deployments={deployments} />
    </div>
  );
}

export default App;