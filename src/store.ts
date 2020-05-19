import {
    JSONPallete,
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
} from './types';
import { Reducer } from 'react';
import * as d3 from 'd3';
import { hcl } from 'd3';

// Change Color

function updateColor(state: JSONPallete, h: number, s: number, newCol: Col) {
    return {
        ...state,
        colours: state.colours.map((hs, i) =>
            i === h ? hs.map((ss, i) => (i === s ? newCol : ss)) : hs
        ),
    } as JSONPallete;
}
function setColor(state: JSONPallete, data: SetColorActionRequest['data']) {
    const { h, c, l } = hcl(data.color);

    return updateColor(state, data.hue, data.shade, { h, c, l });
}

function setValue(state: JSONPallete, data: SetValActionRequest['data']) {
    const updatedColor: Col = { ...state.colours[data.hue][data.shade] };

    updatedColor[data.prop] = data.value;

    return updateColor(state, data.hue, data.shade, updatedColor);
}

// Layers
function degDist(a: number, b: number) {
    return Math.abs(b - a) < 180 ? Math.abs(b - a) : 360 - Math.abs(b - a);
}
function addHueLayer(state: JSONPallete, name: string): JSONPallete {
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
        hues: [...state.hues, name],
        colours: [
            ...state.colours,
            d3.range(state.shades.length).map((si) => ({
                h: newHue,
                c: d3.mean(state.colours.map((hue) => hue[si].c)),
                l: d3.mean(state.colours.map((hue) => hue[si].l)),
            })),
        ],
    };
}
function addShadeLayer(state: JSONPallete, name: string): JSONPallete {
    return {
        hues: state.hues,
        shades: [...state.shades, name],
        colours: state.colours.map((hue) => [
            ...hue,
            { h: d3.mean(hue.map((c) => c.h)), c: 45, l: 45 },
        ]),
    };
}
function addLayer(
    state: JSONPallete,
    data: AddLayerActionRequest['data']
): JSONPallete {
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

function removeLayer(
    state: JSONPallete,
    data: RemoveLayerActionRequest['data']
): JSONPallete {
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
                colours: state.colours.map((hues) =>
                    hues.filter((v, i) => i !== ix)
                ),
            };
        default:
            return state;
    }
}

function renameLayer(
    state: JSONPallete,
    data: RenameActionRequest['data']
): JSONPallete {
    const ix = data.index;
    const nm = data.name;

    switch (data.layerType) {
        case 'hue':
            return {
                ...state,
                hues: state.hues.map((v, i) => (i === ix ? nm : v)),
            };
        case 'shade':
            return {
                ...state,
                shades: state.shades.map((v, i) => (i === ix ? nm : v)),
            };
        default:
            return state;
    }
}

// SaveStates and Export

function loadPallete(
    state: JSONPallete,
    data: LoadPalleteActionRequest['data']
): JSONPallete {
    const nm = data.name;
    const dataString = localStorage.getItem(nm);
    const newPallete: JSONPallete = JSON.parse(dataString);

    return { ...newPallete };
}

function savePallete(
    state: JSONPallete,
    data: SavePalleteActionRequest['data']
): JSONPallete {
    const nm = data.name;
    const dataString = JSON.stringify(state);

    localStorage.setItem(nm, dataString);

    return state;
}

function importPallete(
    state: JSONPallete,
    data: ImportPalleteActionRequest['data']
): JSONPallete {
    return JSON.parse(data.dataString);
}

function rebuildPallete(state: JSONPallete): JSONPallete {
    return {
        ...state,
        colours: state.colours.map((hs) =>
            hs.map(({ h, c, l }) => {
                const hex = d3.hcl(h, c, l).hex();
                const nc = d3.hcl(hex);

                return { h: nc.h, c: nc.c, l: nc.l };
            })
        ),
    };
}

export function palleteReducer(
    state: JSONPallete,
    action: ActionOptions
): JSONPallete {
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
        default:
            return state;
    }
}

export function selectionReducer(
    selected: [number, number],
    action: SelectionOptions
): [number, number] {
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
