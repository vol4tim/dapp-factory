import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './config/store'
import App from './app'

const store = configureStore()

render((
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./app.js', () => {
    const NextRootContainer = require('./app.js').default; // eslint-disable-line global-require
    render((
      <Provider store={store}>
        <AppContainer>
          <NextRootContainer />
        </AppContainer>
      </Provider>
    ), document.getElementById('root'));
  })
}
