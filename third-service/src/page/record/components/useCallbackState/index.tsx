import { useState, useRef, useEffect } from 'react';

export function useCallbackState(state: any) {
  const cbRef:any = useRef();
  const [data, setData] = useState(state);

  useEffect(() => {
    cbRef.current && cbRef.current(data);
  }, [data]);

  return [
    data,
    function (val: any, callback: any) {
      cbRef.current = callback;
      setData(val);
    },
  ];
}

