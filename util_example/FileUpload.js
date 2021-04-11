import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { response } from 'express';

// axios 설치 필요
// front-end 작업이 끝나게 되면 배너 업로드 페이지에서 이미지 업로드로 사용할 예정입니다
// onDrop 함수에서 파일을 서버로 보내는 역할을 해 줍니다.

function FileUpload() {

    const [Images, setImages] = useState([])




    let formData = new FormData();

    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }

    formData.append("file", files[0])

    const dropHandler = (files) => {
        axios.post('/api/product/image', formData, config)
            .then(response => {
                if(response.data.success){
                    /// ...Images : 이미지 다 넣어준다는 뜻
                    setImages([...Images, response.data.filePath])
                } else {
                    alert('파일 업로드 실패!')
                }
            })
    }

    // 아래는 front 형식
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div 
                        style={{ width: 300, height: 240, border: '1px solid lightgray',
                        display: 'flex', alignSelf: 'center', justifyContent: 'center'    
                        }} 
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                {Images.map((image, index) => (
                    <div key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload
