import React from 'react';
import { Handle } from 'reactflow';

const NodeComponent = ({ data }) => {
  return (
    <div style={{
      padding: 10,
      border: '1px solid #777',
      borderRadius: 5,
      background: '#fff',
      width: 500,
      height: 250
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: 5, textAlign: 'center', fontSize: '20px' }}>
        {data.description}
      </div>
      <div style={{ marginBottom: 3, textAlign: 'left', fontSize: '17px' }}>
        {data.label1}
      </div>
      <div style={{ marginBottom: 3, textAlign: 'left', fontSize: '17px' }}>
        {data.label2}
      </div>
      <div style={{ marginBottom: 3, textAlign: 'left', fontSize: '17px' }}>
        {data.label3}
      </div>
      <div style={{ marginBottom: 3, textAlign: 'left', fontSize: '17px' }}>
        {data.label4}
      </div>
      <div style={{ marginBottom: 3, textAlign: 'left', fontSize: '17px' }}>
        {data.label5}
      </div>
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default NodeComponent;

