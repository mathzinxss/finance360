import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "@/components/DoughnutChart";

interface TotalBalanceBoxProps {
  accounts?: any[];
  totalBanks: number;
  totalCurrentBalance: number;
}

const TotalBalance = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <section className="flex flex-col sm:flex-row w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
      <div className="w-full sm:w-1/3 max-w-[200px] flex items-center p-4">
        {/* Doughnut Chart */}
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-[18px] font-semibold text-gray-900">
            Contas bancárias: {totalBanks}
          </h2>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm font-medium text-gray-600">Saldo Atual Total</p>
          <p className="text-[25px] lg:text-[30px] font-semibold text-gray-900 flex items-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default TotalBalance;
