import {LanguageSupport} from '@codemirror/language';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {EventBusProvider} from './event-bus';
import {DecorationStyleVariables} from './styles';
import {useDualRefs} from './use-dual-refs';
import {useInitCodeContent} from './use-init-code';
import {useInitEditor} from './use-init-editor';
import {EditorContainer} from './widgets';

export interface EditorProps {
	language: LanguageSupport;
	styles?: DecorationStyleVariables;
	initContent?: string;
	contentChanged: (content: string) => void;
	/** use children to handle event in/out editor */
	children?: ReactNode;
}

const InternalEditor = forwardRef((props: EditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {styles, children} = props;
	const {ref: divRef, state} = useInitEditor(props);
	useDualRefs(divRef, ref);
	useInitCodeContent({editor: state.editor, content: props.initContent ?? ''});

	// @ts-expect-error ignore the styled-components type error
	return <EditorContainer $dsv={styles} ref={divRef}>
		{children}
	</EditorContainer>;
});

export const Editor = forwardRef((props: EditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <EventBusProvider>
		<InternalEditor {...props} ref={ref}/>
	</EventBusProvider>;
});
