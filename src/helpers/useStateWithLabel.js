import { useDebugValue, useState } from "react"

function useStateWithLabel(initialState, name) {
  const [value, setValue] = useState(initialState)
  useDebugValue(`${name}: ${value}`)
  return [value, setValue]
}

export default useStateWithLabel
