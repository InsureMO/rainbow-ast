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
			// appears after start mark, dot
			{forStates: [Incl, S.AnnDeclSt, S.AnnDeclDotEd], collect: [SS, S.AnnDeclIdEd]},
			// when current state is any of annotation values, create annotation value
			{forStates: [Incl, SG.AnnVals], collect: [CB, T.AnnotationDeclValue, S.AnnDeclValIdEd]},
			// when current state is annotation value started, transit to identifier end
			{forStates: [Incl, S.AnnDeclValSt], collect: [SS, S.AnnDeclValIdEd]}
		]
	},
	Dot: { // appears only after annotation identifier
		patterns: '.',
		forStates: [Incl, S.AnnDeclIdEd],
		collect: [SS, S.AnnDeclDotEd]
		// TODO annotation value also could be qualified name, which is a class
	},
	Assign: {
		patterns: '=',
		forks: [
			// when current state is any of annotation values, create annotation value
			{forStates: [Incl, SG.AnnVals], collect: [CB, T.AnnotationDeclValue, S.AnnDeclValEqEd]},
			// when current state is any of annotation value, transit to equal end
			{forStates: [Incl, SG.AnnVal], collect: [SS, S.AnnDeclValEqEd]}
		]
	},
	Comma: {
		patterns: ',',
		forks: [
			// when current state is any of annotation values, transit to comma end
			{forStates: [Incl, SG.AnnVals], collect: [SS, S.AnnDeclValsCommaEd]},
			{ // when current state is any of annotation value, end it
				forStates: [Incl, SG.AnnVal],
				beforeCollect: EBBC,
				collect: [SS, S.AnnDeclValsCommaEd]
			}
		]
	},
	LParen: { // appears only after annotation identifier
		patterns: '(',
		forStates: [Incl, S.AnnDeclIdEd],
		collect: [CB, T.AnnotationDeclValues, S.AnnDeclValsSt]
	}
};
