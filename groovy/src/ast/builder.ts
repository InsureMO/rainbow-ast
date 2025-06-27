import {AbstractAstBuilder, AstBuildOptions, CompilationUnit, TokenIds} from '@rainbow-ast/core';
import {TokenCaptors, TokenCaptureStatus} from '../captor';
import {GroovyTokenId} from '../token';
import {AstBuildContext} from './context';
import {AstBuildState} from './state';

export interface GroovyAstBuildOptions extends AstBuildOptions {
	scriptCommandEnabled?: boolean;
}

export class GroovyAstBuilder extends AbstractAstBuilder<GroovyAstBuildOptions> {
	protected readonly _captorsMap: ReadonlyMap<AstBuildState, TokenCaptors> = new Map();

	get tokenIds(): TokenIds {
		return GroovyTokenId;
	}

	protected initOptions(options?: GroovyAstBuildOptions): Required<GroovyAstBuildOptions> {
		return {
			verbose: options?.verbose ?? false,
			scriptCommandEnabled: options?.scriptCommandEnabled ?? true
		};
	}

	protected getInitState(): AstBuildState {
		return this.options.scriptCommandEnabled ? AstBuildState.CompilationUnit : AstBuildState.CompilationUnitOmitScriptCommand;
	}

	protected findTokenCaptorsOfState(context: AstBuildContext): TokenCaptors {
		const captors = this._captorsMap.get(context.state);
		if (captors == null) {
			throw new Error(`Could not find captors for state[${AstBuildState[context.state]}].`);
		}
		return captors;
	}

	protected doParse(cu: CompilationUnit): void {
		const context = new AstBuildContext(cu, this.getInitState());

		while (!context.eof) {
			const captors = this.findTokenCaptorsOfState(context);
			const [status] = captors.capture(context);
			if (status === TokenCaptureStatus.None) {
				// cannot capture token in current state,
				// back to parent
				context.closeContainer();
				context.closeState();
			}
			// otherwise continue loop
		}
	}

	protected parse(cu: CompilationUnit): void {
		if (this.verboseEnabled) {
			let label = `Parse AST[chars=${(cu.text ?? '').length}]`;
			try {
				console.time(label);
				this.doParse(cu);
			} finally {
				console.timeEnd(label);
			}
		} else {
			this.doParse(cu);
		}
	}
}
