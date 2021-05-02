import 'semantic-ui-react'


const SideBar = () =>{
    return (
<div class="ui fluid category search">
  <div class="ui icon input">
    <input class="prompt" type="text" placeholder="Search animals..."/>
    <i class="search icon"></i>
  </div>
  <div class="results"></div>
</div>);
}

export default SideBar;