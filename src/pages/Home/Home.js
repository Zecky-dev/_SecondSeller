import React from 'react'
import {View,Text} from 'react-native'

import { AdvertisementDetail } from '@pages'

const advertisementDetails = {
    id: 1,
    name: "Gaming Laptop",
    price: 100,
    description: "Magna anim consequat ipsum eu sint aliquip. Consequat eiusmod excepteur dolor excepteur proident anim esse exercitation exercitation.Magna anim consequat ipsum eu sint aliquip. Consequat eiusmod excepteur dolor excepteur proident anim esse exercitation exercitation.Magna anim consequat ipsum eu sint aliquip.",
    location: {
        lat: 41.015137,
        long: 28.979530
    },
    images: [
        "https://i0.shbdn.com/photos/89/53/04/x5_1118895304tar.jpg",
        "https://i0.shbdn.com/photos/00/62/80/x5_10880062800ye.jpg",
        "https://i0.shbdn.com/photos/28/56/36/x5_11382856362hr.jpg",
        "https://i0.shbdn.com/photos/28/56/36/x5_11382856362hr.jpg",
        "https://i0.shbdn.com/photos/28/56/36/x5_11382856362hr.jpg",
        "https://i0.shbdn.com/photos/28/56/36/x5_11382856362hr.jpg",
        "https://i0.shbdn.com/photos/28/56/36/x5_11382856362hr.jpg"
    ],
    owner: {
        id: 1,
        nameSurname: "Zekeriya Dönmez",
        phoneNumber: "5059880137"
    }
}   

const Home = () => {
    return (
        <View>
            <AdvertisementDetail advertisement={advertisementDetails}/>
        </View>
    )
}

export default Home