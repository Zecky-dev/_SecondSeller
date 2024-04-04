// Favori postlar ve kullanıcının favoriye attığı postları gösteren sayfa

import React, {useState} from 'react'
import {useWindowDimensions} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import { COLORS } from '@utils'
import { AdvertisementModel } from '@utils/models'; 

// Pages
import Advertisements from './Advertisements';

const advertisements = [
    new AdvertisementModel(
        1,
        "Gaming Laptop"
        ,15.000,
        "Acer Gaming Laptop",
        {
            long: 28.979530,
            lat: 41.015137    
        },
        [
            "https://i0.shbdn.com/photos/28/56/36/x5_11382856362hr.jpg",
            "https://i0.shbdn.com/photos/61/95/95/x5_1160619595udr.jpg",
            "https://i0.shbdn.com/photos/88/32/00/x5_1160883200xl4.jpg"
        ],
        "Sena"
    ),
    new AdvertisementModel(
        2,
        "Fakir Süpürge",
        6000,
        "Fakir çok fonksiyonlu süpürge, temizdir.",
        {
            long: 29.074202,
            lat: 40.193298    
        },
        [
            "https://i0.shbdn.com/photos/90/97/55/x5_1087909755prf.jpg",
            "https://i0.shbdn.com/photos/90/97/55/x5_1087909755hwa.jpg",
        ],
        "Mehmet"
    ),
    new AdvertisementModel(
        3,
        "Yatak Odası Takımı"
        ,20.000,
        "Az kullanılmış yatak odası takımı, ihtiyaçtan satıyorum almak isteyne duyuurl",
        {
            long: 35.437019,
            lat: 36.989769    
        },
        [
            "https://i0.shbdn.com/photos/55/46/97/x5_1110554697uw3.jpg",
            "https://i0.shbdn.com/photos/51/10/65/x5_1118511065l07.jpg",
            "https://i0.shbdn.com/photos/64/33/55/x5_1117643355vj4.jpg",
            "https://i0.shbdn.com/photos/46/24/94/x5_1113462494fxj.jpg"
        ],
        "Zecky"
    ),
]

// Burada kullanıcının sahip olduğu postlar ve favorileri çekilecek..
const ownAdvertisements = advertisements.filter(adversiment => adversiment.owner === "Zecky")
let favoriteAdvertisements = advertisements.filter(adversiment => adversiment.owner !== "Zecky")

const renderScene = SceneMap({
    ownAdvertisements: () => <Advertisements advertisements={ownAdvertisements}/>, 
    favoriteAdvertisements: () => <Advertisements advertisements={favoriteAdvertisements}/>
})

const renderTabBar = (props) => {
    return (
        <TabBar
            {...props}
            style={{backgroundColor: COLORS.primary}}
            renderIndicator={() => null}
        />
    )
}

const OwnFavoriteAdvertisements = () => {
    const layout = useWindowDimensions()
    const [index,setIndex] = useState(0)

    const [routes] = useState([
        { key: 'ownAdvertisements', title: 'İlanlarım'},
        { key: 'favoriteAdvertisements', title: 'Favorilerim'}
    ])
   
    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{backgroundColor: COLORS.primary}}
            renderTabBar={renderTabBar}
        />
    )
}

export default OwnFavoriteAdvertisements