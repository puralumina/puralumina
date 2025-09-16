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
  const isMountedRef = useRef(true);
  const { volume = 0.3, fadeInDuration = 1000, fadeOutDuration = 500 } = options;

  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
      
      // On mobile, also try to unload the audio
      if (isMobile) {
        audio.src = '';
        audio.load();
      }
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

  const fadeOut = (audio: HTMLAudioElement, duration: number) => {
    if (isCleaningUpRef.current || !isMountedRef.current) return;
    
    const startVolume = audio.volume;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeStep = startVolume / steps;
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
      audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);
      
      if (currentStep >= steps && fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        stopAudio(audio);
      }
    }, stepTime);
  };

  useEffect(() => {
    if (!musicPath) return;

    // Reset flags
    isCleaningUpRef.current = false;
    isMountedRef.current = true;

    // Create audio element
    const audio = new Audio(musicPath);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Mobile-specific audio settings
    if (isMobile) {
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
    }

    // Handle user interaction requirement for autoplay
    const playAudio = async () => {
      try {
        if (isCleaningUpRef.current || !isMountedRef.current) return;
        await audio.play();
        if (isMountedRef.current && !isCleaningUpRef.current) {
          fadeIn(audio, volume, fadeInDuration);
        }
      } catch (error) {
        console.log('Autoplay prevented, waiting for user interaction');
        
        // Add click listener to start music on first user interaction
        const handleFirstInteraction = async () => {
          try {
            if (isCleaningUpRef.current || !isMountedRef.current) return;
            await audio.play();
            if (isMountedRef.current && !isCleaningUpRef.current) {
              fadeIn(audio, volume, fadeInDuration);
            }
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('touchend', handleFirstInteraction);
          } catch (err) {
            console.error('Failed to play audio:', err);
          }
        };

        document.addEventListener('click', handleFirstInteraction, { passive: true });
        document.addEventListener('keydown', handleFirstInteraction, { passive: true });
        document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
        document.addEventListener('touchend', handleFirstInteraction, { passive: true });
        
        // Store cleanup function for event listeners
        const cleanup = () => {
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
          document.removeEventListener('touchend', handleFirstInteraction);
        };
        
        // Store cleanup in audio element for later use
        (audio as any)._eventCleanup = cleanup;
      }
    };

    playAudio();

    // Add visibility change listener for mobile browsers
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && !isCleaningUpRef.current) {
        stopAudio(audioRef.current);
      }
    };

    // Add page hide listener for mobile browsers
    const handlePageHide = () => {
      if (audioRef.current && !isCleaningUpRef.current) {
        stopAudio(audioRef.current);
      }
    };

    // Add beforeunload listener for mobile browsers
    const handleBeforeUnload = () => {
      if (audioRef.current && !isCleaningUpRef.current) {
        stopAudio(audioRef.current);
      }
    };

    if (isMobile) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('pagehide', handlePageHide);
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // Cleanup function
    return () => {
      // Set cleanup flags immediately
      isCleaningUpRef.current = true;
      isMountedRef.current = false;
      
      // Remove mobile-specific event listeners
      if (isMobile) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('pagehide', handlePageHide);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
      
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
        // Stop audio immediately
        stopAudio(audioRef.current);
        
        // Remove the audio element reference
        audioRef.current = null;
      }
    };
  }, [musicPath, volume, fadeInDuration, fadeOutDuration, isMobile]);

  // Additional cleanup effect that runs on every render
  useEffect(() => {
    return () => {
      if (audioRef.current && !isCleaningUpRef.current) {
        stopAudio(audioRef.current);
      }
    };
  });

  return audioRef.current;
};