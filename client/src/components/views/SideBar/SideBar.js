import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

const DropdownExamplePointingTwo = () => (
  <Menu vertical>
    <Dropdown additionPosition='bottom' text='CPU' pointing='left' className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>메인보드1</Dropdown.Item>
        <Dropdown.Item>메인보드2</Dropdown.Item>
        <Dropdown.Item>메인보드3</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Spam (1009)</Dropdown.Item>
        <Dropdown.Item>Trash</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown additionPosition='bottom' text='메인보드' pointing='left' className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>메인보드1</Dropdown.Item>
        <Dropdown.Item>메인보드2</Dropdown.Item>
        <Dropdown.Item>메인보드3</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Spam (1009)</Dropdown.Item>
        <Dropdown.Item>Trash</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown additionPosition='bottom' text='RAM' pointing='left' className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>메인보드1</Dropdown.Item>
        <Dropdown.Item>메인보드2</Dropdown.Item>
        <Dropdown.Item>메인보드3</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Spam (1009)</Dropdown.Item>
        <Dropdown.Item>Trash</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown additionPosition='bottom' text='그래픽카드' pointing='left' className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>메인보드1</Dropdown.Item>
        <Dropdown.Item>메인보드2</Dropdown.Item>
        <Dropdown.Item>메인보드3</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Spam (1009)</Dropdown.Item>
        <Dropdown.Item>Trash</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown additionPosition='bottom' text='저장장치' pointing='left' className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>메인보드1</Dropdown.Item>
        <Dropdown.Item>메인보드2</Dropdown.Item>
        <Dropdown.Item>메인보드3</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Spam (1009)</Dropdown.Item>
        <Dropdown.Item>Trash</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown additionPosition='bottom' text='쿨러' pointing='left' className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>수냉</Dropdown.Item>
        <Dropdown.Item></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
)

export default DropdownExamplePointingTwo
