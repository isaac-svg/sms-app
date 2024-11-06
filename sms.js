var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw =
  '{\n    "key": ")746!fnmok(5r9!huv_ngbcf(q6519i9zr@g114vfoc0yt4_bdee8wg7dw5j8j0v",\n    "msisdn": "233244071872, 233XXXXXXXX",\n    "message": "Here are two, of many",\n    "sender_id": "SenderID"\n}';

const key = encodeURIComponent(
  ")746!fnmok(5r9!huv_ngbcf(q6519i9zr@g114vfoc0yt4_bdee8wg7dw5j8j0v"
);
const data = {
  // key: key,
  msisdn: "233591514584",
  message: "Here are two, of many",
  sender_id: "flipflop",
};
var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: JSON.stringify(data),
  redirect: "follow",
};

fetch(
  "https://sms.nalosolutions.com/smsbackend/clientapi/Resl_Nalo/send-message/?key=)746!fnmok(5r9!huv_ngbcf(q6519i9zr@g114vfoc0yt4_bdee8wg7dw5j8j0v&type=0&destination=233591514584&dlr=1&source=NALO&message=This+is+a+test+from+Mars",
  {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    // redirect: "follow",
  }
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
