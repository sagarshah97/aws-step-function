const crypto = require("crypto");
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const value = event.value;
    const endpoint = event.course_uri;

    const hashedValue = crypto
      .createHash("sha256")
      .update(value, "utf8")
      .digest("hex");

    const body = {
      banner: "B00930009",
      result: hashedValue.toString(),
      arn: context.invokedFunctionArn,
      action: "sha256",
      value: value.toString(),
    };

    const response = await axios.post(endpoint, body);
    console.log(response.data);
  } catch (error) {
    console.log({
      statusCode: 500,
      body: error.message,
    });
  }
};
