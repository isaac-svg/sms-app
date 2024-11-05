// encodedParams.set("client_id", "");
// encodedParams.set("client_secret", "");
const qs = require("querystring");
const http = require("https");

const options = {
  method: "POST",
  hostname: "api.mtn.com",
  port: null,
  path: "/v1/oauth/access_token/accesstoken?grant_type=client_credentials",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(
  qs.stringify({
    client_id: "tQZd2xjT0IiEOIn5kZuikpFFGW98LfVG",
    client_secret: "aDk1u4VsHRk3eLnp",
  })
);
req.end();
