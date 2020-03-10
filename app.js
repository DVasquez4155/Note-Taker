const fs = require('fs')
const path = require('path');
const express = require('express');
const app = express();
const port = 80;

var htmlPath = path.join(__dirname, 'public');
app.use(express.static(htmlPath));
app.get("/notes",function(req,res) {
    res.sendfile(path.join(htmlPath, 'notes.html'))
})
app.get("/api/notes", async function(req,res) {
    res.json(await getDB());
})
app.post("/api/notes", async function(req,res) {
    const data = req.body;
    await writeDB(data)
    res.send("Done");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
async function getDB() {
    return JSON.parse(fs.readFileSync('./db/db.json'));
}
async function writeDB(data) {
    console.log(data)
}