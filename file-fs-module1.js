const fs = require("fs")
//sync ... file path create 
fs.writeFileSync('./test.txt','hey bro')
//async...//asyns is  always return 
fs.watchFile('./test.txt','hey bro async',(err) => {
})


const res = fs.readFileSync('./contact.txt',"utf-8") // for decoding what is the file type like mp3,mp4,string,text,etc 
// console.log(res)

// async this not return 
 fs.readFile('./contact.txt',"utf-8",(err,result) => {
    if(err){
        console.log(err)

    }else{
        console.log(result)
    }
 })


 // for append data without old data deleting
 fs.appendFileSync('./test.txt',`${Date.now()} hey there\n`)


 //for copyfile
 fs.cpSync('./test.txt','./copy.txt')

 //for delete file
 fs.unlinkSync('./copy.txt')

// for statictics chaek file
console.log(fs.statSync('./test.txt',))

fs.mkdirSync('mkdirectory',{})

