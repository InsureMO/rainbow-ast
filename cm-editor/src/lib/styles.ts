import {css} from 'styled-components';

export interface TextStyle {
	family?: string;
	size?: string | number;
	weight?: string | number;
	style?: string;
	color?: string;
	bgcolor?: string;
}

export interface DecorationStyleVariables {
	width?: string | number;
	minWidth?: string | number;
	maxWidth?: string | number;
	height?: string | number;
	borderColor?: string;
	borderWidth?: string | number;
	borderStyle?: string;
	borderRadius?: string | number;
	fontFamily?: string;
	fontSize?: string | number;
	fontWeight?: string | number;
	fontStyle?: string;
	fontColor?: string;
	cmt?: TextStyle;
	kw?: TextStyle;
	/** follow style-components standard */
	styles?: string;
	[key: string]: string | number | TextStyle;
}

export const toPixel = (v: string | number): string | undefined => {
	if (v == null) {
		return (void 0);
	}
	return typeof v === 'string' ? v : `${v}px`;
};
export const text = (name: string, style?: TextStyle) => {
	if (style == null) {
		return {};
	}

	const styles = {
		[`--rbcm-${name}-font-family`]: style.family,
		[`--rbcm-${name}-font-size`]: toPixel(style.size),
		[`--rbcm-${name}-font-weight`]: style.weight == null ? (void 0) : `${style.weight}`,
		[`--rbcm-${name}-font-style`]: style.style,
		[`--rbcm-${name}-color`]: style.color,
		[`--rbcm-${name}-bgcolor`]: style.bgcolor
	};
	Object.keys(styles).forEach(key => {
		if (styles[key] == null || styles[key].trim() === '') {
			delete styles[key];
		}
	});

	return styles;
};
// noinspection CssUnresolvedCustomProperty
export const createDecorationStyleVariables = (v: DecorationStyleVariables = {}) => {
	return {
		'--rbcm-editor-width': v.width ?? '100%',
		'--rbcm-editor-height': v.height ?? '100%',
		'--rbcm-editor-min-width': toPixel(v.minWidth ?? 400),
		'--rbcm-editor-max-width': v.maxWidth ?? '100%',
		'--rbcm-editor-border-width': toPixel(v.borderWidth ?? 1),
		'--rbcm-editor-border-style': v.borderStyle ?? 'solid',
		'--rbcm-editor-border-color': v.borderColor ?? '',
		'--rbcm-editor-border-radius': toPixel(v.borderRadius ?? 2),
		'--rbcm-editor-font-family': v.fontFamily ?? 'monospace',
		'--rbcm-editor-font-size': toPixel(v.fontSize ?? 14),
		'--rbcm-editor-font-weight': v.fontWeight == null ? '400' : `${v.fontWeight}`,
		'--rbcm-editor-font-style': v.fontStyle ?? 'normal',
		'--rbcm-editor-font-color': v.fontColor ?? '#333',

		...text('cmt', {color: '#8C8C8C', ...(v.cmt ?? {})}),
		...text('kw', {color: '#0033B3', ...(v.kw ?? {})})
	};
	//--rbcm-reserved-keyword-color: #0033B3;
	//--rbcm-reserved-keyword-background-color: transparent;
	//
	//--rbcm-identifier-for-annotation-color: #9E880D;
	//--rbcm-capitalized-identifier-for-annotation-color: #9E880D;
	//
	//--rbcm-string-literal-color: #067D17;
	//--rbcm-number-literal-color: #1750EB;
	//--rbcm-boolean-literal-color: #1750EB;
	//
	//--rbcm-gstring-color: #067D17;
	//
	//--rbcm-brace-color: #B09633;
	//--rbcm-brace-font-style: italic;
	//--rbcm-brace-for-closure-color: #871094;
	//--rbcm-brace-for-closure-font-weight: 600;
	//--rbcm-brace-for-closure-font-style: var(--rbcm-brace-font-style);
	//
	//--rbcm-block-matched-side-background-color: #FF0000B3;
	//
	//--rbcm-arrow-font-weight: 600;
	//--rbcm-arrow-for-closure-color: #871094;
	//--rbcm-arrow-for-closure-font-weight: var(--rbcm-arrow-font-weight);
	//
	//--rbcm-semi-color: #888;
	//
	//--rbcm-at-for-interface-color: #0033B3;
	//--rbcm-at-for-interface-font-weight: 900;
	//--rbcm-at-for-annotation-color: #9E880D;
	//--rbcm-at-for-annotation-font-weight: 900;
	//
	//--rbcm-nl-for-sl-comment-color: #8C8C8C;
	//--rbcm-nl-for-sl-comment-font-style: italic;
	//--rbcm-nl-for-sl-comment-todo-color: #008DDE;
	//--rbcm-nl-for-sl-comment-todo-font-style: italic;
	//--rbcm-nl-for-sl-comment-todo-font-weight: 600;
	//
	//--rbcm-nl-for-ml-comment-color: #8C8C8C;
	//--rbcm-nl-for-ml-comment-font-style: italic;
	//--rbcm-nl-for-ml-comment-todo-color: #008DDE;
	//--rbcm-nl-for-ml-comment-todo-font-style: italic;
	//--rbcm-nl-for-ml-comment-todo-font-weight: 600;
};
// noinspection CssUnresolvedCustomProperty,CssUnusedSymbol
export const createDecorationStyles = (v: DecorationStyleVariables) => {
	return css`
        span.ref-class-clickable {
            text-decoration: underline;
            cursor: pointer;
        }

        ${v?.styles}
	`;
};
