import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import ContentTransformer from './components/ContentTransformer';
import './App.css';

function App() {
  const [contentType, setContentType] = useState('text');
  const [videoSessions, setVideoSessions] = useState(0);
  const [currentVideoProgress, setCurrentVideoProgress] = useState({});

  // Vídeos reais para teste (low dopamine)
  const lowDopamineVideos = [
    {
      id: 1,
      title: "Meditação Guiada 5 minutos",
      url: "https://www.youtube.com/watch?v=6jSIk0bdV7c",
      duration: "5:00",
      category: "mindfulness"
    },
    {
      id: 2,
      title: "Respiração Consciente",
      url: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
      duration: "4:30",
      category: "breathwork"
    },
    {
      id: 3,
      title: "Alongamento Suave",
      url: "https://www.youtube.com/watch?v=ImSNyBDEvoc",
      duration: "6:00",
      category: "movement"
    }
  ];

  const handleVideoProgress = (videoId, progress) => {
    setCurrentVideoProgress(prev => ({
      ...prev,
      [videoId]: Math.round(progress * 100)
    }));
  };

  const handleVideoEnded = (videoId) => {
    setVideoSessions(prev => prev + 1);
    alert('🎉 Vídeo concluído! Ótimo trabalho!');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🧠 Transformador Low Dopamine</h1>
        <p>Texto | Áudio | <span className="highlight">Vídeo</span> <span className="new-badge">NOVO</span></p>
        {contentType === 'video' && (
          <div className="stats">
            📹 Sessões completas: <strong>{videoSessions}</strong>
          </div>
        )}
      </header>

      <div className="content-selector">
        <button 
          className={contentType === 'text' ? 'active' : ''}
          onClick={() => setContentType('text')}
        >
          📝 Texto
        </button>
        <button 
          className={contentType === 'audio' ? 'active' : ''}
          onClick={() => setContentType('audio')}
        >
          🎧 Áudio
        </button>
        <button 
          className={contentType === 'video' ? 'active' : ''}
          onClick={() => setContentType('video')}
        >
          🎥 Vídeo
        </button>
      </div>

      <main className="main-content">
        {contentType === 'video' ? (
          <section className="video-section">
            <h2>Conteúdo Low Dopamine</h2>
            <div className="video-grid">
              {lowDopamineVideos.map(video => (
                <VideoPlayer
                  key={video.id}
                  video={video}
                  progress={currentVideoProgress[video.id] || 0}
                  onProgress={(progress) => handleVideoProgress(video.id, progress)}
                  onEnded={() => handleVideoEnded(video.id)}
                />
              ))}
            </div>
          </section>
        ) : (
          <ContentTransformer type={contentType} />
        )}
      </main>
    </div>
  );
}

export default App;