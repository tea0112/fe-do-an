import { memo, useState } from "react"
import _ from "lodash"

function SessionComponent({ setParentSessionInput, sessions }) {
  const [sessionInput, setSessionInput] = useState("")
  const sessionOption = (sessionData) =>
    sessionData.map((session) => (
      <option key={session.id} value={session.id}>
        {session.name}
      </option>
    ))
  const handleSessionChange = (e) => {
    setSessionInput(e.target.value)
    setParentSessionInput(e.target.value)
  }
  return (
    <>
      <div className="form-group">
        Niên Khoá
        <select
          className="form-control"
          id="sessionInput"
          onChange={handleSessionChange}
          value={sessionInput}
        >
          {sessions && sessionOption(sessions)}
        </select>
      </div>
    </>
  )
}

const areEqual = (prv, nxt) => _.isEqual(prv.sessions, nxt.sessions)

export default memo(SessionComponent, areEqual)
