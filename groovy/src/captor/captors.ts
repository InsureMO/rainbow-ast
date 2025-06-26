import {LeafToken} from '@rainbow-ast/core';
import {GroovyAstBuildContext, GroovyAstBuildState, GroovyAstBuildStateName} from '../ast';
import {TokenCaptor} from './captor';
import {TokenCaptorSelector} from './captor-selector';
import {Char} from './match';

export enum TokenCaptureStatus {
	/** token captured */
	Captured,
	/** not captured */
	None,
}

/**
 * for each ast build state, there will be one or more token captors corresponding to it.
 */
export class TokenCaptors {
	private readonly _state: GroovyAstBuildState;
	private readonly _name: GroovyAstBuildStateName;
	private readonly _selector: TokenCaptorSelector = new TokenCaptorSelector();

	constructor(name: GroovyAstBuildStateName) {
		this._name = name;
		this._state = GroovyAstBuildState[this._name];
	}

	get state(): GroovyAstBuildState {
		return this._state;
	}

	get name(): GroovyAstBuildStateName {
		return this._name;
	}

	get selector(): TokenCaptorSelector {
		return this._selector;
	}

	addCaptors(captors: TokenCaptor | Array<TokenCaptor>): void {
		this._selector.addCaptors(captors);
	}

	private doCapture(context: GroovyAstBuildContext, state: {
		charIndex: number; selector: TokenCaptorSelector, parsedChars: Array<Char>;
	}): TokenCaptureStatus {
		const {document, charIndex: startCharIndex} = context;
		const {charIndex, selector, parsedChars} = state;
		const char = document[charIndex];

		let captorsOrSelectors: Array<TokenCaptor | TokenCaptorSelector> = selector.find(char);
		if (captorsOrSelectors.length === 1) {
			// anyway, given char is captured
			parsedChars.push(char);

			const captorOrSelector = captorsOrSelectors[0];
			if (captorOrSelector instanceof TokenCaptor) {
				// the only one
				const matcher = captorOrSelector.matcher;
				const chars = matcher.match(parsedChars, startCharIndex + parsedChars.length, document);
				const token = new LeafToken({
					id: captorOrSelector.tokenId,
					start: startCharIndex, line: context.line, column: context.column,
					text: chars
				});
				// TODO should create a container for this token or not
				// if no need to create a container, append created token to current container
				context.currentContainer.append(token);
				// TODO should close current container or not

				return TokenCaptureStatus.Captured;
			} else {

			}
		}

		if (captorsOrSelectors.length === 0) {
			const fallback = selector.getFallback();
			if (fallback == null) {
				captorsOrSelectors = [];
			} else {
				captorsOrSelectors = [fallback];
			}
		}

	}

	/**
	 * if any token captured, it will change the context, including:
	 * - token tree,
	 * - state of context, optional
	 * - containers of context, optional
	 * - char index of context,
	 */
	capture(context: GroovyAstBuildContext): TokenCaptureStatus {
		return this.doCapture(context, {charIndex: context.charIndex, selector: this._selector, parsedChars: []});
	}
}
