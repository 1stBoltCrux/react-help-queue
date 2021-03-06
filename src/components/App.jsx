import React from 'react';
import Moment from 'moment';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import Admin from './Admin'
import { v4 } from 'uuid';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };

    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
}

handleChangingSelectedTicket(ticketId){
  console.log(ticketId);
  this.setState({selectedTicket: ticketId});
}
componentDidMount() {
  console.log('componentDidMount');
    this.waitTimeUpdateTimer = setInterval(()=>
    this.updateTicketElapsedWaitTime(), 60000
  );
}

componentWillUnmount(){
  console.log('componentWillUnmount');
  clearInterval(this.waitTimeUpdateTimer);
}


componentWillMount(){
  console.log('componentWillMount');
  clearInterval(this.waitTimeUpdateTimer);
}
updateTicketElapsedWaitTime() {
  var newMasterTicketList = Object.assign({}, this.state.masterTicketList);
  Object.keys(newMasterTicketList).forEach(ticketId => {
    newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
  });
  this.setState({masterTicketList: newMasterTicketList});
}

    handleAddingNewTicketToList(newTicket){
      const newTicketId = v4()
      const newMasterTicketList = Object.assign({}, this.state.masterTicketList, {[newTicket.id]: newTicket
      });
      newMasterTicketList[newTicket.id].formattedWaitTime = (newTicket.timeOpen).fromNow(true);
      newMasterTicketList[newTicket.id].timeOpen.fromNow(true);
      this.setState({masterTicketList: newMasterTicketList});
    };

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/admin' render={(props)=> <Admin ticketList={this.state.masterTicketList} currentRouterPath={props.location.pathname} onTicketSelection={this.handleChangingSelectedTicket}
          selectedTicket={this.state.selectedTicket}/>}/>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList}/>}  />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}
