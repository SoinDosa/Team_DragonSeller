import React, {useState} from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';
import { Tab, Table} from 'semantic-ui-react'
const s3path = 'https://seonhwi.s3.amazonaws.com/';


function UserCardBlock(props) {
    const [data,setData] = useState(0);

    const renderCartImg = (images) => {
        if(images.length > 0){
            let image = images[0]
            return `${s3path}${image}`
        }
    }

    const inHan = (e) =>{
        console.log(e)
        dispatch(addToCart(e._id, parseInt(1)))
    }

    const deHan = (e) =>{
        console.log(e)
        if(e.quantity > 1)
            dispatch(addToCart(e._id, parseInt(-1)))
    }
    const dispatch = useDispatch();

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <p >
                <Table celled padded >
                <Table.Body style={{height:"200px"}} bgColor="#9df3c4" >
                        <Table.Row>
                            <Table.HeaderCell singleLine >상품</Table.HeaderCell>
                            <Table.HeaderCell >상품이름</Table.HeaderCell>
                            <Table.HeaderCell>수량추가</Table.HeaderCell>
                            <Table.HeaderCell>가격</Table.HeaderCell>
                            <Table.HeaderCell>항목 삭제</Table.HeaderCell>
                        </Table.Row>
                    </Table.Body>
                    
                    <Table.Body>
                        <Table.Row key={index}>
                            <Table.Cell  style={{width:"25vw",display:"flex", justifyContent:"center", margin:"0 auto"}} >
                            <img src={renderCartImg(product.images)} width="350px" height="200px" margin="0"/>
                            </Table.Cell>
                            <Table.Cell  >
                                {product.title}
                            </Table.Cell>
                            <Table.Cell textAlign="center">
                                <button onClick={() => inHan(product)}>추가</button>
                                <button onClick={() => deHan(product)}>뺴기</button>
                                <h3>{product.quantity} 개 </h3>
                                
                            </Table.Cell>
                            <Table.Cell>
                            <h3>{product.price*product.quantity} $ </h3>
                            </Table.Cell>
                            <Table.Cell >
                                <button onClick={ () => props.removeItem(product._id) }>삭제</button>
                            </Table.Cell>
                            
                        </Table.Row>
                        </Table.Body>
                </Table>
            </p>
        ))
    )


    return (
        <div style={{width:"70vw", margin:"0 auto"}}>
            {renderItems()}
        </div>
    )
}

export default UserCardBlock
