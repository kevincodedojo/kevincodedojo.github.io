import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

//setting up database connection pool
const pool = mysql.createPool({
    host: "o61qijqeuqnj9chh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "ugrqthugq1mwg5vc",
    password: "nv019md5tln5timy",
    database: "qk970d7iirgndlst",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', (req, res) => {
    //    res.send('Hello Express app!')
    res.render('index');

});

app.get('/searchByKeyword', async(req, res) => {
    let userKeyword = req.query.keyword;
    let sql = `SELECT quote, authorId, firstName, lastName
                From q_quotes
                NATURAL JOIN q_authors
                WHERE quote LIKE '%${userKeyword}%'`;
    let sqlParams = [`%{keyword}%`];
    const [rows] = await pool.query(sql, sqlParams);
    res.render("results", {"quotes":rows});

    // res.send(rows);
    // res.render('index');

});

app.get("/dbTest", async (req, res) => {
    try {
        // SELECT * FROM q_authors
        const [rows] = await pool.query("SELECT * FROM q_authors");
        // const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error");
    }
});//dbTest

app.listen(3000, () => {
    console.log("Express server running")
})

