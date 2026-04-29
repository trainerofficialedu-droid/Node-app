import React from 'react';
import { motion } from 'framer-motion';

function DeploymentTimeline({ deployments }) {
  return (
    <motion.div 
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="glass-card"
    >
      <h2 className="section-title">Deployment Activity Timeline</h2>
      {deployments.map(item => (
        <div key={item.id} className="timeline-item">
          {item.message} — <strong>{item.time}</strong>
        </div>
      ))}
    </motion.div>
  );
}

export default DeploymentTimeline;