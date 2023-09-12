import APIAuth from "@/lib/apiAuth";

export default function handler(req, res) {
  res.status(200).json(APIAuth.prefix('vaq').generate());
}
