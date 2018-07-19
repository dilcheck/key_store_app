import './index.html'

var CoinStack = require("coinstack-sdk-js");

Template.index.onRendered(function(){
  if( window.localStorage.getItem("key") == null ) {
    FingerprintKey.initKey({
      keyId: "blocko",
      locale: {
        desc: "PKI쌍을 생성합니다.",
        cancel: "취소",
        title: "지문 등록",
        hint: "지문을 스캔해주세요",
        success: "인식에 성공했습니다",
        notrecognized: "인식에 실패했습니다",
        toomanytries: "연속으로 지문 인증을 실패하였습니다. 잠시 후 다시 이용해 주시기 바랍니다"
      }
    }, function (res) {
      let address = CoinStack.ECKey.deriveAddress(res.key);
      window.localStorage.setItem("key", address);
      generateQR(address)
    }, function (err) {
      console.log(err)
    });
  } else {
    generateQR(window.localStorage.getItem("key"))
  }
})

Template.index.events({
   'click #loadKey'(e) {
    FingerprintKey.fetchKey({
      keyId: "blocko",
      locale: {
        desc: "개인키를 불러옵니다.",
        cancel: "취소",
        title: "지문 인증",
        hint: "지문을 스캔해주세요",
        success: "인식에 성공했습니다",
        notrecognized: "인식에 실패했습니다",
        toomanytries: "연속으로 지문 인증을 실패하였습니다. 잠시 후 다시 이용해 주시기 바랍니다"
      }
    }, function (res) {
        if(res.key!=undefined) {
            alert(res.key)
        }
    }, function (err) {
      console.log(err)
    });
  },
  'click #hash'(e) {
    QRScanner.prepare(done);
  }
});

const generateQR = function(address) {
  $('#qrcode').qrcode({
    size: 200,
    text: address
  });
}

const done = function(err, status){
  if(err){
    console.error(err._message);
  } else {
    QRScanner.scan(scanQR);
  }
};

const scanQR = function(err, contents){
  if(err){
    console.error(err._message);
  }
  alert('The QR Code contains: ' + contents);
};
 

