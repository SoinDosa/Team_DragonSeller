import React, {useState} from 'react'
import { Typography, Button, Form, Input} from 'antd';
import BannerUpload from '../../util/BannerUpload';
import axios from 'axios';
//import { response } from 'express';

const { TextArea } = Input;

function UploadBannerPage(props) {

    const [Title, setTitle] = useState("")
    const [Contents, setContents] = useState("")
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const contentsChangeHandler = (event) => {
        setContents(event.currentTarget.value)
    }

    const uploadImages = (newIamges) => {
        setImages(newIamges)
    }
    
    const submitHandler = (event) => {
        // 확인을 누를 떄 자동으로 리프레쉬 안되게
        event.preventDefault();


        // 서버에 값들을 request
        const body = {
            title: Title,
            contents: Contents,
            images: Images
        }


        axios.post("/api/bannerPost", body)
            .then(response => {
                if(response.data.success){
                    alert("배너 업로드 성공")
                    props.history.push('/')
                } else {
                    alert("배너 업로드 실패")
                }
            })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>배너 업로드</h2>
            </div>

            <Form onSubmit={submitHandler}>

                {/*dropzone*/}
                <BannerUpload refreshFunction={uploadImages}/>

                <br />
                <br />
                <label>제목</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br />
                <br />
                <label>내용</label>
                <TextArea onChange={contentsChangeHandler} value={Contents}/>
                <br />
                <br />
                <Button htmlType="submit" onClick={submitHandler}>Submit</Button>
            </Form>

        </div>
    )
}

export default UploadBannerPage