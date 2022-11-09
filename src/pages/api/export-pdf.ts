export default function handler(req: any, res: any) {
  console.log("^^^^^ REQ IS >>>>", req.method, req);
  res.end("some response");
}
