const bcrypt = require("bcryptjs");
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const value = event.value;
    const endpoint = event.course_uri;

    const saltRounds = 12;
    const hashedValue = await bcrypt.hash(value, saltRounds);
    const body = {
      banner: "B00930009",
      result: hashedValue.toString(),
      arn: context.invokedFunctionArn,
      action: "bcrypt",
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
