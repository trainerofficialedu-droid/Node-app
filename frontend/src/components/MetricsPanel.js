import React from 'react';
import { motion } from 'framer-motion';

function MetricsPanel({ metrics }) {
  return (
    <motion.div whileHover={{scale:1.03}} className="glass-card">
      <h2 className="section-title">Live Server Metrics</h2>
      <p className="metric"><strong>CPU Usage:</strong> {metrics.cpu}%</p>
      <p className="metric"><strong>Memory Usage:</strong> {metrics.memory}%</p>
      <p className="metric"><strong>Visitors Today:</strong> {metrics.visitors}</p>
      <p className="metric"><strong>Total Deployments:</strong> {metrics.deployments}</p>
    </motion.div>
  );
}

export default MetricsPanel;