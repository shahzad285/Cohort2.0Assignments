function sleep() {
    return new Promise(resolve => {
      setTimeout(() => {       
        resolve();
      }, 1000);
    });
  }
  
  async function counterAsync(n) {
    for(let i=1;i<=n;i++)
    {
    await sleep();
    if(i<=n)
    console.clear();
    console.log(i);
  }
};


counterAsync(5);