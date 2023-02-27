import clientPromise from "@/lib/mongodb";
import { verifyMessage } from "ethers/lib/utils.js";
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("posts");
      const {
        token,
        wallet,
        images,
        description,
        contract,
        dislikes,
        categories,
        views,
        tags,
      } = req.body;

      const signaturedWallet = verifyMessage(
        "Login sociocrypt.com with your address",
        token
      );

      if (signaturedWallet !== wallet || !token) {
        res.status(403).json({ message: "Not authorized" });
      }
      const post = await db.collection("posts").insertOne({
        wallet,
        images,
        description,
        contract,
        likes: [],
        dislikes,
        categories,
        views,
        tags,
        createdAt: new Date(),
      });
      const updatedPost = await db.collection("posts").findOne({
        _id: post.insertedId,
      });
      res.status(200).json(updatedPost);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
