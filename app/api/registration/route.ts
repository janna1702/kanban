import { type NextRequest, NextResponse } from "next/server";
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

export async function POST(request: NextRequest) {
  const body: { login: string; password: string } = await request.json();
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const newBody = {
      login: body.login,
      password: body.password,
    };
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("сluster0").command({ ping: 1 });
    const db = client.db("сluster0");
    const collection = db.collection("users");
    await collection.insertOne(newBody);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return NextResponse.json({ data: true });
}

// Тест: логин по этому пользователю
