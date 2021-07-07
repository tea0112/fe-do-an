import { useState, useEffect } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import DeleteTable from "./DeleteTable"

function SessionDelete() {
  const [sessions, setSessions] = useState(null)
  const authRequest = useAuthRequest()

  const getAllSessions = () => authRequest.get(`/api/admin/sessions`)

  useEffect(async () => {
    const allSession = await getAllSessions()
    setSessions(allSession.data)
  }, [])

  return (
    <div>
      <h1>Xoá Niên Khoá</h1>
      {sessions && (
        <DeleteTable sessions={sessions} setSessions={setSessions} />
      )}
    </div>
  )
}

export default SessionDelete
