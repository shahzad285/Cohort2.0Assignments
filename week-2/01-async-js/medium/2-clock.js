function clock()
{
    setInterval(() => {    
       console.clear();
       var date=new Date();
       console.log('24 hour format:-'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'              12 our format:-'+(date.getHours()>12?date.getHours()-12:date.getHours())+':'+date.getMinutes()+':'+date.getSeconds()+' '+(date.getHours()>12?'PM':'AM')); 
    }, 1000);
}
clock();