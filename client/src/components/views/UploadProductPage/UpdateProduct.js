import React, {useState, useEffect} from 'react'
import { Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../util/FileUpload';
import axios from 'axios';
//import { response } from 'express';

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
    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                console.log('response data : ', response.data);
                setProduct(response.data.product[0])
            })
            .catch(err => alert(err))
    }, [])

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [DeliverPrice, setDeliverPrice] = useState(0)
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

    const deliverPriceChangeHandler = (event) => {
        setDeliverPrice(event.currentTarget.value)
    }

    const partsChangeHandler = (event) => {
        setComputerPart(event.currentTarget.value)
    }

    const uploadImages = (newIamges) => {
        setImages(newIamges)
    }
    
    const updateHandler = (event) => {
        // 확인을 누를 떄 자동으로 리프레쉬 안되게
        event.preventDefault();

        // 유효성 체크
        // 모든 칸을 채워야
        if(Price < 2) {
            return alert("이윤을 남기려면 1$ 이상의 값이어야 합니다.")
        }

        if(Title.length < 4) {
            return alert("정말 상품이 4글자 조차 안되나요?")
        }

        if(Images.length == 0 || !Title || !Description || !Price || !ComputerPart) {
            return alert("왜 값을 채우지 않은 것이지?")
        }

        // 서버에 값들을 request
        const body = {
            // 현재 로그인한 사람
            _id : productId,
            title: Title,
            description: Description,
            price: Price,
            deliverPrice: DeliverPrice,
            computerPart: ComputerPart,
            images: Images
        }


        axios.post("/api/product/updateProduct", body)
            .then(response => {
                if(response.data.success){
                    alert("상품 수정 성공")
                    props.history.push('/')
                } else {
                    alert("상품 수정 실패")
                }
            })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>컴퓨터 상품 수정</h2>
                <h3>수정 전 제목 : {Product.title}</h3>
            </div>

            <Form onSubmit={updateHandler}>

                {/*dropzone*/}
                <FileUpload refreshFunction={uploadImages}/>

                <br />
                <br />
                <label>제품명</label>
                <Input onChange={titleChangeHandler} defaultValue={Product.title} value={Title}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격($-달러)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <label>배송비($-달러)</label>
                <Input type="number" onChange={deliverPriceChangeHandler} value={DeliverPrice}/>
                <br />
                <br />
                <select onChange={partsChangeHandler} value={ComputerPart}>
                    {ComputerParts.map(item => (
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

export default UploadProductPage