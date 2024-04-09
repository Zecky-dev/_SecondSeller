import axios from 'axios'

import { BASE_URL } from '@env'

const sendEmailVerification = async (values) => {
    const { emailAddress } = values
    console.log(emailAddress)
    try {
        const response = await axios.post(`${BASE_URL}/user/sendEmailVerification`,{emailAddress})
        return response.data        
    }
    catch(err) {
        return err;
    }
    
}



const register = async (values) => {
    const {
        nameSurname,
        emailAddress,
        phoneNumber,
        password
    } = values;
    
    try {
        const response = await axios.post(`${BASE_URL}/user/register`, {
            nameSurname,
            emailAddress,
            phoneNumber,
            password
        })
        return response.data;
    }
    catch(err) {
        return err;
    }
   
}

export {
    register,
    sendEmailVerification
}