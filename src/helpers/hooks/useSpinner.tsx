import { useState, useCallback } from "react";
import WUPSpinElement from "web-ui-pack/spinElement";

WUPSpinElement.$use();

function useSpinner() {
  const [loading, setLoading] = useState(false);

  const showSpinner = useCallback(() => setLoading(true), []);
  const hideSpinner = useCallback(() => setLoading(false), []);

  const spinner = <wup-spin w-fit w-inline />;

  return { loading, showSpinner, hideSpinner, spinner };
}

export default useSpinner;
