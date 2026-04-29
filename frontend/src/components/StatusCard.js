import React from 'react';
import { motion } from 'framer-motion';

function StatusCard({ status }) {
  return (
    <motion.div whileHover={{scale:1.03}} className="glass-card">
      <h2 className="section-title">Environment Status</h2>
      <p className="metric"><span className="live-dot"></span><strong>Environment:</strong> {status.environment}</p>
      <p className="metric"><strong>Server:</strong> {status.server}</p>
      <p className="metric"><strong>Pipeline:</strong> {status.pipeline}</p>
      <p className="metric"><strong>Uptime:</strong> {status.uptime}</p>
      <p className="metric"><strong>Health:</strong> {status.status}</p>
    </motion.div>
  );
}

export default StatusCard;