import React from 'react';
import { Form, Input, Button, Segment, Grid, Divider } from 'semantic-ui-react'

function CreateCoupon({ title, price, type, onChangeTitle, onChangePrice, onChangeType, onCreate}) {
    return (
        <div>
            <Form onSubmit={onCreate}> 
                <Form.Input
                    label='쿠폰 이름'
                    name="title"
                    placeholder='쿠폰 이름'
                    onChange={onChangeTitle}
                    value={title} />
                <Form.Input
                    // icon='lock'
                    // iconPosition='left'
                    label='가격'
                    name="price"
                    placeholder="가격"
                    onChange={onChangePrice}
                    value={price}
                    type='text' />
                <Form.Input
                    label='할인타입'
                    name='type'
                    placeholder='할인타입(1 or 2)'
                    onChange={onChangeType}
                    value={type}
                    type='text' />
                <Button content='등록'  primary size='big'/>
            </Form>
        </div>
      );
}

export default CreateCoupon;