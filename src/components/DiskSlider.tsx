import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { InferTypeNode, InferencePriority } from 'typescript';
const TAU = Math.PI * 2;
const toRAD = (a) => a * (TAU / 360);
const toDEG = (a) => a * (360 / TAU);

interface Props {
    value?: number;
    c?: number;
    l?: number;
    rad?: number;
    output?: (value: number) => any;
    color?: string;
    realVal?: number;
}

const DiskSlider = ({
    c = 80,
    l = 60,
    rad = 16,
    value = 180,
    output = (v) => console.log(v),
    color = '#555555',
}: Props) => {
    const isDragged = useRef(false);
    const svgRef = useRef<SVGSVGElement>();

    useEffect(() => {
        const {
            width: {
                baseVal: { value: w },
            },
            height: {
                baseVal: { value: h },
            },
        } = svgRef.current;

        function updateValue({ x, y }: { x: number; y: number }) {
            if (!isDragged.current) return;
            const angle = Math.atan2(y, x);

            output(toDEG(angle));
        }
    });

    return (
        <svg
            width={rad + 'em'}
            ref={svgRef}
            height={rad + 'em'}
            viewBox={`-1 -1 2 2`}>
            <DiskBack c={c} l={l} count={128} />
            <circle
                cx={Math.cos(toRAD(value)) * 0.75}
                cy={Math.sin(toRAD(value)) * 0.75}
                r={0.02}
                fill={color}
            />
        </svg>
    );
};

export default DiskSlider;
type BackProps = { c: number; l: number; count: number };
const DiskBack = ({ c, l, count }: BackProps) => {
    const { floor: flr, random: rnd } = Math;
    const idKey =
        'mask' +
        flr(rnd() * 6400)
            .toString(16)
            .slice(0, 4);
    const outerEdge = d3.arc()({
        startAngle: 0,
        endAngle: TAU,
        outerRadius: 0.9,
        innerRadius: 0.6,
    });
    const section = d3
        .arc<{ i: number; disp: boolean }>()
        .innerRadius(({ disp }) => (disp ? 0.59 : 0.65))
        .outerRadius(({ disp }) => (disp ? 0.91 : 0.85))
        .startAngle(({ i }) => i * (TAU / count) - 0.1)
        .endAngle(({ i }) => (i + 1) * (TAU / count));

    return (
        <>
            <defs></defs>
            <mask id={idKey}>
                <rect x='-1' y='-1' width='2' height='2' fill='black' />
                <path d={outerEdge} fill='white' />
            </mask>

            <g mask={'url(#' + idKey + ')'}>
                {d3.range(count).map((i) => (
                    <path
                        d={section({
                            i,
                            disp: d3.hcl(i * (360 / count), c, l).displayable(),
                        })}
                        fill={d3.hcl(i * (360 / count), c, l).toString()}
                        key={i}
                        opacity={
                            d3.hcl(i * (360 / count), c, l).displayable()
                                ? 1
                                : 0.1
                        }
                    />
                ))}
            </g>
        </>
    );
};
