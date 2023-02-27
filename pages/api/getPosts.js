import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  const userWallet = req.query.userWallet;

  try {
    const client = await clientPromise;
    const db = client.db("posts");
    const posts = await db
      .collection("posts")
      .aggregate([
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
    if (Boolean(userWallet)) {
      res.status(200).json(posts.filter((post) => post.wallet === userWallet));
    } else {
      res.status(200).json(posts);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
