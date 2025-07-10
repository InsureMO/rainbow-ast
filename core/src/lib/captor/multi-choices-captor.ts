import {AstBuildContext} from '../context';
import {TokenCaptor} from './captor';

/**
 * for the same capture pattern and the same build state,
 * more complex context judgment is required to decide which captor to use, or no captor.
 */
export class MultiChoicesCaptor {
	private readonly _captors: Array<TokenCaptor> = [];

	get captors(): ReadonlyArray<TokenCaptor> {
		return this._captors;
	}

	with(captor: TokenCaptor): this {
		this._captors.push(captor);
		return this;
	}

	and(captor: TokenCaptor): this {
		this._captors.push(captor);
		return this;
	}

	select(context: AstBuildContext): TokenCaptor | undefined {
		const captors = this._captors.filter(captor => captor.availableCheck(context));
		if (captors == null) {
			return (void 0);
		}

		if (captors.length > 1) {
			throw new Error(`Multiple captors selected from context, starts at char index[${context.charIndex}].`);
		}

		return captors[0];
	}
}
