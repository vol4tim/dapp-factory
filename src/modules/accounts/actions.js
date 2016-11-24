import { LOAD, SET_ACCOUNT } from './actionTypes'
import { api } from '../../parity';

export function loadAccounts(accounts) {
  return {
    type: LOAD,
    payload: accounts
  }
}

export function setAccount(index) {
  return {
    type: SET_ACCOUNT,
    payload: index
  }
}

export function load() {
  // console.log(api);
  // return (dispatch) => {
  //   dispatch(loadAccounts([
  //     {
  //       address: '0xc9b6815B47A14b20599Ea814C2Fb10260D1AbDB9',
  //       name: '0xc9b6815B47A14b20599Ea814C2Fb10260D1AbDB9',
  //       balance: 0,
  //     }
  //   ]))
  // }

  // api.eth.getBalance('0xc9b6815B47A14b20599Ea814C2Fb10260D1AbDB9')
  //   .then((e, r) => {
  //     console.log('e', e);
  //     console.log('r', r);
  //   })

  return (dispatch) => {
    api.parity
      .accounts()
      .then((accounts) => {
        const accountsList = Object
          .keys(accounts)
          .filter(address => accounts[address].uuid)
          .map(address => ({
            address,
            name: (accounts[address].name !== '') ? accounts[address].name : address,
            balance: 0
          }));
        dispatch(loadAccounts(accountsList))
      })
  }
}
