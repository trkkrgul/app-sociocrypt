import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet || wallet !== connectedWallet) {
      res.status(403).json({ message: "Not authorized" });
    }

    const client = await clientPromise;
    const db = client.db("posts");
    const { id } = req.query;

    const post = await db.collection("posts").findOne({
      _id: ObjectId(id),
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
