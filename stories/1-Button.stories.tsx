import React, { useState, useReducer } from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Pallete } from '../src/components/SwatchPallete/Pallete';
import { pallete } from '../src/importablePallete';
import * as Reds from '../src/store';
import { Col, State, COL_PROPS, ACTION_TYPES } from '../src/types';
import { Slider } from '../src/components/Slider/Slider';
export default {
    title: 'Button',
    component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
    <Button onClick={action('clicked')}>
        <span role='img' aria-label='so cool'>
            😀 😎 👍 💯
        </span>
    </Button>
);
function minMaxMap(p: COL_PROPS, centralVal: number): [number, number] {
    switch (p) {
        case 'h':
            return [0, 360];
        case 'c':
            return [0, 130];
        case 'l':
            return [0, 100];
        default:
            return [0, 100];
    }
}
Emoji.story = {
    name: 'with emoji',
};
export const SwatchStory = () => {
    const [state, reducer] = useReducer(
        Reds.palleteReducer,
        Reds.importPallete({} as any, { dataString: JSON.stringify(pallete) })
    );
    const [selected, selectReducer] = useReducer(Reds.selectionReducer, [0, 0]);
    const [drag, setDrag] = useState(false);

    return (
        <div
            style={{
                display: 'flex',
            }}>
            <Pallete st={state} selected={selected} select={selectReducer} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {selected[0] >= 0 &&
                    (['h', 'c', 'l'] as COL_PROPS[]).map((p) => {
                        return (
                            <div key={p} style={{ display: 'flex', flexDirection: 'row' }}>
                                {state.colours[selected[0]].map((color, shadeIndex) => {
                                    const [mn, mx] = minMaxMap(p, state.hues[selected[0]].avgHue);

                                    return (
                                        <Slider
                                            {...color}
                                            instant={drag}
                                            max={mx}
                                            min={mn}
                                            onChange={(v) =>
                                                reducer({
                                                    type: ACTION_TYPES.SET_VAL,
                                                    data: { value: v, prop: p, hue: selected[0], shade: shadeIndex },
                                                })
                                            }
                                            type={p}
                                            key={shadeIndex}
                                            onStart={() => setDrag(true)}
                                            onEnd={() => setDrag(false)}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
            <button onClick={() => console.log(state)} />
            <button onClick={() => reducer({ type: ACTION_TYPES.REBUILD, data: {} })} />
        </div>
    );
};
