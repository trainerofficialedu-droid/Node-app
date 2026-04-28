import React from 'react';

function MetricsPanel({ metrics }) {
  return (
    <div className="card glass">
      <h2>Live Server Metrics </h2>
      <p><strong>CPU Usage:</strong> {metrics.cpu}%</p>
      <p><strong>Memory Usage:</strong> {metrics.memory}%</p>
      <p><strong>Visitors Today:</strong> {metrics.visitors}</p>
      <p><strong>Total Deployments:</strong> {metrics.deployments}</p>
    </div>
  );
}

export default MetricsPanel;
