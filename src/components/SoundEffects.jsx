import React, { useEffect, useRef, useCallback } from 'react';

const SoundEffects = ({ isSoundEnabled }) => {
  const audioContext = useRef(null);

  const playSound = useCallback((frequency, duration) => {
    if (!isSoundEnabled || !audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + duration);
  }, [isSoundEnabled]);

  const playHoverSound = useCallback(() => {
    playSound(800, 0.1);
  }, [playSound]);

  const playScrollSound = useCallback(() => {
    playSound(400, 0.15);
  }, [playSound]);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();

    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        playScrollSound();
      }, 150);
    };

    document.addEventListener('mouseover', playHoverSound);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseover', playHoverSound);
      window.removeEventListener('scroll', handleScroll);
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [playHoverSound, playScrollSound]);

  return null;
};

export default SoundEffects;
