import {autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap} from '@codemirror/autocomplete';
import {defaultKeymap, history, historyKeymap, indentWithTab} from '@codemirror/commands';
import {
	bracketMatching,
	defaultHighlightStyle,
	foldGutter,
	foldKeymap,
	indentOnInput,
	indentUnit,
	LanguageSupport,
	syntaxHighlighting
} from '@codemirror/language';
import {lintGutter, lintKeymap} from '@codemirror/lint';
import {highlightSelectionMatches, searchKeymap} from '@codemirror/search';
import {EditorState, EditorState as CodeMirrorState} from '@codemirror/state';
import {
	crosshairCursor,
	drawSelection,
	dropCursor,
	EditorView,
	highlightActiveLine,
	highlightActiveLineGutter,
	highlightSpecialChars,
	keymap,
	lineNumbers,
	rectangularSelection
} from '@codemirror/view';
import {useEffect, useRef, useState} from 'react';
import {EventTypes, useEventBus} from './event-bus';

export interface UseInitEditorOptions {
	language: LanguageSupport;
}

export interface CodeEditorState {
	editor?: EditorView;
}

export const useInitEditor = (options: UseInitEditorOptions) => {
	const {language} = options;
	const [state, setState] = useState<CodeEditorState>({});
	const {fire} = useEventBus();

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					// copied from basic step
					[
						lineNumbers(),
						highlightActiveLineGutter(),
						highlightSpecialChars(),
						history(),
						foldGutter(),
						lintGutter(),
						drawSelection(),
						dropCursor(),
						EditorState.allowMultipleSelections.of(true),
						indentOnInput(),
						syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
						bracketMatching(),
						closeBrackets(),
						autocompletion(),
						rectangularSelection(),
						crosshairCursor(),
						highlightActiveLine(),
						highlightSelectionMatches(),
						keymap.of([
							...closeBracketsKeymap,
							...defaultKeymap,
							...searchKeymap,
							...historyKeymap,
							...foldKeymap,
							...completionKeymap,
							...lintKeymap
						])
					],
					indentUnit.of('  '),
					keymap.of([indentWithTab]),
					language.extension,
					EditorView.updateListener.of((update) => {
						if (update.docChanged) {
							fire(EventTypes.DOC_CHANGED, update.state.doc.toString());
						}
					})
				].filter(x => x != null)
			}),
			parent: ref.current
		});
		setState(state => {
			return {...state, editor};
		});
		return () => {
			editor.destroy();
			// clear state
			setState({});
		};
	}, []);

	return {ref, state};
};
