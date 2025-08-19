import styled from 'styled-components';
import {DecorationStyles, DecorationStyleVariables} from './styles';

// noinspection CssUnresolvedCustomProperty,CssUnusedSymbol,SpellCheckingInspection
export const EditorContainer = styled.div.attrs({
	// @ts-expect-error for avoid attribute name rule
	'data-w': 'groovy-editor'
})`
    display: block;
    position: relative;
    width: var(--rbcm-editor-width, 100%);
    height: var(--rbcm-editor-height, 100%);
    min-height: var(--rbcm-editor-min-width, 400px);
    max-height: var(--rbcm-editor-max-width, 100%);
    border: var(--rbcm-editor-border, 1px solid #ccc);
    border-radius: var(--rbcm-editor-border-radius, 2px);
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }

    > div.cm-editor {
        height: 100%;
        ${DecorationStyleVariables};
        font-size: var(--rbcm-font-size);

        &.cm-focused {
            outline: none;
        }

        div.cm-line {
            .cm-nonmatchingBracket {
                background-color: transparent;
            }

            ${DecorationStyles}
        }

        div.cm-panel.cm-search {
            display: grid;
            grid-template-columns: 1fr repeat(6, auto);
            grid-column-gap: var(--rbcm-editor-search-column-gap, 12px);
            grid-row-gap: var(--rbcm-editor-search-row-gap, 12px);
            align-items: center;
            padding: var(--rbcm-editor-search-padding, 14px 16px 14px);

            input.cm-textfield {
                display: flex;
                position: relative;
                align-items: center;
                height: var(--rbcm-editor-search-input-height, 28px);
                line-height: calc(var(--rbcm-editor-search-input-height, 28px) * 7 / 8);
                margin: var(--rbcm-editor-search-label-margin, 0 8px 0 0);
                padding: var(--rbcm-editor-search-input-padding, 0 10px);
                border: var(--rbcm-editor-search-input-border, 1px solid #ddd);
                border-radius: var(--rbcm-editor-search-input-border-radius, 4px);
                font-size: var(--rbcm-editor-search-input-font-size, 14px);
            }

            button.cm-button {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: center;
                height: var(--rbcm-editor-search-button-height, var(--rbcm-editor-search-input-height, 28px));
                line-height: calc(var(--rbcm-editor-search-button-height, var(--rbcm-editor-search-input-height, 28px)) * 7 / 8);
                min-width: var(--rbcm-editor-search-button-min-width, 60px);
                margin: var(--rbcm-editor-search-label-margin, 0);
                padding: var(--rbcm-editor-search-button-padding, var(--rbcm-editor-search-input-padding, 0 10px));
                border: var(--rbcm-editor-search-button-border, var(--rbcm-editor-search-input-border, 1px solid #ddd));
                border-radius: var(--rbcm-editor-search-button-border-radius, var(--rbcm-editor-search-input-border-radius, 4px));
                font-size: var(--rbcm-editor-search-button-font-size, var(--rbcm-editor-search-input-font-size, 14px));
                background-image: var(--rbcm-editor-search-button-bg, none);
                text-transform: capitalize;
                cursor: pointer;

                &:active {
                    background-image: var(--rbcm-editor-search-button-active-bg, linear-gradient(#b4b4b4, #d0d3d6));
                }

                + label {
                    margin: var(--rbcm-editor-search-first-label-margin, 0 0 0 8px);
                }
            }

            button:last-child {
                display: flex;
                position: relative;
                grid-column: 7;
                grid-row: 2;
                align-items: center;
                justify-self: end;
                justify-content: center;
                height: var(--rbcm-editor-search-button-height, var(--rbcm-editor-search-input-height, 28px));
                width: var(--rbcm-editor-search-button-height, var(--rbcm-editor-search-input-height, 28px));
                top: unset;
                right: unset;
                margin: var(--rbcm-editor-search-button-margin, 0 -8px 0 0);
                border: var(--rbcm-editor-search-close-button-border, 1px solid transparent);
                border-radius: var(--rbcm-editor-search-close-button-border-radius, 100%);
                font-size: var(--rbcm-editor-search-close-button-font-size, 20px);
                cursor: pointer;
                transition: var(--rbcm-editor-search-close-button-transition, border 300ms ease-in-out);

                &:hover {
                    border: var(--rbcm-editor-search-close-button-hover-border, 1px solid #ddd);
                }
            }

            label {
                display: flex;
                position: relative;
                align-items: center;
                height: var(--rbcm-editor-search-label-height, var(--rbcm-editor-search-input-height, 28px));
                line-height: calc(var(--rbcm-editor-search-label-height, var(--rbcm-editor-search-input-height, 28px)) * 7 / 8);
                margin: var(--rbcm-editor-search-label-margin, 0);
                padding: var(--rbcm-editor-search-label-padding, 0);
                font-size: var(--rbcm-editor-search-label-font-size, var(--rbcm-editor-search-input-font-size, 14px));
                text-transform: capitalize;
                cursor: pointer;

                > input {
                    margin: var(--rbcm-editor-search-label-internal-margin, 0 8px 0 0);
                }
            }

            br {
                display: none;
            }
        }
    }
`;
