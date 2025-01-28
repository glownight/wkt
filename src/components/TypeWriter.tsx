"use client";
import React, { useState, useEffect, useCallback } from 'react';

interface TypeWriterProps {
  text: string;
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    setIsPaused(true);
    setDisplayText(text);
  };

  const typeEffect = useCallback(() => {
    if (isPaused) return;

    const typeSpeed = 150; // 打字速度
    const deleteSpeed = 50; // 删除速度

    if (!isDeleting && displayText === text) {
      setTimeout(() => setIsDeleting(true), 1000);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(text.substring(0, displayText.length - 1));
      } else {
        setDisplayText(text.substring(0, displayText.length + 1));
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, isPaused]);

  useEffect(() => {
    typeEffect();
  }, [typeEffect]);

  return (
    <span onClick={handleClick} className={className} style={{ cursor: 'pointer' }}>
      {displayText}
    </span>
  );
};

export default TypeWriter;
