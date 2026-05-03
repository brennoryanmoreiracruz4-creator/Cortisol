import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const VideoPlayer = ({ video, progress, onProgress, onEnded }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handleProgress = (state) => {
    onProgress(state.played);
  };

  return (
    <div className="video-player-container">
      <div className="video-header">
        <h3>{video.title}</h3>
        <span className="duration">{video.duration}</span>
      </div>
      
      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          url={video.url}
          playing={isPlaying}
          controls={true}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onEnded={onEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          config={{
            youtube: {
              playerVars: { 
                modestbranding: 1,
                rel: 0,
                showinfo: 0
              }
            }
          }}
          progressInterval={100}
        />
      </div>
      
      <div className="video-footer">
        <div className="progress-display">
          Progresso: <strong>{progress}%</strong>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;