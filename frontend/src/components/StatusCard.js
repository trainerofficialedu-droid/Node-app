import React from 'react';

function StatusCard({ status }) {
  return (
    <div className="card glass">
      <h2> Environment Status </h2>
      <p><strong>Environment:</strong> {status.environment}</p>
      <p><strong>Server:</strong> {status.server}</p>
      <p><strong>Pipeline:</strong> {status.pipeline}</p>
      <p><strong>Uptime:</strong> {status.uptime}</p>
      <p><strong>Health:</strong> {status.status}</p>
    </div>
  );
}

export default StatusCard;
