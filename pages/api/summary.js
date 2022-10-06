import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    //check authentication
    const users = readUsersDB();
    //compute DB summary
    let userAccount = 0;
    let adminAccount = 0;
    let totalMoney = 0;
    users.forEach((x) => {
      if (x.isAdmin) adminAccount++;
      else {
        userAccount++;
        totalMoney += x.money;
      }
    });
    //return response
    return res.status(200).json({
      ok: true,
      userCount: userAccount,
      adminCount: adminAccount,
      totalMoney: totalMoney,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
