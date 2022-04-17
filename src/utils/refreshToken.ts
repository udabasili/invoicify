import { setCurrentUser } from "@/features/user/slice/userSlice"
import { UserAttributes } from "@/features/user/types"
import axios, { AxiosRequestConfig } from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useRefreshToken = (config: AxiosRequestConfig) => {
    const dispatch = useDispatch()

    return new Promise((resolve, reject) => {
        axios.get('/api/token/refresh')
            .then(async (res) => {
                const response = await axios(config)
                resolve(response)
            }).catch(err => {
                console.log(err.response)
                dispatch(setCurrentUser({} as UserAttributes))
                reject(err)
            })
    })
}
