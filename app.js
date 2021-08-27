const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(3001, () => {
    console.log("Server running on port 3001");
});

const players = [
    {
        id: 1,
        name: 'Còn trẻ',
        champ: 'Thresh',
        kda: '2/12/10',
        des: 'Chưa trưởng thành'
    },
    {
        id: 2,
        name: 'Sting đỏ',
        champ: 'Sivir',
        kda: '4/9/5',
        des: 'Lừa lọc'
    },
    {
        id: 3,
        name: 'Bánh mỳ trứng',
        champ: 'Master yi',
        kda: '8/8/2',
        des: 'Lươn lẹo'
    }
];

app.get("/players", (req, res, next) => {
    res.json(players);
});
app.get("/players/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findBookIndex(id);
    if (index !== -1) {
        res.json(players[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/players", (req, res, next) => {
    const player = {
        id: (new Date()).getTime(),
        name: req.body.name,
        champ: req.body.champ,
        kda: req.body.kda,
        des: req.body.des,
    };
    players.push(player);
    res.json(player);
});
app.delete("/players/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findBookIndex(id);
    if (index !== -1) {
        players.splice(index, 1);
        res.json({message: 'Học viên đã được học lại!', id: id});
    } else {
        res.status(404).json({message: 'Học viên vốn không ở trong lớp'});
    }
});

app.put("/players/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findBookIndex(id);
    if (index !== -1) {
        const player = players[index];
        player.name = req.body.name;
        player.champ = req.body.champ;
        player.kda = req.body.kda;
        player.des = req.body.des;
        res.json(player);
    } else {
        res.status(404).json({message: 'Học viên vốn không ở trong lớp'});
    }
});

function findBookIndex(id) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
            return i;
        }
    }
    return -1;
}
