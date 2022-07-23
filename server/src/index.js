import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// Express app is created
const app = express();

app.use(cors());
// Function used here so middleware can be used to the routes and have JSON be accepted as a form of data from the frontend
app.use(express.json());

const api_key = process.env.STREAM_IO_APIKEY;
const api_secret = process.env.STREAM_IO_SECRET;

// .getInstance used to make this an instance of the stream chat api
const serverClient = new StreamChat.getInstance(api_key, api_secret);

// Normally these two routes would go in a route folder but since only two, figured would be simpler too just have both here

// Because bcrypt returns a promise, this is set as async
app.post("/signup", async (req, res) => {
  try {
    // Retrieves the user information passed from frontend
    const { firstName, lastName, username, password } = req.body;

    // A unique user id is created for the user
    const userId = uuidv4();

    // User password sent from frontend is hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    // User token created from API, will be sent to frontend so can know who was authenticated
    const token = serverClient.createToken(userId);

    // Information is sent back to the frontend
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login");

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
