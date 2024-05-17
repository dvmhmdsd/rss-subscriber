import { useEffect, useState } from "react";

export const useLoadingProgress = (navigationState: string) => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    let timer = setTimeout(() => setProgress(66), 1000);
    timer = setTimeout(() => setProgress(97), 1600);
    return () => {
      setProgress(13);
      clearTimeout(timer);
    };
  }, [navigationState]);

  return progress;
};
