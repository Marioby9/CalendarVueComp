import axios from "axios"
import { BASE_URL, TABLE } from "@/model/globalParams"
import type Event from "@/interfaces/event"


export const getEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/${TABLE}`)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}


export const modifyEvent = async(event:Event) => {
    try{
        await axios.put(`${BASE_URL}/${TABLE}/${event.id}`, event)
        return true
    }catch(error){
        console.log(error)
        return false
    }    
}

export const modifyDate = async(id:string, date:string) => {
    try{
        await axios.patch(`${BASE_URL}/${TABLE}/${id}`, {date: date})
        return true
    }catch(error){
        console.log(error)
        return false
    }    
}


export const saveEvent = async(event:Event) => {
    try{
        await axios.post(`${BASE_URL}/${TABLE}`, event)
        return true
    }catch(error){
        console.log(error)
        return false
    }    
}


export const deleteEvent = async (id:string) => {
    try {
        await axios.delete(`${BASE_URL}/${TABLE}/${id}`)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}