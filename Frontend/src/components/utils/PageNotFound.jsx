export default function PageNotFound() {
    return (
        <>
            <div className="conatiner flex justify-center items-center m-5 flex-col">
                <div className=" bg-blend-multiply m-5">
                    <img src="/faceLogo-removebg-preview.png" alt=""/>
                </div>
                <div className="head text-gray-300 m-5 font-bold text-4xl">
                    <h1>404 Page Not found</h1>
                </div>
                <div className="text text-gray-300">
                    Uh oh we can't seem to find page you are looking for. Trying going back or conatct our <a href="/help">HELP</a> center for more info.
                </div>
            </div>
        </>
    )
}