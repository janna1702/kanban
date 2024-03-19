import { type NextRequest, NextResponse } from "next/server";
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
export async function POST(request: NextRequest) {
  const body: { login: string; password: string } = await request.json(); //{login: string, password: string}
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("сluster0").command({ ping: 1 });
  const db = client.db("сluster0");
  const collection = db.collection("users");
  const user = await collection.findOne({
    login: body.login,
    password: body.password,
  });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  console.log(user);

  if (user) {
    return NextResponse.json({ data: true });
  } else {
    return NextResponse.json({ data: false });
  }
}
