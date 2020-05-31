import {
    State,
    ActionRequest,
    reducerFunction,
    ActionBaseRequest,
    ACTION_TYPES,
    ActionOptions,
    SetColorActionRequest,
    SetValActionRequest,
    Col,
    AddLayerActionRequest,
    RemoveLayerActionRequest,
    RenameActionRequest,
    LoadPalleteActionRequest,
    SavePalleteActionRequest,
    RebuildPalleteActionRequest,
    ImportPalleteActionRequest,
    SelectionOptions,
    HueInfo,
    JSONPallete,
    CalculateHueActionRequest,
    CalculateShadeActionRequest,
    ShadeInfo,
} from './types';
import { Reducer } from 'react';
import * as d3 from 'd3';
import { hcl } from 'd3';
const TAU = Math.PI * 2;
const fromDeg = (n) => n * (TAU / 360);
const toDeg = (n) => n * (360 / TAU);

function circularMean(angles: number[]) {
    const mSin = d3.mean(angles.map((a) => Math.sin(fromDeg(a))));
    const mCos = d3.mean(angles.map((a) => Math.cos(fromDeg(a))));

    return toDeg(Math.atan(mSin / mCos));
}

// Change Color
function calculateColour(col: string): Col;
function calculateColour(h: number, c: number, l: number): Col;
function calculateColour(a: string | number, b?: number, cc?: number) {
    let color: d3.HCLColor;

    if (typeof a === 'string') {
        color = hcl(a);
    } else {
        color = hcl(a, b, cc);
    }
    const hex = color.hex();
    const { h, c, l } = color;
    const realCol = hcl(hex);

    return {
        h,
        c,
        l,
        hex,
        light: l > 50,
        r: {
            h: realCol.h,
            c: realCol.c,
            l: realCol.l,
        },
    };
}
function getMeanHue(h: number, cols: Col[][]): number {
    return circularMean(cols[h].map((cl) => cl.h));
}

function getMeanShade(s: number, cols: Col[][]): number {
    return d3.mean(cols.map((h) => h[s].l));
}
function updateColor(state: State, h: number, s: number, newCol: Col) {
    return {
        ...state,
        colours: state.colours.map((hs, i) => (i === h ? hs.map((ss, i) => (i === s ? newCol : ss)) : hs)),
    } as State;
}
function setColor(state: State, data: SetColorActionRequest['data']) {
    return updateColor(state, data.hue, data.shade, calculateColour(data.color));
}

function setValue(state: State, data: SetValActionRequest['data']) {
    const updatedColor: Col = { ...state.colours[data.hue][data.shade] };

    updatedColor[data.prop] = data.value;

    return updateColor(state, data.hue, data.shade, calculateColour(updatedColor.h, updatedColor.c, updatedColor.l));
}

// Layers
function degDist(a: number, b: number) {
    return Math.abs(b - a) < 180 ? Math.abs(b - a) : 360 - Math.abs(b - a);
}
function addHueLayer(state: State, name: string): State {
    const newHue = state.colours
        .map((hs) => d3.mean(hs.map((c) => c.h)))
        .sort()
        .reduce(
            ({ min, ang }, v, i, arr) => {
                let mVal = min;
                let aVal = ang;
                const l = arr.length;
                const fwd = arr[(l + i + 1) % l];
                const bk = arr[(l + i - 1) % l];
                const fwdDistance = degDist(v, fwd);
                const bkwdDistance = degDist(v, bk);

                if (fwdDistance / 2 > mVal) {
                    mVal = fwdDistance / 2;
                    aVal = l + Math.sign(l - fwd) * mVal;
                }
                if (bkwdDistance / 2 > mVal) {
                    mVal = bkwdDistance / 2;
                    aVal = l + Math.sign(l - bk) * mVal;
                }

                return { min: mVal, ang: aVal };
            },
            { min: 0, ang: 0 }
        ).ang;

    return {
        shades: state.shades,
        hues: [...state.hues, { name, avgHue: newHue }],
        colours: [
            ...state.colours,
            d3
                .range(state.shades.length)
                .map((si) =>
                    calculateColour(
                        newHue,
                        d3.mean(state.colours.map((hue) => hue[si].c)),
                        d3.mean(state.colours.map((hue) => hue[si].l))
                    )
                ),
        ],
    };
}
function addShadeLayer(state: State, name: string): State {
    return {
        hues: state.hues,
        shades: [...state.shades, { name, avgValue: 45 }],
        colours: state.colours.map((hue) => [...hue, calculateColour(d3.mean(hue.map((c) => c.h)), 45, 45)]),
    };
}
function addLayer(state: State, data: AddLayerActionRequest['data']): State {
    if (data.name.length < 1) return state;
    switch (data.layerType) {
        case 'hue':
            return addHueLayer(state, data.name);
        case 'shade':
            return addShadeLayer(state, data.name);
        default:
            return state;
    }
}

function removeLayer(state: State, data: RemoveLayerActionRequest['data']): State {
    const ix = data.index;

    switch (data.layerType) {
        case 'hue':
            return {
                shades: state.shades,
                hues: state.hues.filter((v, i) => i !== ix),
                colours: state.colours.filter((v, i) => i !== ix),
            };
        case 'shade':
            return {
                hues: state.hues,
                shades: state.shades.filter((v, i) => i !== ix),
                colours: state.colours.map((hues) => hues.filter((v, i) => i !== ix)),
            };
        default:
            return state;
    }
}

function renameLayer(state: State, data: RenameActionRequest['data']): State {
    const ix = data.index;
    const nm = data.name;

    switch (data.layerType) {
        case 'hue':
            return {
                ...state,
                hues: state.hues.map((v, i) => (i === ix ? { name: nm, avgHue: v.avgHue } : v)),
            };
        case 'shade':
            return {
                ...state,
                shades: state.shades.map((v, i) => (i === ix ? { name: nm, avgValue: v.avgValue } : v)),
            };
        default:
            return state;
    }
}

// SaveStates and Export

function loadPallete(state: State, data: LoadPalleteActionRequest['data']): State {
    const nm = data.name;
    const dataString = localStorage.getItem(nm);
    const newPallete: State = JSON.parse(dataString);

    return { ...newPallete };
}

function savePallete(state: State, data: SavePalleteActionRequest['data']): State {
    const nm = data.name;
    const dataString = JSON.stringify(state);

    localStorage.setItem(nm, dataString);

    return state;
}

export function importPallete(state: State, data: ImportPalleteActionRequest['data']): State {
    const palleteData: JSONPallete = JSON.parse(data.dataString);
    const newState: State = {
        colours: palleteData.colours.map((hue, hi) => {
            return hue.map((col) => {
                return calculateColour(col.h, col.c, col.l);
            });
        }),
        hues: palleteData.hues.map((nm, i) => {
            return { name: nm, avgHue: circularMean(palleteData.colours[i].map((cl) => cl.h)) };
        }),
        shades: palleteData.shades.map((nm, i) => {
            return {
                name: nm,
                avgValue: d3.mean(palleteData.colours.map((h) => h[i].l)),
            };
        }),
    };

    return newState;
}

function rebuildPallete(state: State): State {
    return {
        ...state,
        colours: state.colours.map((hs) =>
            hs.map((col) => {
                return calculateColour(col.hex);
            })
        ),
    };
}

function calculateHue(state: State, data: CalculateHueActionRequest['data']): State {
    return {
        ...state,
        hues: state.hues.map((hue, i) => {
            return i === data.hueIndex ? { ...hue, avgHue: getMeanHue(i, state.colours) } : hue;
        }),
    };
}
function calculateShade(state: State, data: CalculateShadeActionRequest['data']): State {
    return {
        ...state,
        shades: state.shades.map((shades, i) => {
            return i === data.shadeIndex
                ? ({ ...shades, avgShade: getMeanShade(i, state.colours) } as ShadeInfo)
                : shades;
        }),
    };
}

export function palleteReducer(state: State, action: ActionOptions): State {
    switch (action.type) {
        case ACTION_TYPES.SET_COLOR:
            return setColor(state, action.data);
        case ACTION_TYPES.SET_VAL:
            return setValue(state, action.data);
        case ACTION_TYPES.ADD_LAYER:
            return addLayer(state, action.data);
        case ACTION_TYPES.REMOVE_LAYER:
            return removeLayer(state, action.data);
        case ACTION_TYPES.RENAME:
            return renameLayer(state, action.data);
        case ACTION_TYPES.LOAD_PALLETE:
            return loadPallete(state, action.data);
        case ACTION_TYPES.SAVE_PALLETE:
            return savePallete(state, action.data);
        case ACTION_TYPES.IMPORT_PALLETE:
            return importPallete(state, action.data);
        case ACTION_TYPES.REBUILD:
            return rebuildPallete(state);
        case ACTION_TYPES.CALCULATE_SHADE:
            return calculateShade(state, action.data);
        case ACTION_TYPES.CALCULATE_HUE:
            return calculateHue(state, action.data);
        default:
            return state;
    }
}

export function selectionReducer(selected: [number, number], action: SelectionOptions): [number, number] {
    switch (action.action) {
        case 'select':
            return action.tile;
        case 'deselect':
            return [-1, -1];
        default:
            return selected;
    }
}
export default { palleteReducer, selectionReducer };
