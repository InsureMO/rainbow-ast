export type Styles = Record<string, Record<string, string>>;
export const DefaultStyleDefs: Styles = {
	'span.gt-cmt': {
		color: 'var(--rbcm-cmt-color)'
	},
	'span.gt-keyword': {
		color: 'var(--rbcm-kw-color)'
	}
};

export const transpileStyles = (styles: Styles): string => {
	return Object.keys(styles).map(key => {
		const props = styles[key];
		return `${key} {
			${Object.keys(props).map(key => `${key}: ${props[key]}`).join(';')}
		}`;
	}).join('');
};
