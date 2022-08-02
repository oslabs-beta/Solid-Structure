export const Nav = (props) => {

  return (
    <div id="navb">
      <div id="navb-btns">
        <div 
          class="tb" 
          classList={{active: props.tab() === "inspector"}} 
          onClick={() => props.setTab('inspector')}
        >Inspector</div>
        <div 
          class="tb" 
          classList={{active: props.tab() === "graph"}} 
          onClick={() => props.setTab('graph')}
        >Graph</div>
        <div 
          class="tb" 
          classList={{active: props.tab() === "logmonitor"}} 
          onClick={() => props.setTab('logmonitor')}
        >Log Monitor</div>
      </div>
    </div>
  )
};