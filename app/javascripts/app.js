var accounts;
var account;
var hash = "";

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

function setStatus(message) {
  $("#status").html( message );
};

function getHashOfFile () {
  var files = $("#content-upload").prop("files");
  var file = files[0];
  if (files == undefined || files.length === 0) {
      return false;
  }
  var reader = new FileReader();
  var cb = function ( d ) { return d;  }

  reader.onload = function(e) {
    hash =  md5( cb(reader.result) );
    $("#content-upload-hash").text( hash );
    $("#hashit").remove();
  }
  reader.readAsBinaryString(file);

}

function registerLicense() {
  var r = RegisterLicenses.deployed();

  //
  var contentHash = $("#content-hash").val().replace(new RegExp(" ", "g"), "");
  var originalContentOwner = $("#original-content-owner").val().replace(new RegExp(" ", "g"), "");
  var licensedTo = $("#licensed-to").val().replace(new RegExp(" ", "g"), "");
  var domain = $("#domain").val() ? $("#domain").val() : "*";

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

  var contentHash = $("#content-hash-search").val();

  r.retrieveLicenses( web3.fromAscii(contentHash) ).then( function(v) {
    console.log(v);
    $("#output").text(v.toString());
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
    smartctradd = RegisterLicenses.deployed().address;

    var h = document.location.href;

    if ( h.split("#")[1] == "creators" || typeof h.split("#")[1] == "undefined" ) {

      /* For creators */
      $("#panel-2").hide();
      console.log( "Your main account is: " + account + " and you have " + web3.eth.getBalance( account ).toString() );
      $("#main-address").text( account );
      console.log( "The smart contract address is: " + smartctradd );
      $("#contract-address").text( smartctradd );

    } else if ( h.split("#")[1] == "consumers" ) {

      /* For consumers */
      $("#panel-1").hide();
      $("#contract-address-2").text( account );
      console.log( "The smart contract address is: " + smartctradd + " (consumers)" );
      // 8cc5084d2e7004de036e84dd3e7601c5

    }

    // refreshBalance();
  });
}
