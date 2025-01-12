import { useState, useCallback } from "react";

function useSpinner() {
  const [loading, setLoading] = useState(false);

  const showSpinner = useCallback(() => setLoading(true), []);
  const hideSpinner = useCallback(() => setLoading(false), []);

  return { loading, showSpinner, hideSpinner };
}

export default useSpinner;
