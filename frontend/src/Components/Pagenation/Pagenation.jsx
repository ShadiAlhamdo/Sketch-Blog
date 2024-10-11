import './Pagenation.css'
const Pagenation = ({pages,currentPage,setCurrentPage}) => {
    const generatedPages=[];
    for(let i=1 ;i<=pages;i++){
        generatedPages.push(i);
    }
    return (  
        <div className="pagenation">
            <button
             className="page previos"
             onClick={()=>{setCurrentPage(prev=>prev-1)}}
             disabled={currentPage===1}
             >
                 Previos
            </button>
                {generatedPages.map(page=> (
                    <div 
                    onClick={()=>{setCurrentPage(page)}}
                    key={page} 
                    className={currentPage===page?"page active":"page"}>
                        {page}
                    </div>
                ))}
            <button 
            className="page next"
            onClick={()=>{setCurrentPage(next=>next+1)}}
             disabled={currentPage===pages}
            >
                Next
            </button>
        </div>
    );
}
 
export default Pagenation;