import React, {useState, useEffect} from 'react'
import { Typography, Button, Form, Input} from 'antd';
import BannerUpload from '../../util/BannerUpload';
import axios from 'axios';
//import { response } from 'express';

const { TextArea } = Input;

const BannerParts = [
    {key:1, value: "공지사항"},
    {key:2, value: "이벤트"}
]
function UploadBannerPage(props) {
    
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

    const [Title, setTitle] = useState("")
    const [Contents, setContents] = useState("")
    const [BannerPart, setBannerPart] = useState(1)
    const [Images, setImages] = useState([])


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const contentsChangeHandler = (event) => {
        setContents(event.currentTarget.value)
    }
    
    const partsChangeHandler = (event) => {
        setBannerPart(event.currentTarget.value)
    }

    const uploadImages = (newIamges) => {
        setImages(newIamges)
    }
    
    const updateHandler = (event) => {
        // 확인을 누를 떄 자동으로 리프레쉬 안되게
        event.preventDefault();


        // 서버에 값들을 request
        const body = {
            _id: bannerId,
            title: Title,
            contents: Contents,
            images: Images,
            bannerPart: BannerPart
        }

        if(Title.length < 4) {
            return alert("정말 제목이 4글자 조차 안되나요?")
        }

        if(Images.length == 0 || !Title || !Contents || !BannerPart) {
            return alert("값을 모두 채워주세요")
        }
        axios.post("/api/bannerPost/updateBanner", body)
            .then(response => {
                if(response.data.success){
                    alert("배너 수정 성공")
                    props.history.push('/')
                } else {
                    alert("배너  실패")
                }
            })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>배너 수정</h2>
                <h3>수정 전 제목 : {Banner.title}</h3>
            </div>

            <Form onSubmit={updateHandler}>

                {/*dropzone*/}
                <BannerUpload refreshFunction={uploadImages}/>

                <br />
                <br />
                <label>제목</label>
                <Input onChange={titleChangeHandler} value={Title} /*defaultValue={Banner.title}*/ />
                <br />
                <br />
                <label>내용</label>
                <TextArea onChange={contentsChangeHandler} value={Contents}/>
                <br />
                <br />
                <select onChange={partsChangeHandler} value={BannerPart}>
                    {BannerParts.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option> 
                    ))}
                </select>
                <br />
                <br />
                <Button htmlType="submit" onClick={updateHandler}>Update</Button>
            </Form>

        </div>
    )
}

export default UploadBannerPage