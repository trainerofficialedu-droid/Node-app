import React from 'react';

function DeploymentTimeline({ deployments }) {
  return (
    <div className="card glass">
      <h2>Deployment Timeline </h2>
      {deployments.map(item => (
        <p key={item.id}> {item.message} — {item.time}</p>
      ))}
    </div>
  );
}

export default DeploymentTimeline;
