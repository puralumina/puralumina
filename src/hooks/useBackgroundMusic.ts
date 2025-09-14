import { useEffect, useRef } from 'react';

interface UseBackgroundMusicOptions {
  volume?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export const useBackgroundMusic = (
  musicPath: string,
  options: UseBackgroundMusicOptions = {}
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { volume = 0.3, fadeInDuration = 1000, fadeOutDuration = 500 } = options;

  const fadeIn = (audio: HTMLAudioElement, targetVolume: number, duration: number) => {
    audio.volume = 0;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      
      if (currentStep >= steps && fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, stepTime);
  };

  const fadeOut = (audio: HTMLAudioElement, duration: number) => {
    const startVolume = audio.volume;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);
      
      if (currentStep >= steps && fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        audio.pause();
      }
    }, stepTime);
  };

  useEffect(() => {
    if (!musicPath) return;

    // Create audio element
    const audio = new Audio(musicPath);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Handle user interaction requirement for autoplay
    const playAudio = async () => {
      try {
        await audio.play();
        fadeIn(audio, volume, fadeInDuration);
      } catch (error) {
        console.log('Autoplay prevented, waiting for user interaction');
        
        // Add click listener to start music on first user interaction
        const handleFirstInteraction = async () => {
          try {
            await audio.play();
            fadeIn(audio, volume, fadeInDuration);
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
          } catch (err) {
            console.error('Failed to play audio:', err);
          }
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
      }
    };

    playAudio();

    // Cleanup function
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      
      if (audioRef.current) {
        fadeOut(audioRef.current, fadeOutDuration);
        
        // Clean up after fade out
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
          }
        }, fadeOutDuration + 100);
      }
    };
  }, [musicPath, volume, fadeInDuration, fadeOutDuration]);

  return audioRef.current;
};