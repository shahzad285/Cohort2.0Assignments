const fs=require('fs');
const dataAdded='Content to be added';
async function writeFileData() {
await fs.writeFile("./week-2/01-async-js/easy/4-write-to-file.md", dataAdded, err => {
    if (err) {
        console.log(err);
      } 
      console.log(fs.readFileSync("./week-2/01-async-js/easy/4-write-to-file.md","utf8"));
  });
 
}
writeFileData();
