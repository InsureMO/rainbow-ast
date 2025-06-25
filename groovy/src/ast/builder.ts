import {AbstractAstBuilder, AstBuildOptions, CompilationUnit, TokenIds} from '@rainbow-ast/core';
import {TokenCaptors, TokenCaptureStatus} from '../captor';
import {GroovyTokenId} from '../token';
import {GroovyAstBuildContext} from './context';
import {GroovyAstBuildState} from './state';

export interface GroovyAstBuildOptions extends AstBuildOptions {
	scriptCommandEnabled?: boolean;
}

export class GroovyAstBuilder extends AbstractAstBuilder<GroovyAstBuildOptions> {
	private readonly _captorsMap: ReadonlyMap<GroovyAstBuildState, TokenCaptors>;

	constructor(options?: GroovyAstBuildOptions) {
		// avoid extend
		super(options);
		this._captorsMap = this.createCaptorsMap();
	}

	get tokenIds(): TokenIds {
		return GroovyTokenId;
	}

	protected initOptions(options?: GroovyAstBuildOptions): Required<GroovyAstBuildOptions> {
		return {
			scriptCommandEnabled: options?.scriptCommandEnabled ?? true
		};
	}

	protected createCaptorsMap(): ReadonlyMap<GroovyAstBuildState, TokenCaptors> {
		const map = new Map<GroovyAstBuildState, TokenCaptors>();
		// TODO, this part should be auto generated
		return map;
	}

	protected getInitState(): GroovyAstBuildState {
		return this.options.scriptCommandEnabled
			? GroovyAstBuildState.CompilationUnit
			: GroovyAstBuildState.CompilationUnitOmitScriptCommand;
	}

	protected findTokenCaptorsOfState(context: GroovyAstBuildContext): TokenCaptors {
		const captors = this._captorsMap.get(context.state);
		if (captors == null) {
			throw new Error(`Could not find captors for state[${GroovyAstBuildState[context.state]}].`);
		}
		return captors;
	}

	protected parse(cu: CompilationUnit): void {
		const context = new GroovyAstBuildContext(cu, this.getInitState());

		while (!context.eof) {
			const captors = this.findTokenCaptorsOfState(context);
			const status = captors.capture(context);
			if (status === TokenCaptureStatus.None) {
				// cannot capture token in current state,
				// back to parent
				context.closeContainer();
				context.closeState();
			}
			// otherwise continue loop
		}
	}
}
