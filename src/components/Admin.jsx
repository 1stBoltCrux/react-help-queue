import React from 'react';
import TicketList from './TicketList'
import TicketDetail from './TicketDetail'

export default function Admin(props){
  console.log(props.selectedTicket);
  let optionalSelectedTicketContent = null;
  if (props.selectedTicket != null){
    optionalSelectedTicketContent = <TicketDetail selectedTicket={props.ticketList[props.selectedTicket]}/>;
  }
  return (
    <div>
      <h2>Admin</h2>
      {optionalSelectedTicketContent}
      <TicketList
        ticketList={props.ticketList} currentRouterPath={props.currentRouterPath} onTicketSelection={props.onTicketSelection}/>
    </div>
  )
}
