const fs=require('fs');

async function readFileData() {
await fs.readFile("./week-2/01-async-js/easy/3-read-from-file.md", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
  });
 let res=0;
  for(let i=0; i<2000000000;i++)
  {
   res=res+i;
  }
console.log(res);
}
  readFileData();
