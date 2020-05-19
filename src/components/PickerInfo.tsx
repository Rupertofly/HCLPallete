import * as React from 'react';
import styled from 'styled-components';
import * as t from '../types';
import * as d3 from 'd3';
import ntc from 'ntcjs';
export interface PickerInfoProps {
    color: t.Col;
    height?: string;
    output?: (a: t.Col) => void;
}
const Container = styled.div<{ height: string }>`
    height: ${(p) => p.height};
    width: ${(p) => {
        const v = p.height.match(/([0-9\.]+)/);

        return parseFloat(v[0]) * 0.583333333 + 'em';
    }};
    display: flex;
    flex-direction: column;
`;

export function PickerInfo({
    color,
    height = '16em',
    output = (a) => console.log(JSON.stringify(a)),
}: PickerInfoProps) {
    const fill = d3.hcl(color.h, color.c, color.l);

    return (
        <Container height={height}>
            <div
                style={{
                    width: 'calc(100% - 0.7em)',
                    height: 'calc(62% - 0.7em)',
                    margin: '0.5em',
                    backgroundColor: fill.toString(),
                    backgroundClip: 'content-box',
                    borderRadius: '1em',
                    border: `0.2em solid ${
                        fill.l <= 50 ? '#f0f0f0' : '#373737'
                    }`,
                    transition: 'border 0.15s',
                }}></div>
            <div
                style={{
                    height: '40%',
                    fontFamily: 'Fira Code',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                {fill.displayable() ? (
                    <span>{fill.hex()}</span>
                ) : (
                    <i>{fill.hex()}</i>
                )}
                <span>{ntc.name(fill.hex())[1]}</span>
            </div>
        </Container>
    );
}
export default PickerInfo;
