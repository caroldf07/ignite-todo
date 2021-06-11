import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": String(userid),
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      response,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
