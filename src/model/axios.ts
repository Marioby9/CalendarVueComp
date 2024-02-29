import { BASE_URL, TABLE } from "@/model/globalParams"

export const getEventByDate = async (date:string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${TABLE}`)
        return response.data.filter(elm => elm.date == date)
    } catch (error) {
        console.log(error)
        return null
    }
}


export const saveEvent = async(event) => {
    try{
        await axios.post(`${BASEURL}/${tabla}`, event)
        return true
    }catch(error){
        console.log(error)
        return false
    }    
}