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
  const { volume = 0.5, fadeInDuration = 1000, fadeOutDuration = 1000 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCleaningUpRef = useRef(false);
  const isMountedRef = useRef(true);
  const hasStartedRef = useRef(false);

  const stopAudio = (audio: HTMLAudioElement) => {
    try {
      // Clear any ongoing fade intervals
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      
      // Immediately pause and reset
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
      
      // Try to unload the audio
      audio.src = '';
      audio.load();
    } catch (error) {
      console.warn('Error stopping audio:', error);
    }
  };

  const fadeIn = (audio: HTMLAudioElement, targetVolume: number, duration: number) => {
    if (isCleaningUpRef.current || !isMountedRef.current) return;
    
    audio.volume = 0;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (isCleaningUpRef.current || !isMountedRef.current) {
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

  const playAudio = async (audio: HTMLAudioElement) => {
    if (isCleaningUpRef.current || !isMountedRef.current || hasStartedRef.current) return;
    
    try {
      // Reset audio to beginning
      audio.currentTime = 0;
      audio.volume = 0;
      
      await audio.play();
      hasStartedRef.current = true;
      
      if (isMountedRef.current && !isCleaningUpRef.current) {
        fadeIn(audio, volume, fadeInDuration);
      }
    } catch (error) {
      console.log('Audio autoplay prevented, setting up user interaction listeners');
      
      // Create interaction handler
      const handleUserInteraction = async (event: Event) => {
        if (isCleaningUpRef.current || !isMountedRef.current || hasStartedRef.current) return;
        
        try {
          audio.currentTime = 0;
          audio.volume = 0;
          await audio.play();
          hasStartedRef.current = true;
          
          if (isMountedRef.current && !isCleaningUpRef.current) {
            fadeIn(audio, volume, fadeInDuration);
          }
          
          // Remove all listeners after successful play
          removeInteractionListeners();
        } catch (err) {
          console.warn('Failed to play audio after user interaction:', err);
        }
      };

      // List of events to listen for
      const events = ['click', 'touchstart', 'touchend', 'keydown', 'scroll', 'mousemove'];
      
      // Add listeners
      events.forEach(eventType => {
        document.addEventListener(eventType, handleUserInteraction, { 
          once: true, 
          passive: true 
        });
      });

      // Store cleanup function
      const removeInteractionListeners = () => {
        events.forEach(eventType => {
          document.removeEventListener(eventType, handleUserInteraction);
        });
      };

      // Store cleanup in audio element for later use
      (audio as any)._eventCleanup = removeInteractionListeners;
    }
  };

  useEffect(() => {
    if (!musicPath) return;

    // Reset flags
    isCleaningUpRef.current = false;
    isMountedRef.current = true;
    hasStartedRef.current = false;

    // Create audio element
    const audio = new Audio();
    audio.src = musicPath;
    audio.loop = true;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    // Add error handler
    const handleError = (error: Event) => {
      console.warn(`Audio file not found or failed to load: ${musicPath}`);
    };

    audio.addEventListener('error', handleError);

    // Add loaded handler to attempt immediate play
    const handleCanPlay = () => {
      if (!isCleaningUpRef.current && isMountedRef.current) {
        playAudio(audio);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);

    // Attempt to load and play
    audio.load();

    // Mobile-specific handlers
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && !isCleaningUpRef.current) {
        stopAudio(audioRef.current);
        hasStartedRef.current = false;
      } else if (!document.hidden && audioRef.current && !hasStartedRef.current) {
        playAudio(audioRef.current);
      }
    };

    const handlePageHide = () => {
      if (audioRef.current && !isCleaningUpRef.current) {
        stopAudio(audioRef.current);
        hasStartedRef.current = false;
      }
    };

    const handleBeforeUnload = () => {
      if (audioRef.current && !isCleaningUpRef.current) {
        stopAudio(audioRef.current);
      }
    };

    // Add mobile event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function
    return () => {
      // Set cleanup flags immediately
      isCleaningUpRef.current = true;
      isMountedRef.current = false;
      
      // Remove event listeners
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Clear any ongoing fade intervals
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      
      // Clean up interaction event listeners if they exist
      if (audioRef.current && (audioRef.current as any)._eventCleanup) {
        (audioRef.current as any)._eventCleanup();
      }
      
      if (audioRef.current) {
        // Remove audio event listeners
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        
        // Stop audio immediately
        stopAudio(audioRef.current);
        
        // Remove the audio element reference
        audioRef.current = null;
      }
      
      // Reset flags
      hasStartedRef.current = false;
    };
  }, [musicPath, volume, fadeInDuration, fadeOutDuration]);

  return audioRef.current;
};