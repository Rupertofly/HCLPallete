import * as React from 'react';
import styled from 'styled-components';
import * as S from '../../stateCode';

const HueContainer = styled.th`
  display: grid;
  grid-template:
    'close . up' 1fr
    'ctnt ctnt ctnt' auto
    '. . dwn' 1fr / 1fr auto 1fr;
  font-family: 'Fira Code', monospace;
`;
const HB = styled.button`
  border: 0;
  background: 0;
`;
const xStyle: React.CSSProperties = { gridArea: 'close' };
const uStyle: React.CSSProperties = { gridArea: 'up' };
const dStyle: React.CSSProperties = { gridArea: 'dwn' };
const cStyle: React.CSSProperties = { gridArea: 'ctnt' };

type HeadingInfo = S.HueInfo | S.ShadeInfo;

export interface PalleteHeaderProps<T extends HeadingInfo> extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  info: T;
  index: number;
  dispatch: React.Dispatch<S.Actions>;
}

export function PalleteHeader<T extends HeadingInfo>(props: PalleteHeaderProps<T>) {
  const clickHandle = (action: S.Actions) => (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('plop');
    props.dispatch(action);
  };

  return (
    <HueContainer {...props} style={{}}>
      <HB style={{ ...xStyle }} onClick={clickHandle(S.removeLayer('hue', props.index))}>
        ✗
      </HB>
      <HB style={{ ...uStyle }}>↑</HB>
      <HB style={{ ...dStyle }}>↓</HB>
      <span style={{ ...cStyle }}>{props.info.name}</span>
    </HueContainer>
  );
}
export default React.memo(PalleteHeader);
