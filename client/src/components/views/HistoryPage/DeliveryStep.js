import React from 'react'
import { Icon, Step } from 'semantic-ui-react'



const DeliveryStep =(props)=> {


  return(
    <Step.Group size='mini'>
    <Step active= {props.step===0 ? true : false}>
       <Icon name='payment' />
       <Step.Content>
         <Step.Title>입금완료</Step.Title>
         <Step.Description>입금이 완료되었습니다.</Step.Description>
       </Step.Content>
     </Step>
     <Step  active= {props.step===1 ? true : false}>
       <Icon name='truck' />
       <Step.Content>
         <Step.Title>배송중</Step.Title>
         <Step.Description>배송이 시작되었습니다.</Step.Description>
       </Step.Content>
      </Step>
      <Step  active= {props.step===2 ? true : false}>
       <Icon name="inbox"/>
       <Step.Content>
         <Step.Title>배송완료</Step.Title>
         <Step.Description>배송이 완료되었습니다. 구매확정을 해주세요</Step.Description>
       </Step.Content>
      </Step>
      <Step  active= {props.step===3 ? true : false}>
       <Icon name="handshake outline"/>
       <Step.Content>
         <Step.Title>구매확정</Step.Title>
         <Step.Description>저희 제품에 만족하셨나요? 후기를 작성해주세요</Step.Description>
       </Step.Content>
     </Step>
   </Step.Group>
 
  )
   
}


export default DeliveryStep