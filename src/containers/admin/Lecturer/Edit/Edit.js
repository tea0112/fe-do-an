import { useEffect, useState } from "react"
import BasicSelect from "../../../../components/admin/form/BasicSelect/BasicSelect"
import BasicOption from "../../../../components/admin/form/BasicOption/BasicOption"
import BasicButton from "../../../../components/admin/form/BasicButton/BasicButton"
import EditTable from "./EditTable"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function SubjectEdit() {
  const [state, setState] = useState({
    subjects: null,
    departments: null,
    departmentInput: "",
    subjectTypeInput: "0",
    isLoading: false,
  })
  const authRequest = useAuthRequest()

  const getDepartments = () => authRequest.get("/api/departments")
  const getSubjects = (subjectType, departmentId) =>
    authRequest.get(
      `/api/admin/subjects?subjectType=${subjectType}&departmentId=${departmentId}`
    )

  useEffect(async () => {
    try {
      const fetchedDepartments = await getDepartments()
      setState((prevState) => ({
        ...prevState,
        departments: fetchedDepartments.data,
      }))
      if (fetchedDepartments.data.length > 0) {
        setState((prevState) => ({
          ...prevState,
          departmentInput: fetchedDepartments.data[0].id,
        }))
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])

  const onDepartmentInputChange = (e) => {
    setState((prevState) => ({ ...prevState, departmentInput: e.target.value }))
  }
  const onSubjectTypeInputChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      subjectTypeInput: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }))
      const fetchedSubjects = await getSubjects(
        state.subjectTypeInput,
        state.departmentInput
      )
      setState((prevState) => ({
        ...prevState,
        subjects: fetchedSubjects.data,
      }))
      setState((prevState) => ({ ...prevState, isLoading: false }))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }
  return (
    <>
      <h1>Sửa Môn</h1>
      <form onSubmit={onSubmit}>
        <BasicSelect
          id="departmentInput"
          label="Khoa"
          value={state.departmentInput}
          onChange={onDepartmentInputChange}
        >
          <BasicOption
            options={state.departments}
            valueLabel="id"
            keyLabel="id"
            content="name"
          />
        </BasicSelect>
        <BasicSelect
          id="subjectTypeInput"
          label="Kiểu Môn"
          onChange={onSubjectTypeInputChange}
        >
          <BasicOption
            options={[
              { value: 0, type: "Lý Thuyết" },
              { value: 1, type: "Thực Hành" },
            ]}
            valueLabel="value"
            keyLabel="value"
            content="type"
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
      {state.subjects && state.departments && (
        <EditTable
          subjects={state.subjects}
          setSubjects={setState}
          departments={state.departments}
        />
      )}
    </>
  )
}

export default SubjectEdit
