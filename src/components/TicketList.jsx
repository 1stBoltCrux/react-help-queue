import React from 'react';
import Ticket from './Ticket';


function TicketList(props){
  return (
    <div>
      <hr/>
      {props.ticketList.map((ticket, index) =>
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index}/>
      )}
    </div>
  );
}

export default TicketList;
