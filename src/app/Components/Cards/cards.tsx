import Link from "next/link";

export default function Cards(props: { ticker: any; price: any; change_amount: any; change_percentage: any; volume: any; }){
    const{
        ticker,
        price,
        change_amount,
        change_percentage,
        volume
      } = props;
    return (
        <Link href={`/overview/${ticker}`}>
        <div className="min-w-fit p-6 bg-[#f6f5f489] mr-5 ml-5 mb-10 w-[13.5rem] rounded-xl border border-stone-300 shadow-lg text-stone-900 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex flex-wrap items-center justify-between">
                <img className="rounded-full w-14 h-14 mb-2" src="https://storage.googleapis.com/5paisa-prod-storage/files/2022-09/Trending%20Company_8.jpg" alt="image description"/>
                    <h5 className="text-xl font-semibold tracking-wide">{ticker}</h5>

            </div>

            {/* <div className="flex flex-wrap items-center justify-between">  */}
                <p className=" mt-2 font-normal">Price: ${price}</p>
                <p className="mt-2 font-normal">Change: {change_percentage}</p>
            {/* </div> */}
        </div>
        </Link>

    )
}