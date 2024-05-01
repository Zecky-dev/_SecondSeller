import axios from 'axios';

import {BASE_URL} from '@env'

const createAdvertisement = async values => {
    const {
        advertisementCategory : category,
        advertisementDescription : description,
        advertisementImageURIS: imageURIS,
        advertisementName : title,
        advertisementPrice : price
    } = values

    const response = await axios.post(`${BASE_URL}/advertisements/create`, {
        title,
        description,
        price,
        category,
        imageURIS,
    })

}

export {
    createAdvertisement
}