export type Styles = Record<string, Record<string, string>>;
const StyleDefs = (name: string) => {
	return {
		'font-family': `var(--rbcm-${name}-font-family)`,
		'font-size': `var(--rbcm-${name}-font-size)`,
		'font-weight': `var(--rbcm-${name}-font-weight)`,
		'font-style': `var(--rbcm-${name}-font-style)`,
		color: `var(--rbcm-${name}-color)`,
		'background-color': `var(--rbcm-${name}-bgcolor)`,
		'text-decoration': `var(--rbcm-${name}-decoration)`
	};
};
const NumericStyleDefs = StyleDefs('num');
const NumericMarkStyleDefs = {
	...NumericStyleDefs,
	color: 'var(--rbcm-num-mark-color, var(--rbcm-num-color))'
};
const StringStyleDefs = StyleDefs('str');
const StringMarkStyleDefs = StringStyleDefs;
const StringEscapeStyleDefs = StyleDefs('str-esc');
const StringBadEscapeStyleDefs = {...StyleDefs('str-besc'), 'border-radius': '0.3em'};
export const DefaultStyleDefs: Styles = {
	'span.gt-cmt': StyleDefs('cmt'),
	'span.gt-keyword': StyleDefs('kw'),
	// numeric
	'span.gt-literal-mark-bin-st': NumericMarkStyleDefs,
	'span.gt-literal-mark-oct-st': NumericMarkStyleDefs,
	'span.gt-literal-mark-hex-st': NumericMarkStyleDefs,
	'span.gt-literal-num': NumericStyleDefs,
	'span.gt-literal-num-dot': NumericStyleDefs,
	'span.gt-literal-num-sep': NumericStyleDefs,
	'span.gt-literal-mark-num-exp-st': NumericMarkStyleDefs,
	'span.gt-literal-mark-num-exp-sig': NumericMarkStyleDefs,
	'span.gt-literal-mark-num-sfx': NumericMarkStyleDefs,
	// string
	'span.gt-str.gt-woc-word': StringStyleDefs,
	'span.gt-str.gt-symbol': StringStyleDefs,
	'span.gt-literal-mark-sqs-se': StringMarkStyleDefs,
	'span.gt-literal-mark-tqs-se': StringMarkStyleDefs,
	'span.gt-literal-mark-sdqgs-se': StringMarkStyleDefs,
	'span.gt-literal-mark-tdqgs-se': StringMarkStyleDefs,
	'span.gt-literal-mark-sgs-se': StringMarkStyleDefs,
	'span.gt-literal-mark-dsgs-st': StringMarkStyleDefs,
	'span.gt-literal-mark-dsgs-ed': StringMarkStyleDefs,
	'span.gt-str-esc': StringEscapeStyleDefs,
	'span.gt-str-esc.gt-str-esc-bad': StringBadEscapeStyleDefs,
	'span.gt-str-esc.gt-str-esc-nl-eraser': {
		...StringEscapeStyleDefs,
		'background-color': 'var(--rbcm-str-nl-eraser-bgcolor, var(--rbcm-str-esc-bgcolor))',
		'border-radius': 'var(--rbcm-str-nl-eraser-border-radius)'
	}
};
export const CustomStyleVariableDefs = {
	'num-mark-color': '#965AD8FF',
	'str-nl-eraser-bgcolor': '#965AD85E',
	'str-nl-eraser-border-radius': '0.3em'
};

export const transpileStyles = <S>(styles: Styles = DefaultStyleDefs, variables: Record<string, string | number> = CustomStyleVariableDefs): S => {
	return {
		fontSize: 18,
		custom: variables,
		styles: Object.keys(styles).map(key => {
			const props = styles[key];
			return `${key} {
			${Object.keys(props).map(key => `${key}: ${props[key]}`).join(';')}
		}`;
		}).join('')
	} as S;
};
