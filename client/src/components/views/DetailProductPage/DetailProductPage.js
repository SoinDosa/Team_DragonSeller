import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Descriptions } from 'antd'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Header from '../Header/Header';
import { Table, TransitionablePortal, Rating,Icon} from 'semantic-ui-react'
import ProductComment from './Sections/ProductComment';
function DetailProductPage(props) {

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

    const whichPart = (value) => {
        switch(value){
            case 1: return "CPU"
            break;
            case 2: return "GPU"
            break;
            case 3: return "MOTHERBOARD"
            break;
            case 4: return "RAM"
            break;
            case 5: return "SSD"
            break;
            case 6: return "HDD"
            break;
            case 7: return "POWER"
            break;
            case 8: return "CASE"
            break;
            default : return ""
        }
    }

    const renderComment = () => (
         Product.comment && Product.comment.map((product, index) => (
            <p key={index}>
                총점<Rating icon="star" defaultRating={product.star} maxRating={5} disabled/> <br/>
                추천도<Rating icon="star" defaultRating={product.chuchan} maxRating={5} disabled/> <br/>
                배달속도<Rating icon="star" defaultRating={product.delivery} maxRating={5} disabled/> <br/>
                {product.comment}
            </p>
        )  
        )
    )


    return (
        <div>
            <Header/>
            <div style={{ width: '75%', padding: '1rem 1rem', paddingLeft: '30%'}}>
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
            </div> */}
                <ProductImage detail={Product} />
                <br />
                <Table celled striped>
                    <Table.Header align="center">
                        <Table.Row>
                            <Table.HeaderCell colSpan='2' >{Product.title}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                <Table.Body>                        
                    <Table.Row align="center">
                        <Table.HeaderCell colSpan='2' >{whichPart(Product.computerPart)}</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='folder' /> 가격
                        </Table.Cell>
                        <Table.Cell>{Product.price}$</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='folder' /> 배송비
                        </Table.Cell>
                        <Table.Cell>{Product.deliverPrice}$</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Icon name='folder' /> 상세
                        </Table.Cell>
                        <Table.Cell>{Product.description}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
           
            <ProductInfo detail={Product} />
            <br/>
            <div style={{ justifyContent: 'center' }}>
                {renderComment()}
            </div>
            <br/>
            
            <ProductComment detail={Product} />
        </div>
    </div>
    )
}

export default DetailProductPage