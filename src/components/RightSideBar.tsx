import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BankCard from './BankCard';
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category';

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {

  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className='no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll'>
      <section className='flex flex-col pb-36'>
        <div
          className='h-[120px] w-full bg-[url("/icons/gradient-mesh.svg")] bg-cover bg-no-repeat'
        >
          <div className='relative flex px-6 max-xl:justify-center'>
            <div className='flex rounded-full items-center justify-center absolute top-22 size-24 bg-gray-100 border-8 border-white p-2 shadow-profile'>
                <span className='text-5xl font-bold text-blue-500'>{user.firstName[0]}</span>
            </div>
            <div className='flex flex-col mt-48'>
                <h1 className='text-[24px] font-semibold text-gray-900'>{user.firstName} {user.lastName}</h1>
                <p className='text-16 font-normal text-gray-600'>{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='flex flex-col justify-between gap-8 px-6 py-8'>
        <div className='flex w-full justify-between'>
            <h2 className='text-[18px] font-semibold text-gray-900'>Meus Bancos</h2>
            <Link href='/' className='flex gap-2 items-center'>
                <Image src='/icons/plus.svg' width={20} height={20} alt='' />
                <h2 className='text-[14px] font-semibold text-gray-500'>Adicionar banco</h2>
            </Link>
        </div>
        {banks?.length >  0 && (
            <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                <div className='relative z-10'>
                    <BankCard key={banks[0].$id} account={banks[0]} userName={`${user.firstName} ${user.lastName}`} showBalance={false}/>
                </div>
                {banks[1] && (
                  <div className='absolute right-0 top-8 z-0 w-[90%]'>
                    <BankCard key={banks[1].$id} account={banks[1]} userName={`${user.firstName} ${user.lastName}`} showBalance={false} />
                  </div>
                )}
            </div>
        )}
        <div className='mt-10 flex flex-1 flex-col gap-6'>
          <h2 className='text-[18px] font-semibold text-gray-900'>Top categorias</h2>
          <div>
            {categories.map((category) => (
              <Category key={category.name} category={category}/>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSideBar;