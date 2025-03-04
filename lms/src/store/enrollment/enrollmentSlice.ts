import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { EnrollmentStatus } from "@/database/models/enrollment.schema";



export interface IEnrollment{
  student : string,
  course : string,
  enrolledAt : string,
  enrollmentStatus : EnrollmentStatus,
  whatsapp : string
}

interface IInitialData{
  status : Status,
  enrollments : IEnrollment[],

}

const data:IInitialData ={
  status :Status.Loading,
  enrollments : [],

}

const enrollmentSlice = createSlice({
  name: "enrollemts",
  initialState: data,
  reducers:{
    setStatus(state:IInitialData,action:PayloadAction<Status>){
      state.status = action.payload
    },
    setEnrollment(state:IInitialData, action:PayloadAction<IEnrollment[]>){
      state.enrollments = action.payload
    }
  }
})

const {setStatus, setEnrollment} = enrollmentSlice.actions
export default enrollmentSlice.reducer