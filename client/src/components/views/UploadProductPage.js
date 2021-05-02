import React, {useState} from 'react'
import { Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../../../util_example/FileUpload';
import axios from 'axios';

const { TextArea } = Input;

const ComputerParts = [
    {key:1, value: "CPU"},
    {key:2, value: "GPU"},
    {key:3, value: "MOTHERBOARD"},
    {key:4, value: "RAM"},
    {key:5, value: "SSD"},
    {key:6, value: "HDD"},
    {key:7, value: "POWER"},
    {key:8, value: "CASE"},
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [ComputerPart, setComputerPart] = useState(1)

    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const partsChangeHandler = (event) => {
        setComputerPart(event.currentTarget.value)
    }

    const uploadImages = (newIamges) => {
        setImages(newIamges)
    }
    
    const submitHandler = (event) => {
        // 확인을 누를 떄 자동으로 리프레쉬 안되게
        event.preventDefault();

        // 유효성 체크
        // 모든 칸을 채워야
        if(!Title || !Description || !Price || !ComputerPart || !Images) {
            return alert("모두 입력하셔야 합니다")
        }

        // 서버에 값들을 request
        const body = {
            // 현재 로그인한 사람
            writer: {},
        }
        axios.post("/product", body)
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>컴퓨터 상품 업로드</h2 >
            </div>

            <Form onSubmit={submitHandler}>

                {/*dropzone*/}
                <FileUpload refreshFunction={uploadImages}/>
                <br />
                <br />
                <label>제품명</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격(₩)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <select onChange={partsChangeHandler} value={ComputerPart}>
                    {ComputerParts.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option> 
                    ))}
                </select>
                <br />
                <br />
                <Button type="submit">확인</Button>
            </Form>

        </div>
    )
}

export default UploadProductPage