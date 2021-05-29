import Header from '../../Header/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Message } from 'semantic-ui-react'


function Policy(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <h1>   이용약관</h1>
                <Message>
                    <Message.Header>제1조(목적)</Message.Header>
                    <Message.List>
                        <p>본 회원약관은 Team DragonSeller(이하 '갑'라 한다)이 운영하는 인터넷관련 서비스(이하 '서비스'라 한다)를 이용함에 있어 관리자와 이용자(이하 '회원'라 한다)의 권리, 의무 및 책임사항을 규정함을 목적으로 한다.
                        </p><br></br>
                    </Message.List>
                    <Message.Header>제2조 (약관의 효력)
</Message.Header>
                    <Message.List>
                        <p>1.본 약관은 '갑'에 회원들에게 통지함으로써 효력을 발생합니다.</p>
                        <p>2.'갑'은 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.
                        </p><br></br>

                    </Message.List>
                    <Message.Header>제3조 (약관 이외의 준칙)
</Message.Header>
                    <Message.List>
                        <p>이 약관에 명시되지 않은 사항은 갑의 결정에 따릅니다.</p><br></br>
                    </Message.List>
                    <Message.Header>
                        제4조 (이용계약의 체결)


</Message.Header>
                    <Message.List>
                        <p>                        사이트에 접속 시 해당 약관에 동의함으로 간주합니다.</p><br></br>
                    </Message.List>
                    <Message.Header>제5조 (용어의 정의)

                  
</Message.Header>
                    <Message.List>
                        <p>  이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>

                        <p>  1.회원: '갑'과 서비스 이용에 관한 계약을 체결한 자</p>

                        <p>  2.아이디(ID): 회원 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 '갑'이 승인하는 문자와 숫자의 조합</p>

                        <p> 3.비밀번호: 회원이 통신상의 자신의 비밀을 보호하기 위해 선정한 문자와 숫자의 조합</p><br></br>
                    </Message.List>
                    <Message.Header>
                        제6조 (이용신청)


</Message.Header>
                    <Message.List>
                        <p>
                            1.회원 가입은 온라인으로 가입신청 양식에 기록하여 '갑'에 제출함으로써 이용신청을 할 수 있습니다.</p>

                        <p> 2.가입희망 회원은 반드시 자신의 신상으로 이용신청을 해야 합니다.</p><br></br>
                    </Message.List>
                    <Message.Header>

                        제7조 (회원가입의 승낙)

                
</Message.Header>
                    <Message.List>
                        <p>  '갑'의 회원 가입 신청 양식에 가입 희망 회원이 인터넷으로 제6조와 같이 신청하면 '갑'은 바로 가입을 승인하여 서비스를 이용할 수 있다.
                        </p><br></br>
                    </Message.List>
                    <Message.Header>
                        제8조(회원가입 신청거절 및 강제 탈퇴)

</Message.Header>
                    <Message.List>
                        <p>
                            1. '갑'은 타인의 명의를 도용하여 회원가입신청을 할 경우 회원가입신청을 거절할 수 있다.</p>
                        <p> 2. 회원가입신청이 승인이 된 후에도 허위사실의 기재가 발각되거나 '갑'의 명예를 회손시키거나 음란물이나 불건전한 내용을 게재할 경우 회원의 자격을 강제 탈퇴시킬 수 있다.</p>
                      <p>   3. '갑'이 원하는 경우 강제 탈퇴시킨다.</p>
                        <br></br>
                    </Message.List>
                    <Message.Header>
                        제9조 (서비스 제공의 중지)


</Message.Header>
                    <Message.List>
                        <p>
                            '갑'은 다음 각 호의 1에 해당하는 경우 서비스의 제공을 중지할 수 있습니다</p>

                        <p>  1. '갑'이 필요하다 판단한 경우</p>
                        <br></br>
                    </Message.List>
                    <Message.Header>
                        제10조 ('갑'의 의무)

 

</Message.Header>
                    <Message.List>
                        <p>                       1. '갑'은 서비스를 유지보수하며 이용자를 관리한다.</p>
                        <br></br>
                    </Message.List>
                    <Message.Header>
                        제11조 (개인정보보호)


</Message.Header>
                    <Message.List>
                        <p>
                            1. '갑'은 이용자의 정보수집시 서비스의 제공에 필요한 최소한의 정보를 수집합니다.</p>

                        <p>   2. 제공된 개인정보는 '갑'의 판단 하에 사용합니다.</p>
                        <br></br>
                    </Message.List>
                    <Message.Header>
                        제12조 (회원의 의무)
</Message.Header>
                    <Message.List>
                        <p>1.회원은 관계법령, 이 약관의 규정, 이용안내 및 주의사항 등 '갑'이 통지하는 사항을 준수하여야 하며, 기타 '갑'의 업무에 방해되는 행위를 하여서는 안됩니다.</p>
                    
                        <p>2.회원은 '갑'의 사전 승낙 없이 서비스를 이용하여 어떠한 영리 행위도 할 수 없습니다.</p>

                        <p>3.회원은 서비스를 이용하여 얻은 정보를 '갑'의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판,방송 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다.</p>

                        <p>4.회원은 이용신청서의 기재내용 중 변경된 내용이 있는 경우 서비스를 통하여 그 내용을 '갑'에게 통지하여야 합니다.</p>

                        <p>5.회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.</p>
                        
                   
                        <Message.Item>①다른 회원의 아이디(ID)를 부정 사용하는 행위</Message.Item>
                        <Message.Item>②범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위</Message.Item>
                        <Message.Item>③선량한 풍속, 기타 사회질서를 해하는 행위</Message.Item>
                        <Message.Item>④타인의 명예를 훼손하거나 모욕하는 행위</Message.Item>
                        <Message.Item>⑤타인의 지적재산권 등의 권리를 침해하는 행위</Message.Item>
                            <Message.Item>⑥해킹행위 또는 컴퓨터바이러스의 유포행위</Message.Item>
                        <Message.Item>⑦타인의 의사에 반하여 광고성 정보 등 일정한 내용을 지속적으로 전송 또는 타 사이트를 링크하는 행위</Message.Item>
                            <Message.Item>⑧서비스의 안전적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위</Message.Item>
                            <Message.Item>⑨기타 관계법령에 위배되는 행위</Message.Item>
                            <Message.Item> ⑩게시판 등 커뮤니티를 통한 상업적 광고홍보 또는 상거래 행위</Message.Item>
                            
                        <p>6.회원은 사이트에 접속한 기록이 있을 때마다 상품을 구매해야 합니다.</p>
                        <br></br>

                  </Message.List>

                    
                    <Message.Header>
                        제13조 (게시물 또는 내용물의 삭제)

                       

</Message.Header>
                    <Message.List>
                        <p> '갑'은 서비스의 게시물 또는 내용물이 제12조의 규정에 위반되거나 '갑' 소정의 게시기간을 초과하는 경우 사전 통지나 동의 없이 이를 삭제할 수 있습니다.
</p><br></br>
                    </Message.List>
                    <Message.Header>

                        제14조 (계약해지 및 이용제한)


</Message.Header>
                    <Message.List>
                        <p>
                            1.회원은 계약해지가 불가능합니다.</p>
<p>                        2.'갑'이 원하는 경우 회원의 서비스 이용이 제한됩니다.</p><br></br>

                    </Message.List>
                    <Message.Header>

                        제15조 (면책·배상)

</Message.Header>
                    <Message.List>
                        <p>1.회원의 실수에 대한 모든 책임은 회원에게 있으며 '갑'은 아무런 면책 및 배상을 지지 않습니다.</p><br></br><br></br>

                    </Message.List>
                    <Message.Header>


                        <p>부  칙</p>

                        제 1 조 (시행일) 이 약관은 2021년 05월 01일부터 시행한다.

</Message.Header>

                </Message>

            </div>
        </div>
    )
}

export default withRouter(Policy)