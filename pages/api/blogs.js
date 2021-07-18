import { getPaginatedBlogs } from "lib/api";

export default async function getBlogs(req, res) {
  const offset = parseInt(req.query.offset || 0, 10);
  const category = req.query.category || "All";
  // console.log(`querystring : ${category}`);
  const data = await getPaginatedBlogs({ offset, category });
  res.status(200).json(data);
}
