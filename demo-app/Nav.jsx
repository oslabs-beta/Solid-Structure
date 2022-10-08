export const Nav = (props) => {

  return (
    <div id="navb">
      <div id="navb-btns">
        <div 
          class="tb" 
          classList={{active: props.tab() === "Apple"}} 
          onClick={() => props.setTab('Apple')}
        >Apple</div>
        <div 
          class="tb" 
          classList={{active: props.tab() === "Orange"}} 
          onClick={() => props.setTab('Orange')}
        >Orange</div>
        <div 
          class="tb" 
          classList={{active: props.tab() === "Banana"}} 
          onClick={() => props.setTab('Banana')}
        >Banana</div>
      </div>
    </div>
  )
};