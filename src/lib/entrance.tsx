import { createContext, useContext, type Accessor, type JSX } from 'solid-js'
import { createGate } from './primitives'

/*
 * Shared entrance state for the hub. The gate owns a single `createGate` run;
 * `entered` flips true the moment the doors open, so the board (cards + circuit
 * traces) can start its reveal exactly when it becomes visible — never behind
 * the closed gate. Without a provider, `entered` defaults to true so anything
 * that reads it simply shows immediately.
 */
type EntranceValue = {
  readonly progress: Accessor<number>
  readonly entered: Accessor<boolean>
}

const EntranceContext = createContext<EntranceValue>()

export function EntranceProvider(props: { children: JSX.Element }) {
  const { progress, open } = createGate({ duration: 2200 })
  return (
    <EntranceContext.Provider value={{ progress, entered: open }}>
      {props.children}
    </EntranceContext.Provider>
  )
}

export function useEntrance(): EntranceValue {
  return useContext(EntranceContext) ?? { progress: () => 1, entered: () => true }
}
