import React, { useState } from 'react';
import Slider from './components/LinearSlider';
import * as d3 from 'd3';
import pal from './defaultPallete.json';
import nts from 'ntcjs';
const f = nts.name('737373');

console.log('f: ', f);

interface Props {
    n?: string;
}
export const App = (props: Props) => {
    const [dh, dc, dl] = Object.values(pal.colours[0][0]);
    const [colors, setCol] = useState(pal.colours.flat(1));

    const listener = (e: KeyboardEvent) => {
        if (e.key === 'a') {
            const r = Math.random();
        }

        return false;
    };

    React.useEffect(() => {
        window.addEventListener('keypress', listener);

        return () => window.removeEventListener('keypress', listener);
    });

    return (
        <>
            <div>
                <div id='h' style={{ display: 'flex' }}>
                    {colors.map(({ h, c, l }, i) => {
                        const hcl = d3.hcl(h, c, l);
                        const cScale = d3
                            .scaleLinear()
                            .domain([0, 130])
                            .range([0, 1]);
                        const col = hcl.toString();
                        const realC = d3.hcl(col);
                        const dis = hcl.displayable();

                        return (
                            <Slider
                                value={h / 360}
                                key={i}
                                realVal={dis ? null : realC.h / 360}
                                min={0}
                                max={360}
                                color={col}
                                output={(v) =>
                                    setCol(
                                        colors.map((cl, j) =>
                                            i == j ? { ...cl, h: v * 360 } : cl
                                        )
                                    )
                                }
                            />
                        );
                    })}
                </div>
                <div id='c' style={{ display: 'flex' }}>
                    {colors.map(({ h, c, l }, i) => {
                        const hcl = d3.hcl(h, c, l);
                        const cScale = d3
                            .scaleLinear()
                            .domain([0, 130])
                            .range([0, 1]);
                        const col = hcl.toString();
                        const realC = d3.hcl(col);
                        const dis = hcl.displayable();

                        return (
                            <Slider
                                value={c / 130}
                                key={i}
                                realVal={dis ? null : realC.c / 130}
                                min={0}
                                max={130}
                                color={col}
                                output={(v) =>
                                    setCol(
                                        colors.map((cl, j) =>
                                            i == j ? { ...cl, c: v * 130 } : cl
                                        )
                                    )
                                }
                            />
                        );
                    })}
                </div>
                <div id='l' style={{ display: 'flex' }}>
                    {colors.map(({ h, c, l }, i) => {
                        const hcl = d3.hcl(h, c, l);
                        const cScale = d3
                            .scaleLinear()
                            .domain([0, 130])
                            .range([0, 1]);
                        const col = hcl.toString();
                        const realC = d3.hcl(col);
                        const dis = hcl.displayable();

                        return (
                            <Slider
                                value={l / 100}
                                key={i}
                                realVal={dis ? null : realC.l / 100}
                                min={0}
                                max={100}
                                color={col}
                                output={(v) =>
                                    setCol(
                                        colors.map((cl, j) =>
                                            i == j ? { ...cl, l: v * 100 } : cl
                                        )
                                    )
                                }
                            />
                        );
                    })}
                </div>
            </div>
            <svg
                height='5em'
                width={`${colors.length * 5}em`}
                viewBox={`0 0 ${colors.length * 5} 5`}>
                {colors.map(({ h, c, l }, i) => {
                    return (
                        <rect
                            x={i * 5}
                            key={i}
                            y={0}
                            width={4.5}
                            height={5}
                            fill={d3.hcl(h, c, l).toString()}
                        />
                    );
                })}
            </svg>
            <div style={{ display: 'flex', width: `${colors.length * 5}em` }}>
                {colors.map(({ h, c, l }, i) => {
                    const name = nts.name(d3.hcl(h, c, l).hex())[1];
                    const inp = React.useRef<HTMLInputElement>();

                    if (inp.current) inp.current.value = d3.hcl(h, c, l).hex();

                    return (
                        <div style={{ width: '5em' }} key={i}>
                            <span>{name}</span>
                            <input
                                type='text'
                                ref={inp}
                                size={6}
                                defaultValue={d3.hcl(h, c, l).hex()}
                                onKeyDown={(e) => {
                                    if (/Enter/.test(e.key)) {
                                        const n = inp.current.value;
                                        const color = d3.hcl(n);

                                        if (!isNaN(color.opacity)) {
                                            setCol(
                                                colors.map((cl, j) => {
                                                    return j === i
                                                        ? {
                                                              ...cl,
                                                              h: isNaN(color.h)
                                                                  ? 0
                                                                  : color.h,
                                                              c: color.c,
                                                              l: color.l,
                                                          }
                                                        : cl;
                                                })
                                            );
                                        } else {
                                            console.log(color);
                                        }
                                    }
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default App;
