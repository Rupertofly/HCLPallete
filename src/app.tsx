import React, { useState } from 'react';
import Slider from './components/Slider';
import * as d3 from 'd3';
import pal from './defaultPallete.json';
interface Props {
    n?: string;
}
export const App = (props: Props) => {
    const [dh, dc, dl] = Object.values(pal.colours[0][0]);
    const [colors, setCol] = useState(
        d3.range(7).map(() => {
            const dh = Math.random() * 360;
            const dc = Math.random() * 130;
            const dl = Math.random() * 100;
            const { h, c, l } = d3.hcl(d3.hcl(dh, dc, dl).toString());

            return { h, c, l };
        })
    );

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
                <div id="h" style={{ display: 'flex' }}>
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
                <div id="c" style={{ display: 'flex' }}>
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
                <div id="l" style={{ display: 'flex' }}>
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
                height="4em"
                width={`${colors.length * 4}em`}
                viewBox={`0 0 ${colors.length} 1`}
            >
                {colors.map(({ h, c, l }, i) => {
                    return (
                        <rect
                            x={i}
                            y={0}
                            width={1}
                            height={1}
                            fill={d3.hcl(h, c, l).toString()}
                        />
                    );
                })}
            </svg>
        </>
    );
};

export default App;
