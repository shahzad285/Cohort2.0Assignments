const fs=require('fs');

async function removeSpacesFromFileData() {
    let str='';
await fs.readFile("./week-2/01-async-js/medium/1-file-cleaner.md", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
      } else {
        str=data;
      }
  });
 
  await fs.writeFile("./week-2/01-async-js/medium/1-file-cleaner.md", str, err => {
    if (err) {
        console.log(err);
      } 
      console.log(fs.readFileSync("./week-2/01-async-js/easy/4-write-to-file.md","utf8"));
  });
}
removeSpacesFromFileData();
