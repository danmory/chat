const express = require( "express")
const app = express()
const PORT = process.env.PORT || 3000

app.post('/enter', (req, res) => {

})

app.listen(PORT, () => console.log(`started on port ${PORT}`))