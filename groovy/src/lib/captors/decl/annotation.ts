import {CB, EBBC, Incl, PtnId, S, SS, T} from '../../alias';
import {CFS, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const AnnotationCaptorDefs: GroovyTokenCaptorDefs = {
	AnnotationStartMark: {
		patterns: '@',
		forks: [
			{
				forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
				collect: [CB, T.AnnotationDecl, S.AnnDeclSt]
			},
			{
				forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
				beforeCollect: EBBC,
				collect: [CB, T.AnnotationDecl, S.AnnDeclSt]
			}
		]
	},
	Identifier: {
		patterns: PtnId,
		forks: [
			{
				forStates: [Incl, S.AnnDeclSt, S.AnnDeclDotEd],
				collect: [SS, S.AnnDeclIdEd]
			},
			{
				forStates: [Incl, S.AnnDeclVals, S.AnnDeclCommaEd],
				collect: [CB, T.AnnotationDeclValue, S.AnnDeclValIdEd]
			}
		]
	},
	Dot: {
		patterns: '.',
		forStates: [Incl, S.AnnDeclIdEd],
		collect: [SS, S.AnnDeclDotEd]
	},
	Assign: {
		patterns: '=',
		forks: [
			{
				forStates: [Incl, S.AnnDeclValIdEd],
				collect: [SS, S.AnnDeclValEqEd]
			},
			{
				forStates: [Incl, S.AnnDeclVals, S.AnnDeclCommaEd],
				collect: [CB, T.AnnotationDeclValue, S.AnnDeclValEqEd]
			}
		]
	},
	Comma: {
		patterns: ',',
		forks: [
			{
				forStates: [Incl, S.AnnDeclVals, S.AnnDeclCommaEd],
				collect: [SS, S.AnnDeclCommaEd]
			},
			{
				forStates: [Incl, S.AnnDeclValIdEd, S.AnnDeclValEqEd],
				beforeCollect: EBBC,
				collect: [SS, S.AnnDeclCommaEd]
			}
		]
	},
	LParen: {
		patterns: '(',
		forStates: [Incl, S.AnnDeclIdEd],
		collect: [CB, T.AnnotationDeclValues, S.AnnDeclVals]
	}
};
