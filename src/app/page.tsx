'use client'
import { useEffect, useState } from 'react';
import Cards from  './Components/Cards/cards';
import Navbar from './Components/Navbar/navbar';
import Styles from './page.module.css';

export type cardType = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export default function Home() {
    const [data, setData] = useState<Record<any, any>>({});
    const[selectedTab, setSelectedTab] = useState("gainer");

    useEffect(() => {
      fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo',{
      headers:{
        'content-type': 'application/json'
      }
      })
      .then((res) => {
        return res.json();
      })
      .then((res) =>{
        setData(res);
      })
    }, []);
    
    const handleTabSelection = (tab: string) =>{
      setSelectedTab(tab);
    }

  return (
    <>
    <main className='bg-[#e7e7e7]'>
    <Navbar/>

    <div className="w-[80vw] justify-center align-center ">
      
      <div className="font-medium text-center">
          <ul className="flex flex-wrap -mb-px">
              <li className="mr-2 cursor-pointer" onClick={()=> handleTabSelection('gainer')}>
                  <span className={`${selectedTab=='gainer' ? Styles.tabActive : Styles.tab} inline-block p-4 rounded-t-lg`} aria-current="page">Top Gainers</span>
              </li>
              <li className="mr-2 cursor-pointer" onClick={()=> handleTabSelection('loser')}>
                  <span className={`${selectedTab=='loser' ? Styles.tabActive : Styles.tab} inline-block p-4  rounded-t-lg`} >Top Losers</span>
              </li>
          </ul>
      </div>
    </div>
    <div className='flex flex-row w-[98vw] m-auto mt-[20px] justify-center align-center flex-wrap'>
    { 
      data[selectedTab=== "gainer"?'top_gainers': 'top_losers']?.map((item: cardType)=>{ 
        return <Cards {...item}/>
      })
    }
    </div>
  
    </main>
    </>
  )
}

// LFDXVYPALRS23ZH4