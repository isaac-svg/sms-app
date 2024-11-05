// https://smsc.hubtel.com/v1/messages/send?clientsecret=jjdyiwpe&clientid=shhboipm&from=shapeup&to=233591514584&content=This+Is+A+Test+Message
fetch(
  "https://devp-sms03726-api.hubtel.com/v1/messages/send?clientid=shhboipm&clientsecret=jjdyiwpe&from=shapeup&to=233591514584&content=This+Is+A+Test+Message",
  {
    //

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer nJlqEx24fA7k5RgyBaPtfwfDsw84",
      Host: "api.mtn.com",
    },
  }
)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });
