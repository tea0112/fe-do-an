import { useEffect, useState } from "react"
import BasicSelect from "../../../../components/form/BasicSelect/BasicSelect"
import BasicOption from "../../../../components/form/BasicOption/BasicOption"
import BasicButton from "../../../../components/form/BasicButton/BasicButton"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import DeleteTable from "./DeleteTable"

function ScheduleDelete() {
  const authRequest = useAuthRequest()
  const [state, setState] = useState({
    sessionInput: "",
    departmentInput: "",
    classInput: "",
    semesterInput: "",
    sessions: null,
    departments: null,
    classes: null,
    semesters: null,
    schedules: null,
    isLoading: false,
  })

  const fetchAllSessions = () => authRequest.get(`/api/admin/sessions`)
  const fetchAllDepartments = () => authRequest.get(`/api/departments`)
  const fetchSemesters = (sessionId) =>
    authRequest.get(`/api/semesters?sessionId=${sessionId}`)
  const fetchClasses = (sessionId, departmentId) =>
    authRequest.get(
      `/api/classes?sessionId=${sessionId}&departmentId=${departmentId}`
    )
  const fetchSchedules = (classId, semesterId) =>
    authRequest.get(
      `/api/schedules?classId=${classId}&semesterId=${semesterId}`
    )

  useEffect(async () => {
    try {
      const fetchedSessions = await fetchAllSessions()
      setState((prevState) => ({
        ...prevState,
        sessions: fetchedSessions.data,
      }))
      if (fetchedSessions.data.length > 0) {
        setState((prevState) => ({
          ...prevState,
          sessionInput: fetchedSessions.data[0].id.toString(),
        }))
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }

    try {
      const fetchedDepartments = await fetchAllDepartments()
      setState((prevState) => ({
        ...prevState,
        departments: fetchedDepartments.data,
      }))
      if (fetchedDepartments.data.length > 0) {
        setState((prevState) => ({
          ...prevState,
          departmentInput: fetchedDepartments.data[0].id.toString(),
        }))
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])
  useEffect(async () => {
    if (state.sessionInput.length > 0 && state.departmentInput.length > 0) {
      try {
        const fetchedClasses = await fetchClasses(
          state.sessionInput,
          state.departmentInput
        )
        setState((prevState) => ({
          ...prevState,
          classes: fetchedClasses.data,
        }))
        if (fetchedClasses.data.length > 0) {
          setState((prevState) => ({
            ...prevState,
            classInput: fetchedClasses.data[0].id.toString(),
          }))
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }, [state.sessionInput, state.departmentInput])
  useEffect(async () => {
    if (state.sessionInput.length > 0) {
      const fetchedSemesters = await fetchSemesters(state.sessionInput)
      setState((prevState) => ({
        ...prevState,
        semesters: fetchedSemesters.data,
      }))
      if (fetchedSemesters.data.length > 0) {
        setState((prevState) => ({
          ...prevState,
          semesterInput: fetchedSemesters.data[0].id.toString(),
        }))
      }
    }
  }, [state.sessionInput, state.departmentInput])

  const onSessionInputChange = (e) => {
    e.preventDefault()
    setState((prevState) => ({ ...prevState, sessionInput: e.target.value }))
  }
  const onDepartmentInputChange = (e) => {
    e.preventDefault()
    setState((prevState) => ({
      ...prevState,
      departmentInput: e.target.value,
    }))
  }
  const onClassInputChange = (e) => {
    e.preventDefault()
    setState((prevState) => ({ ...prevState, classInput: e.target.value }))
  }
  const onSemesterInputChange = (e) => {
    e.preventDefault()
    setState((prevState) => ({ ...prevState, semesterInput: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (state.classInput.length > 0 && state.semesterInput.length > 0) {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }))
        const fetchedSchedules = await fetchSchedules(
          state.classInput,
          state.semesterInput
        )
        setState((prevState) => ({
          ...prevState,
          schedules: fetchedSchedules.data,
          isLoading: false,
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        setState((prevState) => ({ ...prevState, isLoading: false }))
      }
    }
  }

  return (
    <>
      <h1>Xoá Thời Khoá Biểu</h1>
      <form name="addStudent" onSubmit={onSubmit}>
        <BasicSelect
          id="sessionInput"
          label="Niên Khoá"
          value={state.sessionInput}
          onChange={onSessionInputChange}
        >
          <BasicOption
            options={state.sessions || null}
            content="name"
            keyLabel="id"
            valueLabel="id"
          />
        </BasicSelect>
        <BasicSelect
          id="departmentInput"
          label="Khoa"
          value={state.departmentInput}
          onChange={onDepartmentInputChange}
        >
          <BasicOption
            options={state.departments || null}
            content="name"
            keyLabel="id"
            valueLabel="id"
          />
        </BasicSelect>
        <BasicSelect
          id="classInput"
          label="Lớp"
          value={state.classInput}
          onChange={onClassInputChange}
        >
          <BasicOption
            options={state.classes || null}
            content="name"
            keyLabel="id"
            valueLabel="id"
          />
        </BasicSelect>
        <BasicSelect
          id="semesterInput"
          label="Học Kỳ"
          value={state.semesterInput}
          onChange={onSemesterInputChange}
        >
          <BasicOption
            options={state.semesters || null}
            content="termNumber"
            keyLabel="id"
            valueLabel="id"
          />
        </BasicSelect>
        <BasicButton
          type="submit"
          className="btn btn-primary"
          disabled={state.isLoading}
        >
          Tìm
        </BasicButton>
      </form>
      <hr />
      {state.schedules && (
        <DeleteTable schedules={state.schedules} setSchedules={setState} />
      )}
      <br />
    </>
  )
}

export default ScheduleDelete
