import React, {useState} from 'react';
import styled from 'styled-components';
import {Editor} from './editor';

const Container = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
    width: 100vw;
`;

const SwitchBar = styled.div`
    display: flex;
    position: relative;
    margin: 0 32px;
`;
const SwitchButton = styled.span`
    display: flex;
    position: relative;
    height: 32px;
    font-size: 18px;
    padding: 0 12px;
    text-decoration: underline;
    align-items: center;
    cursor: pointer;
`;
const NotYetImplemented = styled.div`
    display: block;
    position: relative;
    height: 100%;
    padding: 32px;
`;

enum DemoType {
	EDITOR, ALL
}

export const DemoContainer = () => {
	const [type, setType] = useState(DemoType.EDITOR);

	return <Container>
		<SwitchBar>
			<SwitchButton onClick={() => setType(DemoType.EDITOR)}>Editor Only</SwitchButton>
			<SwitchButton onClick={() => setType(DemoType.ALL)}>Whole Picture</SwitchButton>
		</SwitchBar>
		{type === DemoType.EDITOR ? <Editor/> : null}
		{type === DemoType.ALL ? <NotYetImplemented>Not yet implemented.</NotYetImplemented> : null}
	</Container>;
};