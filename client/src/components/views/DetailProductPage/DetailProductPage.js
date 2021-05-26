import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Descriptions } from 'antd'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Header from '../Header/Header';
import { Table, TransitionablePortal, Icon} from 'semantic-ui-react'
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
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='folder' /> 가격
                        </Table.Cell>
                        <Table.Cell>{Product.price}$</Table.Cell>
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
            <br />
            <ProductComment detail={Product} />
        </div>
    </div>
    )
}

export default DetailProductPage