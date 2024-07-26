// PaperSearch.jsx
import React, { useState } from 'react';

// 예시 데이터
const searchPapers = async (keyword) => {
  // 여기에 실제 논문 검색 API 호출 코드 삽입
  return [
    { id: '1', title: '논문 1', abstract: '논문 1의 초록' },
    { id: '2', title: '논문 2', abstract: '논문 2의 초록' },
  ];
};

const PaperSearch = ({ onSelectPaper }) => {
  const [keyword, setKeyword] = useState('');
  const [papers, setPapers] = useState([]);

  const handleSearch = async () => {
    const results = await searchPapers(keyword);
    setPapers(results);
  };

  return (
    <div>
      <input 
        type="text" 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)} 
        placeholder="키워드 입력" 
      />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {papers.map(paper => (
          <li key={paper.id} onClick={() => onSelectPaper(paper)}>
            {paper.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaperSearch;

