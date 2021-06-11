import { document } from "../utils/dynamodbClient";
import { v4 } from "uuid";

interface ICreateTodo {
  id?: string;
  title: string;
  deadline: Date;
}

export const handle = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
  await document
    .put({
      TableName: "todos",
      Item: {
        id: v4(),
        title,
        done: false,
        deadline: new Date(deadline),
        user_id: userid,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo criado com sucesso",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
