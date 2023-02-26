import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  const { token, wallet } = req.body;
  const userWallet = req.query.userWallet;
  console.log(userWallet);
  try {
    if (!Boolean(token) || !Boolean(wallet)) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      const client = await clientPromise;
      const db = client.db("posts");
      if (userWallet) {
        const posts = await db
          .collection("posts")
          .find({ wallet: userWallet === "profile" ? wallet : userWallet })
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray();

        res.json(posts);
      } else {
        const posts = await db
          .collection("posts")
          .find({})
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray();

        res.json(posts);
      }
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
