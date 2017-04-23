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

// readFileData: function(callback) {
//  var reader = new FileReader();
//  var files = document.getElementById('file-input').files;
//  if(files == undefined || files.length === 0) {
//      return;
//  }
//  var file = files[0];    // Read in the image file as a data URL.
//  reader.onload = function(e) {    callback(reader.result);  }
//  reader.readAsBinaryString(file);
// }

// function
//  readFileData: function(callback) {
//   var reader = new FileReader();
//   var files = document.getElementById('file-input').files;
//   if(files == undefined || files.length === 0) {
//       return;
//   }
//   var file = files[0];
//
//   // Read in the image file as a data URL.
//   reader.onload = function(e) {
//     callback(reader.result);
//   }
//
//   reader.readAsBinaryString(file);
// }

function getHashOfFile () {
  var files = document.getElementById('content-upload').files;
  var file = files[0];
  if (files == undefined || files.length === 0) {
      return;
  }
  var reader = new FileReader();
  var cb = function ( d ) { return d;  }
  var finalHash = "";
  reader.onload = function(e) {  finalHash =  md5( cb(reader.result) );  }
  reader.readAsBinaryString(file);
}

function registerLicense() {
  var r = RegisterLicenses.deployed();

  //
  var contentHash = document.getElementById("content-hash").value;
  var originalContentOwner = document.getElementById("original-content-owner").value;
  var licensedTo = document.getElementById("licensed-to").value;
  var domain = document.getElementById("domain").value ? document.getElementById("domain").value : "*";

  r.registerLicense( web3.fromAscii(contentHash), originalContentOwner, licensedTo, domain, { from : web3.eth.coinbase } ).then( function (v) {
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

  var contentHash = document.getElementById("content-hash").value;

  r.retrieveLicenses( web3.fromAscii(contentHash) ).then( function(v) {
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
