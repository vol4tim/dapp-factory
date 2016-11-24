import { startSubmit, stopSubmit, reset } from 'redux-form';
import _ from 'lodash';
import Promise from 'bluebird';
import { LOAD, SET_TEMPLATE, SET_RESULT } from './actionTypes'
import * as templs from '../../templates';
import * as abis from '../../abi';
import { api } from '../../parity';

export function loadTemplates(templates) {
  return {
    type: LOAD,
    payload: templates
  }
}

export function setTemplate(index) {
  return {
    type: SET_TEMPLATE,
    payload: index
  }
}

export function setResult(templateId, address, abi) {
  return {
    type: SET_RESULT,
    payload: {
      templateId,
      address,
      abi: JSON.stringify(abis[abi])
    }
  }
}

function send(instance, func, values = [], options = {}) {
  return instance[func].estimateGas(options, values)
    .then((gas) => {
      const optionsGas = { ...options, gas: gas.mul(1.2).toFixed(0) }
      return instance[func].postTransaction(optionsGas, values);
    });
}

export function submit(templateId, address, abi, form, account) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(startSubmit('Form'));
    const contract = api.newContract(abis[abi], address);

    let id = null;
    contract.instance.Builded.subscribe({}, (e, result) => {
      if (!_.isEmpty(result)) {
        dispatch(stopSubmit('Form'))
        dispatch(reset('Form'))
        contract.instance.Builded.unsubscribe(id)
        if (e) {
          console.log(e);
          return;
        }
        dispatch(setResult(
          templateId,
          result[0].params.instance.value,
          state.templates.list[templateId].contractAbi
        ))
      }
    })
      .then((subscribeId) => {
        id = subscribeId;
      })

    contract.instance.buildingCostWei.call()
      .then((cost) => {
        send(contract.instance, 'create', _.values(form), { from: account, value: cost })
      })

    // send(contract.instance, 'create', _.values(form), { from: account, value: 1123 })
      // .then((requestId) => {
      //   return api.pollMethod('parity_checkRequest', requestId)
      //     .catch((e) => {
      //       console.log(e);
      //       dispatch(stopSubmit('Form'))
      //     });
      // })
      // .then((txhash) => {
      //   console.log('tx', txhash);
      //   dispatch(stopSubmit('Form'))
      //   dispatch(reset('Form'))
      // })
      // .catch((e) => {
      //   console.log(e);
      //   dispatch(stopSubmit('Form'))
      // })
  }
}

export function load() {
  const templates = _.values(templs)
  const promisesCost = _.map(templates, (template) => {
    const contract = api.newContract(abis[template.abi], template.address);
    return contract.instance.buildingCostWei
      .call()
  })
  return (dispatch) => {
    Promise.all(promisesCost)
      .then((costs) => {
        const templatesCost = _.map(costs, (cost, index) => {
          return {
            ...templates[index],
            cost: _.toNumber(api.util.fromWei(cost))
          }
        })
        dispatch(loadTemplates(templatesCost))
      })
  }
  // console.log(Promise);
  // return (dispatch) => {
  //   dispatch(loadTemplates(templates))
  // }
}
