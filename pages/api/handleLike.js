import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { token, wallet, postId, type } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("posts");
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
      } else {
        const like = await db.collection("likes").insertOne({ postId, wallet });
      }
    } else {
      const unLiked = await db
        .collection("likes")
        .deleteOne({ postId, wallet });
    }
    const posts = await db
      .collection("posts")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(postId),
          },
        },
        {
          $lookup: {
            from: "likes",
            let: { postId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [{ $toObjectId: "$postId" }, "$$postId"],
                  },
                },
              },
            ],
            as: "likes",
          },
        },
        {
          $addFields: {
            likesCount: { $size: "$likes" },
          },
        },
      ])
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(posts[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
