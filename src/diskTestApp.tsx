import React, { ReactElement, useState } from 'react';
import DS from './components/DiskSlider';
interface Props {
    i?: number;
}

export default function DisktTestApp({}: Props): ReactElement {
    const [value, setVal] = useState(0.5);

    return (
        <div>
            <DS
                value={value * 360}
                output={(a) => {
                    setVal(a);
                    console.log(a);
                }}
            />
        </div>
    );
}
