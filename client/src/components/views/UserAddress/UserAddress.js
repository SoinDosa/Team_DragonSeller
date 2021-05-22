import React,{useState} from 'react'
import {DaumPostcode, daum} from 'react-daum-postcode';
import {Input,Form,Button} from 'semantic-ui-react'
import AddressModal from './AddressModal'

function UserAddress(props) {
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let roadAddr = data.roadAddress
        let extraAddress = ''; 
        let extraRoadAddr = '';
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          if(extraRoadAddr !== ''){
              extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        document.getElementById('postcode').value = data.zonecode;
        document.getElementById("roadAddress").value = roadAddr;
        document.getElementById("jibunAddress").value = data.jibunAddress;
        if(roadAddr !== ''){
            document.getElementById("extraAddress").value = extraRoadAddr;
        } else {
            document.getElementById("extraAddress").value = '';
        }
        console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        var guideTextBox = document.getElementById("guide")
        if(data.autoRoadAddress) {
            var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
            guideTextBox.style.display = 'block';

        } else if(data.autoJibunAddress) {
            var expJibunAddr = data.autoJibunAddress;
            guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
            guideTextBox.style.display = 'block';
        } else {
            guideTextBox.innerHTML = '';
            guideTextBox.style.display = 'none';
        }
    }

    return (
        <React.Fragment>
            <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
            <Form>
                    <Form.Input label='우편번호' id="postcode" placeholder='우편번호' type="text"
                                style={{width:'15%'}}
                    />
                    <Form.Button label="" onClick={openModal}>우편번호찾기</Form.Button>
                <Form.Group widths={2}>
                    <Form.Input label='도로명주소' id="roadAddress" placeholder='도로명주소' />
                    <Form.Input label='지번주소' id="jibunAddress" placeholder='지번주소' />
                    <Form.Input label="상세주소" id="detailAddress" placeholder="상세주소"/>
                </Form.Group>
                <AddressModal open={ modalOpen } close={ closeModal } header="Modal heading">
                <DaumPostcode onClick={handleComplete}/>
                </AddressModal>
            </Form>
            {/* <Input type="text" id="sample4_postcode" placeholder="우편번호"/>
             <Input type="button" onClick={openModal} value="우편번호 찾기"/><br/>
             <Input type="text" id="sample4_roadAddress" placeholder="도로명주소"/>
             <Input type="text" id="sample4_jibunAddress" placeholder="지번주소"/><br/>
             <span id="guide" style={{color:'#999', display:'none'}}></span>
             <Input type="text" id="sample4_detailAddress" placeholder="상세주소"/>
            <Input type="text" id="sample4_extraAddress" placeholder="참고항목"/> */}
        </React.Fragment>
    )
    
    // const onClickHandler = (e, value) => {
        
    // }
    // return (
    //     <div>
    //         <Input type="text" id="sample4_postcode" placeholder="우편번호"/>
    //         <Input type="button" onClick={onClickHandler} value="우편번호 찾기"/><br/>
    //         <Input type="text" id="sample4_roadAddress" placeholder="도로명주소"/>
    //         <Input type="text" id="sample4_jibunAddress" placeholder="지번주소"/>
    //         <span id="guide" style={{color:'#999', display:'none'}}></span>
    //         <Input type="text" id="sample4_detailAddress" placeholder="상세주소"/>
    //         <Input type="text" id="sample4_extraAddress" placeholder="참고항목"/>
    //     </div>
    // )
}

export default UserAddress
