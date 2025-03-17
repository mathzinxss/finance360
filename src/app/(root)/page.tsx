import Header from "@/components/Header";
import RightSideBar from "@/components/RightSideBar";
import TotalBalance from "@/components/TotalBalance";
import React from "react";

export const loggedIn = { firstName: "Mathias", lastName: "Fernando", email: "math945374081@gmail.com" };

const Home = () => {

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <Header
            type="greeting"
            title="Bem-vindo"
            user={loggedIn?.firstName || "Convidado"}
            subtext="Acesse e gerencie sua conta e transações com eficiência"
          />
          <TotalBalance 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        Transações recentes
      </div>
      <RightSideBar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, { currentBalance: 550.70 }]}/>
    </section>
  );
};

export default Home;
