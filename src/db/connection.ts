import fs from "fs";
import { Client, ClientConfig } from "pg";
import url from "url";
import dotenv from "dotenv";
import { profileEnd } from "console";
dotenv.config({ path: "../db/src/.env" });
const config: ClientConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: 27359,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUWVsgBA4YQiiXJrN0ZvLfdQ5I+w8wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTg0YTE3MTgtOTFmZS00OGJmLWI0ZTUtYWFhZGIxZWJh
Yzk4IFByb2plY3QgQ0EwHhcNMjMwNzMwMDQ1OTA5WhcNMzMwNzI3MDQ1OTA5WjA6
MTgwNgYDVQQDDC9lODRhMTcxOC05MWZlLTQ4YmYtYjRlNS1hYWFkYjFlYmFjOTgg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALG1tBtu
zoZgWgTKZ6YHFMPmd7ULgzXG5Ah3/LL1Y06lmlN1XPi/KxBPDxkTn48HqREsGxBn
FajUYJ8H1JSpgRXkcG82jbU2DkJ9oXpWvjH9h7u4pnBrnHK/9kageNL7pPc2/LNL
5O8FT/4kE9YZQMnvmqBg7oGXkqC8M52dLXf3H/MiMmg97Gr0i8RzzGWkWy7cgpjx
97NqJ5AOtpUlqgJRyF8DGB72xMTciY7YIpYTOu+mkHVmm7IV5krmxnz5pcUT7qRs
C8xnJl5HJx233Dc8x7BaYX46DX7oeQnnikvPRlDTWFfCzhlW2WU+lV0O1hkRL/9/
d1Z7eWTmEJ/Ii4IE7qw+6YyFJ1tMnoKA4ShjXD8tM9IMTkpA9Lfwoqi25JO6KBt8
afNIx5BQHl8ezEpLqiEi7s/ghygno5b5iT+xipOKyspZI9IQMlcPvMtb00yiKwnq
kH83QfX+kMq5HPk3W7ep5ndJX9wZp+ZyjkLhUSpiQ+lsXNsbe5z0dW4KpwIDAQAB
oz8wPTAdBgNVHQ4EFgQUZS8IaeXHHDomFJrD7jfvENjtt38wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHjSJ4TFNUdgBGJ5
ecWeX+TZjRbgAQ7KdzFuURcsD0L4J9TSlaFzENQFKbV4KIgdHcpc5ZTK5kkf7ghn
LzsjBjetHcQNqquKRDZFGmSLQXC/Sx1dscyx8/yWF6nhyoETx7/+V0iDFp7rYTt/
4WQYIDNeffQxaTV7y7qZyVQC2nMcIAO3Q7w19npETHknBu8wv5S4Yk0aMgVY07F/
H8BofkO1lJzgkeRwmkTQZWCV87KsQ7cvS/+WU6H7c+7nQipONuYxPXUtViBTwtyZ
fH88f1cfdtTVQ599es6G7/Si3C12nxIZetFVoj0GZtqRGigD/dle+Qdi5hLbXqN2
EqdlZpyFegh6sMKo7PGOZYY4fQrHDJ6zwt7D2vadiOkpcrVoSFZcCmZinCZPYYKg
e403kXbtSrLF1dYRsx8q55oTZkxwmfhz4FRh0oyywGvPu1lXi3Yx7+UwjhyENjyK
YhzomHUgQL3Lc3+Vm8GGjMwqm1fw14gZehvIm2XsDDUBfQJjuQ==
-----END CERTIFICATE-----`,
  },
};

const DBConnection = new Client(config);
DBConnection.connect((err) => {
  if (err) throw err;
  DBConnection.query("SELECT VERSION()", [], (err, result) => {
    if (err) throw err;

    console.log(result.rows[0].version);
    DBConnection.end((err) => {
      if (err) throw err;
    });
  });
});

export { DBConnection };
