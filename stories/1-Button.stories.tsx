import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Swatch } from '../src/components/SwatchPallete/Swatch';
import { hcl, treemapSquarify } from 'd3';
import { Col } from '../src/types';
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

Emoji.story = {
    name: 'with emoji',
};
export const SwatchStory = () => {
    const [select, changeSelect] = useState(false);
    const color = hcl(90, 90, 30);
    const cc: Col = { ...color, hex: color.hex(), light: color.l > 50, r: { h: 80, c: 80, l: 80 } };

    return (
        <div style={{ fontSize: '16px' }}>
            <Swatch
                color={cc}
                location={[0, 0]}
                selected={select}
                reducer={(f) => {
                    if (f.action === 'deselect') {
                        changeSelect(false);
                    } else {
                        changeSelect(true);
                    }
                    console.log(f);
                }}
            />
        </div>
    );
};
