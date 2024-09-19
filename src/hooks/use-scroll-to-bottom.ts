import { RefObject, useEffect } from 'react';

function useScrollToBottom(ref: RefObject<HTMLElement>, delay: number = 1000) {
  useEffect(() => {
    if (!ref.current) return;

    // Set a timer to delay the scroll
    const timer = setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }, delay);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [ref, delay]);
}

export default useScrollToBottom;
