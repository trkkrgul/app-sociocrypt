import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyMessage } from "ethers/lib/utils.js";

export default async (req, res) => {
  try {
    const client = await clientPromise;

    const db = client.db("posts");
    const { _id, token, wallet } = req.body;

    if (!Boolean(_id) || !Boolean(token) || !Boolean(wallet)) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      const signaturedWallet = verifyMessage(
        "Login sociocrypt.com with your address",
        token
      );

      if (signaturedWallet !== wallet) {
        res.status(403).json({ message: "Not authorized" });
      }
      const id = new ObjectId(_id);
      console.log(id);

      await db
        .collection("posts")
        .deleteOne({ _id: id })
        .then((result) => {
          console.log(result);
          res.json(result);
        });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
