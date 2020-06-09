import * as React from 'react';
import styled from 'styled-components';
import * as S from '../../stateCode';

const HueContainer = styled.div`
  display: grid;
  grid-template:
    'close . up' 1fr
    'ctnt ctnt ctnt' auto
    '. . dwn' 1fr / 1fr auto 1fr;
  font-family: 'Fira Code', monospace;
`;
const ShadeContainer = styled.th`
  display: grid;
  grid-template:
    'close . .' 1fr
    'ctnt ctnt ctnt' auto
    'dwn . up' 1fr / 1fr auto 1fr;
  font-family: 'Fira Code', monospace;
`;
const HB = styled.button`
  border: 0;
  font-size: 1.2em;
  transform-origin: 50% 50%;
  transform: scale(1);
  background: 0;
  width: fit-content;
  justify-self: end;
  padding: 0.05em 0.2em;
  margin-right: 0.2em;
  margin-top: 0.2em;
  font-weight: 400;
  border-radius: 25%;
  transition: transform 233ms, background-color 64ms;
  background-color: white;
  &:hover {
    font-weight: 800;
  }
  &:active {
    background-color: lightgray;
  }
  &:focus {
    outline: none;
  }
`;

const xStyle: React.CSSProperties = { gridArea: 'close', justifySelf: 'start' };
const uStyle: React.CSSProperties = { gridArea: 'up' };
const dStyle: React.CSSProperties = { gridArea: 'dwn' };
const cStyle: React.CSSProperties = {};

type HeadingInfo = S.HueInfo | S.ShadeInfo;

export interface PalleteHeaderProps<T extends HeadingInfo> extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  info: T;
  index: number;
  len: number;
  dispatch: React.Dispatch<S.Actions>;
}
const HueArea = styled.textarea.attrs((p) => ({
  type: 'text',
  maxLength: 24,
  cols: 6,
}))`
  grid-area: ctnt;
  font-family: 'Fira Code';
  font-weight: 600;
  width: auto;
  resize: none;
  overflow: visible;
  max-width: 6em;
  font-size: 1em;
  justify-self: center;
  text-align: center;
  border: 0;
  background-color: inherit;
  margin: 0 0.5em;
  &:focus {
    outline: 0;
    border-bottom: 3px solid grey;
  }
`;
const ShadeArea = styled.textarea.attrs((p) => ({
  type: 'text',
  maxLength: 24,
  cols: 6,
}))`
  grid-area: ctnt;
  font-family: 'Fira Code';
  font-weight: 600;
  width: auto;
  resize: none;
  overflow: visible;
  max-width: 6em;
  font-size: 1em;
  justify-self: center;
  text-align: center;
  border: 0;
  background-color: inherit;
  margin: 0 0.5em;
  &:focus {
    outline: 0;
    border-bottom: 3px solid grey;
  }
`;

export function PalleteHeader<T extends HeadingInfo>(props: PalleteHeaderProps<T>) {
  const clickHandle = (action: S.Actions) => (e: React.MouseEvent<HTMLButtonElement>) => {
    props.dispatch(action);
    e.currentTarget.blur();
  };
  const type = /hue/.test(props.info.id) ? 'hue' : 'shade';
  const NameRef = React.useRef<HTMLTextAreaElement>();

  if (NameRef.current) NameRef.current.value = props.info.name;
  console.log(props);
  const up = clickHandle(S.rearrangeLayer(type, props.index, props.index - 1));
  const down = clickHandle(S.rearrangeLayer(type, props.index, props.index + 1));
  const NameLen = props.info.name.length;

  if (type === 'hue')
    return (
      <td>
        <HueContainer {...props} style={{}}>
          <HB style={{ ...xStyle }} onClick={clickHandle(S.removeLayer('hue', props.index))}>
            ✗
          </HB>
          {props.index > 0 ? (
            <HB onClick={up} style={{ ...uStyle }}>
              ↑
            </HB>
          ) : null}
          {props.index < props.len - 1 ? (
            <HB onClick={down} style={{ ...dStyle }}>
              ↓
            </HB>
          ) : null}
          <HueArea
            style={{ ...cStyle }}
            ref={NameRef}
            defaultValue={props.info.name}
            rows={props.info.name.length < 10 ? 1 : Math.ceil(NameLen / 9)}
            onKeyDown={(e) => {
              if (/Backspace|Delete|Left|Right|^\s$|^\w$/.test(e.key)) {
                e.currentTarget.rows = e.currentTarget.value.length < 10 ? 1 : Math.floor(NameLen / 6);

                return true;
              } else e.preventDefault();
              if (/Enter/.test(e.key)) {
                console.log(e.currentTarget.value);
                props.dispatch(S.renameLayer(type, props.index, e.currentTarget.value));
              }
            }}
            onBlur={(e) => {
              e.currentTarget.value = props.info.name;
            }}
          />
        </HueContainer>
      </td>
    );
  else
    return (
      <td>
        <ShadeContainer {...props} style={{}}>
          <HB style={{ ...xStyle }} onClick={clickHandle(S.removeLayer(type, props.index))}>
            ✗
          </HB>
          {props.index < props.len - 1 ? (
            <HB onClick={down} style={{ ...uStyle, justifySelf: 'center' }}>
              →
            </HB>
          ) : null}
          {props.index > 0 ? (
            <HB onClick={up} style={{ ...dStyle, justifySelf: 'center' }}>
              ←
            </HB>
          ) : null}
          <ShadeArea
            style={{ ...cStyle }}
            defaultValue={props.info.name}
            ref={NameRef}
            rows={props.info.name.length < 10 ? 1 : Math.ceil(NameLen / 4)}
            onKeyDown={(e) => {
              if (/Backspace|Delete|Left|Right|^\s$|^\w$/.test(e.key)) {
                e.currentTarget.rows = e.currentTarget.value.length < 10 ? 1 : Math.floor(NameLen / 6);

                return true;
              } else e.preventDefault();
              if (/Enter/.test(e.key)) {
                console.log(e.currentTarget.value);
                props.dispatch(S.renameLayer(type, props.index, e.currentTarget.value));
              }
            }}
            onBlur={(e) => {
              e.currentTarget.value = props.info.name;
            }}
          />
        </ShadeContainer>
      </td>
    );
}
export default React.memo(PalleteHeader);
