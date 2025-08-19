import {ForwardedRef, MutableRefObject, useEffect} from 'react';

export const useDualRefs = <T>(ref: MutableRefObject<T | null>, forwardedRef: ForwardedRef<T>) => {
	useEffect(() => {
		if (typeof forwardedRef === 'function') {
			forwardedRef(ref.current);
		} else if (typeof forwardedRef === 'object' && forwardedRef !== null) {
			forwardedRef.current = ref.current;
		}
	}, [ref, forwardedRef]);
};
