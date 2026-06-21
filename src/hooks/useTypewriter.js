import { useEffect, useState } from 'react';

export function useTypewriter(lines, options = {}) {
  const { speed = 16, linePause = 420, startDelay = 500, enabled = true } = options;
  const [visibleLines, setVisibleLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setVisibleLines(lines);
      setIsComplete(true);
      return undefined;
    }

    setVisibleLines([]);
    setLineIndex(0);
    setCharIndex(0);
    setIsComplete(false);
    setHasStarted(false);

    const startTimer = window.setTimeout(() => setHasStarted(true), startDelay);

    return () => window.clearTimeout(startTimer);
  }, [enabled, lines, startDelay]);

  useEffect(() => {
    if (!enabled || !hasStarted || isComplete || lines.length === 0) {
      return undefined;
    }

    const currentLine = lines[lineIndex] ?? '';

    if (charIndex < currentLine.length) {
      const timer = window.setTimeout(() => {
        setVisibleLines((previous) => {
          const next = [...previous];
          next[lineIndex] = currentLine.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((value) => value + 1);
      }, speed);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setVisibleLines((previous) => {
        const next = [...previous];
        next[lineIndex] = currentLine;
        return next;
      });

      if (lineIndex < lines.length - 1) {
        setLineIndex((value) => value + 1);
        setCharIndex(0);
        return;
      }

      setIsComplete(true);
    }, linePause);

    return () => window.clearTimeout(timer);
  }, [charIndex, enabled, hasStarted, isComplete, lineIndex, linePause, lines, speed]);

  return {
    visibleLines,
    isComplete,
    isTyping: hasStarted && !isComplete,
    hasStarted,
    lineIndex,
  };
}
