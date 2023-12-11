

function counter(n)
{
    let cntr=0;    
    let intervalCounter=setInterval(() => {
    if(cntr<=n)
    {
       console.clear();
       console.log(++cntr)
    }
    if(cntr==n)
    clearInterval(intervalCounter);
}, 1000);


}
counter(5);