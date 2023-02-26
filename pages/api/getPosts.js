import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  const { token, wallet } = req.body;
  try {
    if (!Boolean(token) || !Boolean(wallet)) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      const client = await clientPromise;
      const db = client.db("posts");

      const posts = await db
        .collection("posts")
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();

      res.json(posts);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
