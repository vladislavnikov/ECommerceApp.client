const fetchWithDelay = <T>(fetcher: () => Promise<T>, delay = 500): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      fetcher().then(resolve).catch(reject);
    }, delay);
  });

export default fetchWithDelay;
