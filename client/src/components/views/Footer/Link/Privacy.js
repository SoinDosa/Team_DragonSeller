import Header2 from '../../Header/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Message, Header } from 'semantic-ui-react'

function Privacy(props) {
    const dispatch = useDispatch();
    return (
        <div>
            <div>
                <Header2 />
            </div>
            <div>
                <Header as='h2' image='https://image.flaticon.com/icons/png/512/4104/4104794.png' content='개인정보처리방침' />

                <Message>
                    <Message.Header>1. 개인정보의 처리 목적</Message.Header>
                    <Message.List>
                        <p>Team Dragon Seller은(는) 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
                        </p><br></br>
                    </Message.List>
                    <Message.Header>2. 개인정보의 처리 및 보유 기간 작성</Message.Header>
                    <Message.List>
                        <p>1. Team Dragon Seller은(는) 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                        <p>2. 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
                        </p>
                        <Message.Item>고객 가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지, 다만 채권·채무관계 잔존시에는 해당 채권·채무관계 정산시까지</Message.Item>
                        <Message.Item>전자상거래에서의 계약·청약철회, 대금결제, 재화 등 공급기록 : 5년</Message.Item>
                        <br></br>

                    </Message.List>
                    <Message.Header>3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</Message.Header>
                    <Message.List>
                        <p>정보주체는 Team Dragon Seller에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
                        <Message.Item>1. 개인정보 열람요구</Message.Item>
                        <Message.Item>2. 오류 등이 있을 경우 정정 요구</Message.Item>
                        <Message.Item>3. 삭제요구</Message.Item>
                        <Message.Item>4. 처리정지 요구</Message.Item>
                        <br></br>
                    </Message.List>
                    <Message.Header>
                        4. 처리하는 개인정보 항목
</Message.Header>
                    <Message.List>
                        <p>1. 개인정보 처리업무: 홈페이지 회원가입 및 관리, 민원사무 처리, 재화 또는 서비스 제공, 마케팅 및 광고에의 활용</p>
                        <p>2. 필수항목: 로그인ID, 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록</p>
                        <p>3. 선택항목: 이메일, 성별, 이름</p>

                        <br></br>
                    </Message.List>
                    <Message.Header>5. 개인정보의 파기


</Message.Header>
                    <Message.List>
                        <p>파기절차</p>
                        <Message.Item>이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.</Message.Item>
                        <p>파기기한</p>
                        <Message.Item>이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.</Message.Item>
                        <br></br>
                    </Message.List>
                    <Message.Header>
                        6. 개인정보 자동 수집 장치의 설치·운영 및 그 거부에 관한 사항
</Message.Header>
                    <Message.List>
                        <p>1.Team Dragon Seller은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.</p>

                        <p> 2.쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 컴퓨터 내의 하드디스크에 저장되기도 합니다.</p>
                        <Message.Item>가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</Message.Item>
                        <Message.Item>나. 쿠키의 설치·운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.</Message.Item>
                        <Message.Item>다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</Message.Item>
                        <br></br>
                    </Message.List>
                    <Message.Header>7. 개인정보 보호책임자
</Message.Header>
                    <Message.List>
                        <p>이름: 김선휘</p>
                        <p>소속: 서울과학기술대학교</p>
                        <p>전화: 010-5729-4889</p>
                        <p>이메일: rlatjsgnl519@gmail.com</p>
                        <br></br>
                    </Message.List>
                    <Message.Header>8. 개인정보의 안전성 확보 조치</Message.Header>
                    <Message.List>
                        <p>개인정보의 암호화</p>
                        <Message.Item>이용자의 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</Message.Item>
                        <br></br>
                    </Message.List>
                    <Message.Header>9. 개인정보처리방침의 변경</Message.Header>
                    <Message.List>
                        <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
                        <Message.Item>공고일자 : 2020년 5월 30일</Message.Item>
                        <Message.Item>시행일자 : 2020년 5월 30일</Message.Item>

                        <br></br>
                    </Message.List>

                </Message>

            </div>
        </div>
    )
}

export default withRouter(Privacy)