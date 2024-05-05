import { useState, useEffect } from "react";

const useScroll = (elementRef, threshold) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const elementHeight = element.clientHeight;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const scrolled = scrollTop + elementHeight;
      const percentageScrolled = (scrolled / scrollHeight) * 100;
      if (percentageScrolled >= threshold) {
        setScrollPercentage((state) => {
          if (state >= 80) {
            return state;
          }
          return percentageScrolled;
        });
      } else {
        setScrollPercentage(percentageScrolled);
      }
    };

    const element = elementRef.current;
    // if (!element) return;

    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef.current, threshold]);

  return scrollPercentage;
};

export default useScroll;
