import React, {
  createContext, useContext, useMemo, useState,
} from 'react'

import computeLayoutConfig from '../utils/computeLayoutConfig'

const DEFAULT_STATE = {
  apiData: {},
  layout: {
    name: 'circle',
    avoidOverlap: true,
  },
  repName: 'moul/depviz-test',
  debugInfo: {
    fps: 0,
    nodes: 0,
    edges: 0,
    openedIssues: 0,
    closedIssues: 0,
    prsIssues: 0,
    extDepsIssues: 0,
  },
}

function createContextValue(state, setState) {
  return {
    ...state,
    updateApiData: (data, layout, repName) => {
      setState({
        ...state, apiData: data, layout: computeLayoutConfig(layout), repName,
      })
    },
    updateLayout: (layout) => {
      setState({ ...state, layout: computeLayoutConfig(layout) })
    },
    setDebugInfo: (info) => {
      setState({ ...state, debugInfo: { ...state.debugInfo, ...info } })
    },
  }
}

const StoreContext = createContext(createContextValue({
  ...DEFAULT_STATE,
  setState: () => console.error('You are using StoreContext without StoreProvider!'),
}))

export function useStore() {
  return useContext(StoreContext)
}

export function StoreProvider({ context, children }) {
  const [state, setState] = useState({
    ...DEFAULT_STATE,
    ...context,
  })

  // Memoize context values
  const contextValue = useMemo(() => createContextValue(state, setState), [state, setState])

  return (<StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>)
}
