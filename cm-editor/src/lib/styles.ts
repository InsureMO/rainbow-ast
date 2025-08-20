import {css} from 'styled-components';

export interface TextStyle {
	family?: string;
	size?: string | number;
	weight?: string | number;
	style?: string;
	color?: string;
	bgcolor?: string;
	decoration?: string;
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
	str?: TextStyle;
	strEsc?: TextStyle;
	strBesc?: TextStyle;
	gsi?: TextStyle;
	num?: TextStyle;
	bool?: TextStyle;
	custom?: Record<string, string | number>;
	/** follow style-components standard */
	styles?: string;
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
		[`--rbcm-${name}-bgcolor`]: style.bgcolor,
		[`--rbcm-${name}-decoration`]: style.decoration
	};
	Object.keys(styles).forEach(key => {
		if (styles[key] == null || styles[key].trim() === '') {
			delete styles[key];
		}
	});

	return styles;
};
const custom = (styles?: Record<string, string | number>) => {
	if (styles == null) {
		return {};
	}
	return Object.keys(styles).reduce((map, key) => {
		const value = styles[key];
		if (value != null) {
			const k = `--rbcm-${key}`;
			if (typeof value === 'number') {
				const lcKey = key.toLowerCase();
				if (lcKey.endsWith('font-weight') || lcKey.endsWith('opacity')) {
					map[k] = `${value}`;
				} else {
					map[k] = toPixel(value);
				}
			} else {
				map[k] = value;
			}
		}
		return map;
	}, {} as Record<string, string>);
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

		...text('cmt', {color: '#8C8C8C', style: 'italic', ...(v.cmt ?? {})}),
		...text('kw', {color: '#0033B3', ...(v.kw ?? {})}),
		...text('str', {color: '#067D17', ...(v.str ?? {})}),
		...text('str-esc', {color: '#0037A6', ...(v.strEsc ?? {})}),
		...text('str-besc', {color: '#0037A6', bgcolor: '#FFCCCC', ...(v.strEsc ?? {})}),
		...text('gsi', {color: '#AF5195', ...(v.gsi ?? {})}),
		...text('num', {color: '#1750EB', ...(v.num ?? {})}),
		...text('bool', {color: '#1750EB', ...(v.bool ?? {})}),

		...custom(v.custom)
	};
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
