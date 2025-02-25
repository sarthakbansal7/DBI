import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import dbank from '../dbank.png';
import Web3 from 'web3';
import './App.css';

class App extends Component {

  async componentDidMount() {
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const netId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();

        if (accounts.length > 0) {
          const balance = await web3.eth.getBalance(accounts[0]);
          this.setState({
            account: accounts[0],
            balance: web3.utils.fromWei(balance, 'ether'),
            web3: web3,
          });
        } else {
          window.alert('Please login with MetaMask');
          return;
        }

        // Load contracts safely
        if (Token.networks[netId] && dBank.networks[netId]) {
          const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address);
          const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address);
          const dBankAddress = dBank.networks[netId].address;

          this.setState({ token, dbank, dBankAddress });
        } else {
          window.alert('Contracts not deployed on this network');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        window.alert('MetaMask connection failed');
      }
    } else {
      window.alert('MetaMask not detected. Please install MetaMask.');
    }
  }

  async deposit(amount) {
    if(this.state.dbank!=='undefined'){
      try{
        await this.state.dbank.methods.deposit().send({value: amount.toString(), from: this.state.account})
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }

  async withdraw(e) {
    e.preventDefault()
    if(this.state.dbank!=='undefined'){
      try{
        await this.state.dbank.methods.withdraw().send({from: this.state.account})
      } catch(e) {
        console.log('Error, withdraw: ', e)
      }
    }
  }

  async borrow(amount) {
    if(this.state.dbank!=='undefined'){
      try{
        await this.state.dbank.methods.borrow().send({value: amount.toString(), from: this.state.account})
      } catch (e) {
        console.log('Error, borrow: ', e)
      }
    }
  }

  async payOff(e) {
    e.preventDefault()
    if(this.state.dbank!=='undefined'){
      try{
        const collateralEther = await this.state.dbank.methods.collateralEther(this.state.account).call({from: this.state.account})
        const tokenBorrowed = collateralEther/2
        await this.state.token.methods.approve(this.state.dBankAddress, tokenBorrowed.toString()).send({from: this.state.account})
        await this.state.dbank.methods.payOff().send({from: this.state.account})
      } catch(e) {
        console.log('Error, pay off: ', e)
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dbank} className="App-logo" alt="logo" height="32"/>
            <b>d₿ank</b>
          </a>
        </nav>
        <div className="container-fluid mt-5 text-center fade-in">
          <h1 className='animated-text'>Welcome to d₿ank</h1>
          <h2>{this.state.account}</h2>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content p-4">
                <Tabs defaultActiveKey="deposit" id="uncontrolled-tab-example">
                  <Tab eventKey="deposit" title="Deposit">
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.depositAmount.value
                      amount = amount * 10**18 //convert to wei
                      this.deposit(amount)
                    }}>
                      <input
                        id='depositAmount'
                        step="0.01"
                        type='number'
                        ref={(input) => { this.depositAmount = input }}
                        className="form-control form-control-md"
                        placeholder='Amount...'
                        required />
                      <button type='submit' className='btn btn-primary mt-2'>DEPOSIT</button>
                    </form>
                  </Tab>
                  <Tab eventKey="withdraw" title="Withdraw">
                    <button type='submit' className='btn btn-primary mt-2' onClick={(e) => this.withdraw(e)}>WITHDRAW</button>
                  </Tab>
                  <Tab eventKey="borrow" title="Borrow">
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.borrowAmount.value
                      amount = amount * 10 **18 //convert to wei
                      this.borrow(amount)
                    }}>
                      <input
                        id='borrowAmount'
                        step="0.01"
                        type='number'
                        ref={(input) => { this.borrowAmount = input }}
                        className="form-control form-control-md"
                        placeholder='Amount...'
                        required />
                      <button type='submit' className='btn btn-primary mt-2'>BORROW</button>
                    </form>
                  </Tab>
                  <Tab eventKey="payOff" title="Payoff">
                    <button type='submit' className='btn btn-primary mt-2' onClick={(e) => this.payOff(e)}>PAYOFF</button>
                  </Tab>
                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;