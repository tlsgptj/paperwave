"use client";

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeDragHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeComponent from './NodeComponent.jsx';
import PaperSearch from './PaperSearch.jsx';

// 노드와 엣지의 기본 데이터
const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    data: {
      label1: '[YOLO]',
      label2: '- 객체 검출을 단일 신경망으로 통합하여 단순하고 빠름',
      label3: '- 실시간으로 고속 처리 가능, 높은 정확도를 유지',
      label4: '- 높은 정확도 유지, 실용적 응용 가능',
      label5: '- 다양한 도메인에서 높은 성능 발휘',
      description: '핵심요약'
    },
    position: { x: 1700, y: -170 },
  },
  {
    id: '2',
    type: 'customNode',
    data: {
      label1: '- 단일 이미지 깊이 추정 작업에서 어려운 데이터를 다루기 위한 새로운 접근 방식',
      label2: '- 텍스트-이미지 확산 모델을 활용 -> 사용자 정의 장면 생성',
      label3: '- 이러한 접근 방식은 기존 단일 이미지 깊이 네트워크를 세밀하게 조정',
      label4: '- 다양한 환경에서 효과적인 성능을 발휘',
      label5: '',
      description: 'Abstract'
    },
    position: { x: 1300, y: 200},
  },
  {
    id: '3',
    type: 'customNode',
    data: {
      label1: '- 기존의 객체 검출 방법을 재구성하여 단일 신경망으로 전체 이미지 전달',
      label2: '- 초당 45프레임을 처리, 작은 버전인 Fast YOLO는 초당 155프레임을 처리',
      label3: '- 다른 실시간 검출기 대비 두 배 이상의 MAP를 달성',
      label4: '- 일반화 능력 뛰어나, 자연 이미지 외의 예술 작품 등에서도 높은 성능 발휘',
      label5: '',
      description: '주요 성과'
    },
    position: { x: 1300, y: 500 },
  },
  {
    id: '4',
    type: 'customNode',
    data: {
      label1: '- PASCAL VOC 2007 및 2012 데이터셋을 사용',
      label2: '- 네트워크는 24개의 합성곱 층과 2개의 완전 연결 층으로 구성',
      label3: '- ImageNet 1000-class competition dataset을 사용하여 초기 합성곱 층을 사전 훈련',
      label4: '- Darknet 프레임워크를 사용하여 훈련 및 추론을 수행',
      label5: '',
      description: '실험 환경 및 방법'
    },
    position: { x: 1300, y: 800 },
  },
  {
    id: '5',
    type: 'customNode',
    data: {
      label1: '- PASCAL VOC 데이터셋에서의 높은 mAP와 실시간 처리 성능으로 결과의 신뢰성이 높음',
      label2: '- 다양한 도메인에서의 성능 검증을 통해 모델의 일반화 능력을 확인',
      label3: '',
      label4: '',
      label5: '',
      description: '결과의 신뢰성'
    },
    position: { x: 1300, y: 1100 },
  },
  {
    id: '6',
    type: 'customNode',
    data: {
      label1: '- 객체 검출을 위한 통합 모델',
      label2: '- 단순하고 전체 이미지를 직접 학습',
      label3: '- 실시간 객체 검출에서 최고 성능을 발휘',
      label4: '- 새로운 도메인에서도 잘 일반화',
      label5: '- 다양한 실제 응용 분야에 적용하여 빠르고 견고한 객체 검출 시스템을 구축할 계획',
      description: 'Conclusion'
    },
    position: { x: 2000, y: 200 },
  },
  {
    id: '7',
    type: 'customNode',
    data: {
      label1: '- 객체 검출을 단일 신경망으로 통합하여 단순하고 빠른 검출 방법을 제안',
      label2: '- 실시간으로 고속 처리 가능',
      label3: '- 높은 정확도를 유지하여 실용적인 응용 가능성이 큼',
      label4: '',
      label5: '',
      description: '논문의 중요성'
    },
    position: { x: 2000, y: 500 },
  },
  {
    id: '8',
    type: 'customNode',
    data: {
      label1: '- 작은 객체를 정확히 위치 파악하는 데 어려움이 있음',
      label2: '- 새로운 또는 비정형적인 객체에 대해 일반화가 어려울 수 있음',
      label3: '',
      label4: '',
      label5: '',
      description: '논문의 한계'
    },
    position: { x: 2000, y: 800 },
  },
  {
    id: '9',
    type: 'customNode',
    data: {
      label1: '- 다양한 도메인에서 높은 성능을 발휘',
      label2: '- 특히 예술 작품 등의 새로운 도메인에서도 우수한 성능을 보임',
      label3: '- 실시간 응용 분야에서 활용도가 높아 다양한 산업에 기여할 가능성이 큼',
      label4: '',
      label5: '',
      description: '논문의 가치'
    },
    position: { x: 2000, y: 1100 },
  },
  {
    id: '10',
    type: 'customNode',
    data: {
      label1: '- 객체 검출을 단순 회귀 문제로 재구성',
      label2: '- 효율적인 검출 시스템을 구현',
      label3: '- 다양한 데이터셋을 사용하여 모델의 성능을 철저히 검증',
      label4: '',
      label5: '',
      description: '연구 방법론의 적절성'
    },
    position: { x: 2000, y: 1400 },
  },
  {
    id: '11',
    type: 'customNode',
    data: {
      label1: '- 논문은 논리적으로 잘 구성되어 있음',
      label2: '- 각 섹션이 명확하게 구분',
      label3: '- 실험 방법과 결과가 상세히 설명',
      label4: '- 다른 연구자가 재현하기 용이',
      label5: '',
      description: '논문의 체계성'
    },
    position: { x: 2000, y: 1700 },
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e1-6', source: '1', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e6-8', source: '7', target: '8', animated: true },
  { id: 'e6-9', source: '8', target: '9', animated: true },
  { id: 'e6-10', source: '9', target: '10', animated: true },
  { id: 'e10-11', source: '10', target: '11', animated: true }
];

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDrag: NodeDragHandler = (_, node) => {
    setPosition(node.position);
  };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        nodeTypes={{ customNode: NodeComponent }}
        style={{ width: '100%', height: '100%' }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        X: {position.x.toFixed(2)}, Y: {position.y.toFixed(2)}
      </div>
    </div>
  );
};

export default App;

