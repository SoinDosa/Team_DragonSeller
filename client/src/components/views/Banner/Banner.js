import React, { useState, useEffect ,Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from 'axios'
const s3path = 'https://seonhwi.s3.amazonaws.com/'
/*
npm install react-slick --save


npm install slick-carousel

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
*/


export default function SimpleSlider() {
  const [BannerEvent, setBannerEvent] = useState([])
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: '100'
    };
    useEffect(() => {
      getBanners()
  }, [])

    const getBanners = () => {
      Axios.get('api/bannerPost/getBanners')
      .then(response => {
          if(response.data.success){
              console.log("banner data")
              console.log(response.data.banners)
              //여기 바꿔야될듯..?
              if(response.data.length>0){
                  setBannerEvent([...BannerEvent, ...response.data.banners])
              }else{
                setBannerEvent(response.data.banners)
              }

          }else{
              alert('Failed to fetch banner images')
          }
      })
  }
  const renderImage = BannerEvent.map((item) => {
    return (
      <div>
        <img style={{width: '100%',height: '300px'}} src={`${s3path}${item.images[0]}`}/>
      </div>
    )
  })


    return (
      <div>
       <Slider {...settings} style={{
          fontsize: '36px',
          height: '200px',
          lineheight: '100px',
          margin: '10px',
          padding: '2%',
          position: 'relative',
          textalign: 'center'}}>
            {renderImage}
        </Slider>
      </div>
      
    );
  }
  // bannerpost에 추가해야 할 부분.
  // router.get('/getBanners', (req, res) => {
  //   let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  //   let findArgs = {};
  //   BannerPost.find(findArgs)
  //       .sort([[sortBy, 1]])
  //       .exec((err,banners) => {
  //       if(err) return res.status(400).json({success: false, err})
  //       res.status(200).json({success:true, banners})
  //   })
  // })