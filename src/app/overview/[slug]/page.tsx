'use client'
import { useEffect, useState } from "react";
import chart from "chart.js/auto"
import Navbar from "../../Components/Navbar/navbar";

export default function Product({params}) {
    const [data, setData] = useState({});
    const [graph, setGraph] = useState({});
    const [graphFilter, setGraphFilter] = useState('1D');

    const url = 'https://www.alphavantage.co/query';

    const parseResponse = (filterVal: string,res:Record<any, any>) => {
        let result = res;
        switch(filterVal){
            case '1D':
                result = res['Time Series (5min)'];
                break;
            case '1M': 
                result =res['Monthly Time Series'];
                break;
            case '3M':
            case '6M':
                result= res['Time Series (Daily)'];
                break;
            default: result = res['Time Series (5min)'];    
        }

        return result;
    }

    const handleOnClick = (filter:string) => {
        setGraphFilter(filter)
    }
    const generateUrl = (filter:string) =>{
        let updatedUrl = new URL(url);
        switch(filter){
            
            case '1D': 
           // updatedUrl= new URLSearchParams(url);
            updatedUrl.searchParams.set('function', 'TIME_SERIES_INTRADAY');
            updatedUrl.searchParams.set('symbol', params.slug);
            updatedUrl.searchParams.set('interval', '5min');
            updatedUrl.searchParams.set('apikey', 'demo');
            break;

            case '1M':
        
            updatedUrl.searchParams.set('function', 'TIME_SERIES_MONTHLY');
            updatedUrl.searchParams.set('symbol', params.slug);
            updatedUrl.searchParams.set('apikey', 'demo')
            break;

            case '3M':
        
            updatedUrl.searchParams.set('function', 'TIME_SERIES_DAILY');
            updatedUrl.searchParams.set('symbol', params.slug);
            updatedUrl.searchParams.set('apikey', 'demo')
            break;

            case '6M':
            updatedUrl.searchParams.set('function', 'TIME_SERIES_DAILY');
            updatedUrl.searchParams.set('symbol', params.slug);
            updatedUrl.searchParams.set('outputsize', 'full');
            updatedUrl.searchParams.set('apikey', 'demo')
            break;
            
        }
         return updatedUrl.href;
    }

    useEffect(() =>{
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`)
        .then((res) =>{
            return res.json();
        })
        .then((res) =>{
            setData(res);
        })
    },[])

    useEffect(() =>{
        const url = generateUrl(graphFilter);
        fetch(url)
        .then((res) =>{
            return res.json();
        })
        .then((res)=>{
            const result = parseResponse(graphFilter, res)
            setGraph(result);
        })
    },[graphFilter])

    useEffect(()=>{
        const ctx = document.getElementById("id_chart");
        
        var myChart =  new chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(graph),
                datasets: [{
                    data: Object.keys(graph).map((item) =>{
                        return graph[item]['4. close']
                    }),
                    label: "Price",
                }]
            }
        })
        return () =>{
            myChart.destroy();
        }
    },[graph])


    return (
        <main className="bg-white ">
            <Navbar />
            <div className="flex flex-col items-center justify-center">

                <div className="w-[800px] p-10 text-blue-700 mt-3 ">
                    <h1 className="mt-5 text-2xl text-center"> {data['Name']} ({data['Symbol']})</h1>
                </div>
                <div className="flex flex-col items-center justify-center w-[800px]"> 
                    <canvas id="id_chart"></canvas>
                    <div className="flex flex-row">
                        {
                            ['1D', '1M', '3M', '6M'].map((items)=>{
                                return(
                                    <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-sky-600 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white mt-3 ml-5" 
                                    onClick={() =>handleOnClick(items)}>
                                        {items}
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="mt-5 text-stone-950 h-[40vh] w-[1000px]">
                        {data['Description']}
                    </p>
                    <div className="flex text-stone-950 justify-between w-[800px] mb-5">
                        <p>Beta: {data['Beta']}</p>
                        <p>PERatio: {data['PERatio']}</p>
                        <p>Profit Margin: {data['ProfitMargin']}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}