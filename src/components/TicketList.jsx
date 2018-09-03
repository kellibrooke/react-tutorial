import React from 'react';
import Ticket from './Ticket';

var masterTicketList = [
  {
    names: 'Thato and Haley',
    location: '3A',
    issue: 'Firebase wont load data'
  },
  {
    names: 'John and Wilma',
    location: '3B',
    issue: 'We pooped our pants'
  },
  {
    names: 'Todd and Genevieve',
    location: '4C',
    issue: 'Why are all the computers disappearing?'
  }
];

function TicketList() {
  return (
    <div>
      <style jsx>{`
        div {
          background-color: lightblue;
        }`}</style>
      <hr/>
      {masterTicketList.map((ticket, index) =>
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index} />
      )}
    </div>
  );
}

export default TicketList;
