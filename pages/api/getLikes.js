import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { token, postId } = req.body;

  console.log("body", req.body);

  try {
    const client = await clientPromise;
    const db = client.db("likes");
    if (!Boolean(token) || !Boolean(postId)) {
      res.status(400).json({ message: "Bad Request" });
    } else {
    }
    const existedLike = await db.collection("likes").find({ postId }).toArray();
    res.status(200).json({ existedLike });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
