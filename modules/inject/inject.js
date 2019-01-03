import React from 'react'
import ReactDOM from 'react-dom'
import PayButton from './../paybutton/src/PayButton.js'

// create a local .render() function accessible from the window object
window.PayButton = {}
window.PayButton.render = function(elementID, props) {
  // first, we clear anything that might be in the element
  ReactDOM.render(
    <div id={elementID}>Loading...</div>,
    document.getElementById(elementID),
    function() {
      // then, we render the actual PayButton
      ReactDOM.render(
        <PayButton {...props} elementID={elementID} />,
        document.getElementById(elementID),
      )
    },
  )
}

const bootstrapPayButtons = (_) => {
  // find all elements with class "payButton"
  var buttons = document.getElementsByClassName('payButton')
  console.log(
    'Gateway: Found',
    buttons.length,
    buttons.length === 1 ? 'PayButton' : 'PayButtons',
    'on this page.',
  )

  // for each of those elements, render the button
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons.item(i)

    // set a random ID for the button so we can keep track of it
    var buttonID = 'pay-' + Math.floor(Math.random() * 100000)
    button.id = buttonID
    button.setAttribute('id', buttonID)

    // send all attributes to the render function
    window.PayButton.render(buttonID, {
      buttonText: button.getAttribute('buttonText'),
      dialogTitle: button.getAttribute('dialogTitle'),
      amount: button.getAttribute('amount'),
      currency: button.getAttribute('currency'),
      merchantID: button.getAttribute('merchantID'),
      paymentID: button.getAttribute('paymentID'),
      callbackURL: button.getAttribute('callbackURL'),
      address: button.getAttribute('address'),
      gatewayServer: button.getAttribute('gatewayServer'),
      paymentCompleteAudio: button.getAttribute('paymentCompleteAudio'),
      paymentCompleteCallback: button.getAttribute('paymentCompleteCallback'),
      closeWhenComplete: button.getAttribute('closeWhenComplete'),
      elementID: buttonID,
      hideWalletButton: button.getAttribute('hidewalletbutton'),
    })
  }
}

// on page load, search for and render all payment buttons
window.addEventListener('load', bootstrapPayButtons)
