import React, {ForwardedRef, forwardRef} from 'react';
import {EventBusProvider} from './event-bus';
import {EditorProps} from './types';
import {useDualRefs} from './use-dual-refs';
import {useInitCodeContent} from './use-init-code';
import {useInitEditor} from './use-init-editor';
import {EditorContainer} from './widgets';

const InternalEditor = forwardRef((props: EditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {children} = props;
	const {ref: divRef, state} = useInitEditor(props);
	useDualRefs(divRef, ref);
	useInitCodeContent({editor: state.editor, content: props.initContent ?? ''});

	return <EditorContainer ref={divRef}>
		{children}
	</EditorContainer>;
});

export const Editor = forwardRef((props: EditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <EventBusProvider>
		<InternalEditor {...props} ref={ref}/>
	</EventBusProvider>;
});
