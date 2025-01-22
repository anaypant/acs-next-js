import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';



function dynamoDBClient() {

  // console.log(region);
  // console.log(accessKeyId);
  // console.log(secretAccessKey);
  //
  //
  // if (!region && !accessKeyId && !secretAccessKey) {
  //   console.error('Missing AWS environment variables');
  // }


  return new DynamoDBClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET as string,
    },
  });
}

const addItemToTable = async (data) => {
  const client = dynamoDBClient();
  const params = {
    TableName: "sampleEmailTable2", // Replace with your table name
    Item: {
      ClientID: { S: data.clientId },
      ThreadID: { S: data.threadId },
      EmailID: { S: data.emailId },
      Timestamp: { N: data.timestamp.toString() },
      From: { S: data.from },
      To: { S: data.to },
      Subject: { S: data.subject },
      Body: { S: data.body },
    },
  };

  try {
    const command = new PutItemCommand(params);
    const response = await client.send(command);
    console.log("Item added:", response);
  } catch (err) {
    console.error("Error adding item:", err);
  }
};



export default dynamoDBClient;
