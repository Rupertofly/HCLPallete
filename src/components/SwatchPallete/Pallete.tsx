import React, { memo } from 'react';
import * as T from '../../types';
import Swatch from './Swatch';
interface Props {
    st: T.State;
    selected: [number, number];
    select: React.Dispatch<T.SelectionOptions>;
}

export function Pallete({ st, select, selected }: Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {st.colours.map((hue, hueIndex) => {
                return (
                    <div key={hueIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                        {hue.map((col, shadeIndex) => {
                            return (
                                <Swatch
                                    key={shadeIndex}
                                    color={col}
                                    location={[hueIndex, shadeIndex]}
                                    selected={hueIndex === selected[0] && shadeIndex === selected[1]}
                                    reducer={select}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
