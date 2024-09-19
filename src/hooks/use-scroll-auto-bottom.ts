import { RefObject, useEffect } from 'react';

function useScrollAutoBottom(
  ref: RefObject<HTMLElement>,
  shouldScroll: boolean
) {
  useEffect(() => {
    if (!ref.current || !shouldScroll) return;

    const scrollToBottom = () => {
      ref.current?.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    };

    // Trigger the first scroll and then keep scrolling at regular intervals
    scrollToBottom();
    const interval = setInterval(scrollToBottom);

    // Cleanup interval when shouldScroll becomes false or component unmounts
    return () => clearInterval(interval);
  }, [ref, shouldScroll]);
}

export default useScrollAutoBottom;
