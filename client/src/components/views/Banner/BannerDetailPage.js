import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Descriptions } from 'antd'
import Header from '../Header/Header';
import BannerImage from './BannerImage';


function BannerDetailPage(props) {

    const bannerId = props.match.params.bannerId

    const [Banner, setBanner] = useState({})

    useEffect(() => {
        axios.get(`/api/bannerPost/banners_by_id?id=${bannerId}&type=single`)
            .then(response => {
                console.log('response data : ', response.data);
                setBanner(response.data.banner[0])
            })
            .catch(err => alert(err))
    }, [])



    return (
        <div>
            <Header/>
            <div style={{ width: '75%', padding: '1rem 4rem', paddingLeft: '30%'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BannerImage detail={Banner} />
            </div>
            
            <br />
            <Descriptions title={Banner.title}>
                    <Descriptions.Item labels="Description">배너 설명 : {Banner.contents}</Descriptions.Item>
                    <br/>
            </Descriptions>
            </div>
        </div>
        
    )
}

export default BannerDetailPage