import {S} from '../alias';
import {CFS, Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const WhitespaceTabNewlineCaptorDefs: GroovyTokenCaptorDefs = {
	Whitespaces: {
		patterns: '{{Space}};{{Space}}:*',
		forStates: CFS.NotNumGStrItpInl
	},
	Tabs: {
		patterns: '{{Tab}};{{Tab}}:*',
		forStates: CFS.NotNumGStrItpInl
	},
	Newline: {
		patterns: '{{CarriageReturn}}:?;{{Newline}}',
		forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn, S.ScriptCmd, S.SLCmt, S.SQStr, S.SQGStr)
	}
};
