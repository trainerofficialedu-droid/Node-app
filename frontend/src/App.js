import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import StatusCard from './components/StatusCard';
import MetricsPanel from './components/MetricsPanel';
import DeploymentTimeline from './components/DeploymentTimeline';

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
    <div className="container">
      <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="title">
        DevOps Monitoring Dashboard 
      </motion.h1>

      <StatusCard status={status} />
      <MetricsPanel metrics={metrics} />
      <DeploymentTimeline deployments={deployments} />
    </div>
  );
}

export default App;