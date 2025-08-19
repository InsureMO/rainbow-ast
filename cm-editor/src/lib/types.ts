import {LanguageSupport} from '@codemirror/language';
import {ReactNode} from 'react';

export interface EditorProps {
	language: LanguageSupport;
	initContent?: string;
	contentChanged: (content: string) => void;
	/** use children to handle event in/out editor */
	children?: ReactNode;
}

export enum EventTypes {
	TOGGLE_HELP = 'toggle-help',
	DOC_CHANGED = 'doc-changed'
}
