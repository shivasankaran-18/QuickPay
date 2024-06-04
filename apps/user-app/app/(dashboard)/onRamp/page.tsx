import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard, getBalance } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/History";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";




async function getOnRampTransactions() { const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id)
      }
    });
    const arr= txns.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
    }));
    return arr.reverse();
  }


  export default async function () {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    return (
        <div className="w-screen">
          <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
              <AddMoney />
            </div>
            <div>
              <BalanceCard  />
              <div className="pt-4">
                <OnRampTransactions transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
    );
  }