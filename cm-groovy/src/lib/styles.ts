export type Styles = Record<string, string | Record<string, string>>;
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
	'&:not(:last-child):after': {
		display: 'inline-block',
		position: 'relative',
		content: '\'\'',
		'background-image': 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M160 128C142.3 128 128 113.7 128 96C128 78.3 142.3 64 160 64L256 64C309 64 352 107 352 160L352 466.7L425.4 393.3C437.9 380.8 458.2 380.8 470.7 393.3C483.2 405.8 483.2 426.1 470.7 438.6L342.7 566.6C330.2 579.1 309.9 579.1 297.4 566.6L169.4 438.6C156.9 426.1 156.9 405.8 169.4 393.3C181.9 380.8 202.2 380.8 214.7 393.3L288 466.7L288 160C288 142.3 273.7 128 256 128L160 128z" fill="%23965AD89A"/></svg>\')',
		transform: 'rotateZ(75deg) scale(0.5) translateX(1.2em) translateY(0.6em)',
		height: '1em',
		width: '1em'
	},
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
			if (typeof props === 'string') {
				return `${key}: ${props};`;
			} else {
				return `${key} {${Object.keys(props).map(key => `${key}: ${props[key]}`).join(';')}}`;
			}
		}).join('')
	} as S;
};
