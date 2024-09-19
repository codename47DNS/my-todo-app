import { useEffect, useState } from "react";


function useCopy(timeout: number): [boolean, (text: string) => void] {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    timeout > 0 && status && setTimeout(() =>
      setStatus(false), timeout)
  }, [status])

  return [status, (text: string) => {
    navigator.clipboard.writeText(text);
    setStatus(true);
  }]
}

export default useCopy;