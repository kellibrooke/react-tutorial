import React from 'react';
import PropTypes from 'prop-types';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';

function Admin(props) {
  let optionalSelectedTicketContent = null;

  if(props.selectedTicket != null) {
    optionalSelectedTicketContent = <TicketDetail  selectedTicket={props.ticketList[props.selectedTicket]}/>;
  }
  return (
    <div>
      {optionalSelectedTicketContent}
      <TicketList
        ticketList={props.ticketList}
        currentRouterPath={props.currentRouterPath}
        onTicketSelection={props.onTicketSelection} />
    </div>
  );
}

Admin.propTypes = {
  ticketList: PropTypes.array,
  currentRouterPath: PropTypes.string,
  onTicketSelection: PropTypes.func,
  selectedTicket: PropTypes.string
};

export default Admin;
