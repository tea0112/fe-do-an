import { useState, useEffect } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import EditTable from "./EditTable"

function SessionEdit() {
  // -state
  // eslint-disable-next-line no-unused-vars
  const [sessions, setSessions] = useState(null)
  const authRequest = useAuthRequest()

  const getAllSessions = () => authRequest.get(`/api/admin/sessions`)

  useEffect(async () => {
    const allSession = await getAllSessions()
    setSessions(allSession.data)
  }, [])

  return (
    <div>
      <h1>Sửa Các Niên Khoá</h1>
      {sessions && <EditTable sessions={sessions} setSessions={setSessions} />}
    </div>
  )
}

export default SessionEdit
