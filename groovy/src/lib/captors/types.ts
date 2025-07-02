import {TokenCaptorDefs} from '@rainbow-ast/core';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenName} from '../token';

export type GroovyTokenCaptorDefs = TokenCaptorDefs<GroovyAstBuildState, GroovyTokenName>;
