import * as s from './stateCode';
import { writable } from 'svelte/store';

export const dispatch = writable(((action: s.Actions) => {
  return;
}) as s.Dispatcher);
