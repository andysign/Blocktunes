var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

// function refreshBalance() {
//   var meta = MetaCoin.deployed();
//
//   meta.getBalance.call(account, {from: account}).then(function(value) {
//     var balance_element = document.getElementById("balance");
//     balance_element.innerHTML = value.valueOf();
//   }).catch(function(e) {
//     console.log(e);
//     setStatus("Error getting balance; see log.");
//   });
// };

// function sendCoin() {
//   var meta = MetaCoin.deployed();
//
//   var amount = parseInt(document.getElementById("amount").value);
//   var receiver = document.getElementById("receiver").value;
//
//   setStatus("Initiating transaction... (please wait)");
//
//   meta.sendCoin(receiver, amount, {from: account}).then(function() {
//     setStatus("Transaction complete!");
//     refreshBalance();
//   }).catch(function(e) {
//     console.log(e);
//     setStatus("Error sending coin; see log.");
//   });
// };

function registerLicense() {
  var r = RegisterLicenses.deployed();

  // address _licensedTo, string _domain
  var contentHash = document.getElementById("content-hash").value;
  var originalContentOwner = document.getElementById("original-content-owner").value;
  var licensedTo = document.getElementById("licensed-to").value;
  var domain = document.getElementById("domain").value ? document.getElementById("domain").value : "*";

  r.registerLicense( contentHash, originalContentOwner, licensedTo, domain, { from : web3.eth.coinbase } ).then( function (v) {
      console.log(r);
      setStatus( "Transaction complete!" );
      //
  } ).catch( function(e) {
    console.log(e);
    setStatus( "Error submitting - see log for details. ");
  } );

}

function retrieveLicenses() {
  var r = RegisterLicenses.deployed();

  r.retrieveLicenses("123").then( function(v) {
    console.log(v);
  } ).catch( function (e) {
    console.log(e);
    setStatus( "Error submitting - see log for details. ");
  } );
}

// r.registerLicense( "123", 0x0123567, 0x9876, "goooogle.com", { from : web3.eth.coinbase } )

// r.retrieveLicenses( "123" )

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    console.log( "Your main account is: " + account + " and you have " + web3.eth.getBalance( account ).toString() );
    document.getElementById( "main-address" ).innerHTML = account;

    // refreshBalance();
  });
}
