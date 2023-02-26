import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { token, wallet, postId, type } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("likes");
    if (
      !Boolean(token) ||
      !Boolean(wallet) ||
      !Boolean(postId) ||
      !Boolean(type)
    ) {
      res.status(400).json({ message: "Bad Request" });
    } else if (type === "like") {
      const existedLike = await db
        .collection("likes")
        .find({ postId, wallet })
        .toArray();
      if (existedLike.length > 0) {
        res.status(200).json({ result: "already liked" });
      } else {
        const like = await db.collection("likes").insertOne({ postId, wallet });
        res.status(200).json({ like });
      }
    } else {
      const unLiked = await db
        .collection("likes")
        .deleteOne({ postId, wallet });
      res.status(200).json({ unLiked });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
