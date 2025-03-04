import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInitialData, IStudent } from "./types"
import { Status } from "../category/types"
import { AppDispatch } from "../store"
import API from "@/http"




const data:IInitialData={
  status : Status.Loading,
  students:[],
}
const studentSlice= createSlice({
  name : "students",
  initialState : data,
  reducers :{
    setStatus(state:IInitialData, action:PayloadAction<Status>)
    {
      state.status = action.payload
    },
    setStudents(state:IInitialData,action:PayloadAction<IStudent[]>){
      state.students = action.payload
    },
     deleteStudentByIndex(state: IInitialData, action: PayloadAction<string>) {
          const index = state.students.findIndex(
            (student) => student._id == action.payload
          );
          if (index !== -1) {
            state.students.splice(index, 1);
          }
        },
  }
})


const {setStatus, setStudents, deleteStudentByIndex} = studentSlice.actions
export default studentSlice.reducer


export function fetchStudents(){
  return async function fetchStudentsThunk(dispatch:AppDispatch) {
    try {
      const response = await API.get("/student")
      if(response.status === 200){
        dispatch(setStatus(Status.Success))
        dispatch(setStudents(response.data.data))
      }
      else{
        dispatch(setStatus(Status.Error))
      }
    } catch (error) {
      dispatch(setStatus(Status.Error))
    }
  }
}


export function deleteStudent(id: string) {
  return async function deleteStudentThunk(dispatch: AppDispatch) {
    try {
      const response = await API.delete("/lesson/" + id);
      if (response.status == 200) {
        dispatch(deleteStudentByIndex(id));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}
