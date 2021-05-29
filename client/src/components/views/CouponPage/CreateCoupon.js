import React from 'react';
import { Form, Input, Button, Segment, Grid, Divider } from 'semantic-ui-react'

function CreateCoupon({ couponname, price, onChange, onCreate}) {
    return (
        <div>
            <Form>
                <Form.Input
                    label='쿠폰 이름'
                    name="couponname"
                    placeholder='쿠폰 이름'
                    onChange={onChange}
                    value={couponname} />
                <Form.Input
                    // icon='lock'
                    // iconPosition='left'
                    label='가격'
                    name="price"
                    placeholder="가격"
                    onChange={onChange}
                    value={price}
                    type='text' />
                <Button content='등록'  onClick={onCreate} primary size='big'/>
            </Form>
        </div>
      );
}

export default CreateCoupon;