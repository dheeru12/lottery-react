import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
class App extends React.Component{
  state={
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  };
  async componentDidMount(){
    const manager=await lottery.methods.manager().call();
    const players=await lottery.methods.getplayers().call();
    const balance =await web3.eth.getBalance(lottery.options.address);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({manager,players,balance});
  }
  onSubmit = async (event)=>{
    event.preventDefault();//to stop from automatic submit

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({message:'waiting on transaction message'});
    await lottery.methods.entry().send({
      from:accounts[0],
      value: web3.utils.toWei(this.state.value,'ether')
    });

    this.setState({message:'you have been entered'});
  }

  onClick = async (event)=>{
    event.preventDefault();
    const accounts=await web3.eth.getAccounts();
    this.setState({message:'waiting on transaction success'});

    await lottery.methods.pickwinner().send({
      from:accounts[0]
    });

    this.setState({message:'picked a winner'});
  };
  render(){
    return(
      <div>
        <h1>lottery Project</h1>
        <p>This lottery is manged by{this.state.manager}.
        There are currently {this.state.players.length} people competing
        to win {web3.utils.fromWei(this.state.balance,'ether')}
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>
            Want to try your luck?
          </h4>
          <div>
            <label>enter the amount of ether</label>
            <input onChange={event => this.setState({value:event.target.value})} value={this.state.value}/>
            <button>Enter</button>
          </div>
        </form>
        <hr />
    <h4>{this.state.message}</h4>
    <hr />
      <h4>Ready to  pick a winner</h4>
      <button onClick={this.onClick}>Pick a Winner!!</button>
    <hr />
      </div> 
    );
  }
}


export default App;
