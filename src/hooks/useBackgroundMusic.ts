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
  const isCleaningUpRef = useRef(false);
  const { volume = 0.3, fadeInDuration = 1000, fadeOutDuration = 500 } = options;

  const fadeIn = (audio: HTMLAudioElement, targetVolume: number, duration: number) => {
    if (isCleaningUpRef.current) return;
    audio.volume = 0;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (isCleaningUpRef.current) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        return;
      }
      
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      
      if (currentStep >= steps && fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, stepTime);
  };

  const fadeOut = (audio: HTMLAudioElement, duration: number) => {
    if (isCleaningUpRef.current) return;
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
        audio.currentTime = 0;
      }
    }, stepTime);
  };

  useEffect(() => {
    if (!musicPath) return;

    // Reset cleanup flag
    isCleaningUpRef.current = false;

    // Create audio element
    const audio = new Audio(musicPath);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Handle user interaction requirement for autoplay
    const playAudio = async () => {
      try {
        if (isCleaningUpRef.current) return;
        await audio.play();
        fadeIn(audio, volume, fadeInDuration);
      } catch (error) {
        console.log('Autoplay prevented, waiting for user interaction');
        
        // Add click listener to start music on first user interaction
        const handleFirstInteraction = async () => {
          try {
            if (isCleaningUpRef.current) return;
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
        
        // Store cleanup function for event listeners
        const cleanup = () => {
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        };
        
        // Store cleanup in audio element for later use
        (audio as any)._eventCleanup = cleanup;
      }
    };

    playAudio();

    // Cleanup function
    return () => {
      // Set cleanup flag to prevent any new operations
      isCleaningUpRef.current = true;
      
      // Clear any ongoing fade intervals
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      
      // Clean up event listeners if they exist
      if (audioRef.current && (audioRef.current as any)._eventCleanup) {
        (audioRef.current as any)._eventCleanup();
      }
      
      if (audioRef.current) {
        // Immediately stop the audio instead of fading out
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0;
        
        // Remove the audio element
        audioRef.current = null;
      }
    };
  }, [musicPath, volume, fadeInDuration, fadeOutDuration]);

  return audioRef.current;
};