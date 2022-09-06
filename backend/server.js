const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
require("./models/Store");
require("./models/Ticket");
require("./models/Admin");
require("./models/RTPSchema");
require("./models/Solde");
require("./models/Serial");

const path = require("path");
const multer = require("multer");
app.use(express.json());
app.use("/public/uploads/", express.static(__dirname+'/public/uploads/'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const port = 3251;

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 var upload = multer({ storage: storage });

const StoresM = mongoose.model("Store");
const TicketM = mongoose.model("Ticket");
const AdminM = mongoose.model("Admin");
const RTPM = mongoose.model("RTPSchema");
const SoldeM = mongoose.model("Solde");
const Serial = mongoose.model("Serial");


const mongoUri = "mongodb://adminroulette:S534X%23bwCr9T@152.228.133.73:27017/dashboardroulette?retryWrites=true&w=majority&authSource=admin";
mongoose.connect(mongoUri, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
})

mongoose.connection.on("error", (err) => {
    console.log(err);
})

app.get('/', (req,res) => {
    res.send("Dashboard Roulette express server");
})

app.get("/updateAllFieldUsers", (req,res) => {
    StoresM.updateMany({}, { $set: { RevenuNet: 0, Annule:0, RésultatPayé:0, Soldes:0,SoldeStartTime:""}}, function (err, struu) {
        if (err) console.log(err)
        res.send(struu);
    });
});

app.post("/signin", (req,res) => {
    const {Identifiant,Password} = req.body;
    StoresM.findOne({"Identifiant":Identifiant,"Password":Password}).exec((err, storeU) => {
        if (!storeU) {
            console.log("401: Wrong pass or identifiant (identifiant trying " + Identifiant + " )");
            res.status(401).json({
                error: 'Veuillez saisir le mot de passe ou votre identifiant correctement'
              });
        }
        else {
            console.log("Identifiant " +storeU.Identifiant+ " userBalance " +storeU.Balance+ " RevenuNet " +storeU.RevenuNet+" Annule " +storeU.Annule+" RésultatPayé " +storeU.RésultatPayé+" Soldes " +storeU.Soldes+" SoldeStartTime " +storeU.SoldeStartTime);
            res.json({Identifiant:storeU.Identifiant, userBalance:storeU.Balance, RevenuNet:storeU.RevenuNet,Annule:storeU.Annule,RésultatPayé:storeU.RésultatPayé,Soldes:storeU.Soldes,SoldeStartTime:storeU.SoldeStartTime});
        }
        
    });
});

app.post("/signinAdmin", (req,res) => {
    const {Identifiant,Password} = req.body;
    AdminM.findOne({"Identifiant":Identifiant,"Password":Password}).exec((err, adminU) => {
        if (!adminU) {
            console.log("401: Wrong pass or identifiant (identifiant trying " + Identifiant + " )");
            res.status(401).json({
                error: 'Veuillez saisir le mot de passe ou votre identifiant correctement'
              });
        }
        else {
            res.send({"Identifiant":Identifiant});
        }
    });
});

app.post("/refreshBalance", (req,res) => {
    const {Identifiant} = req.body;
    StoresM.findOne({"Identifiant":Identifiant}).exec((err, storeU) => {
        if (!storeU) {
            console.log("401: wrong identifiant (identifiant trying " + Identifiant + " )");
            res.status(401).json({
                error: 'Veuillez saisir votre identifiant correctement'
              });
        }
        else {
            res.json({Identifiant:storeU.Identifiant, userBalance:storeU.Balance});
        }
    });
});

app.post("/updateBalance", (req,res) => {
    const {Identifiant,Balance} = req.body;
    StoresM.findOneAndUpdate({"Identifiant":Identifiant},{Balance:Balance}).exec((err, storeU) => {
        if (!storeU) {
            console.log("401: wrong identifiant (identifiant trying " + Identifiant + " )");
            res.status(401).json({
                error: 'Veuillez saisir votre identifiant correctement'
              });
        }
        else {
            res.json({Identifiant:storeU.Identifiant, userBalance:Balance});
        }
    });
});

app.post("/updateSoldeUser", (req,res) => {
    const {Identifiant,RevenuNet,Annule,RésultatPayé,Soldes,SoldeStartTime} = req.body;
    StoresM.findOneAndUpdate({"Identifiant":Identifiant},{RevenuNet,Annule,RésultatPayé,Soldes,SoldeStartTime}).exec((err, storeU) => {
        if (!storeU) {
            console.log("401: wrong identifiant (identifiant trying " + Identifiant + " )");
            res.status(401).json({
                error: 'Veuillez saisir votre identifiant correctement'
              });
        }
        else {
            console.log("Updated solde courant, Identifiant : " + Identifiant+ " RevenuNet:" +RevenuNet+ " Annule: " + Annule + " RésultatPayé: " + RésultatPayé + " Soldes: "+ Soldes +" SoldeStartTime: " + SoldeStartTime);
            res.json({Identifiant,RevenuNet,Annule,RésultatPayé,Soldes,SoldeStartTime});
        }
    });
});

app.get("/getRTP", (req,res) => {
    RTPM.findOne({}).exec((err, rtpU) => {
        if (!rtpU || err) {
            console.log("401: error rtp database");
            res.status(401).json({
                error: err
              });
        }
        else {
            res.json({RTP:rtpU.RTP});
        }
    });
});

app.get("/getSerial", (req,res) => {
    Serial.findOne({}).exec((err, ser) => {
        if (!ser || err) {
            console.log("401: error rtp database");
            res.status(401).json({
                error: err
              });
        }
        else {
            res.json({serial:ser.serial});
        }
    });
});

app.post("/updateRTP", (req,res) => {
    const {RTP} = req.body;
    RTPM.findOneAndUpdate({},{RTP:RTP}).exec((err, rtpU) => {
        if (!rtpU || err) {
            console.log("401: error rtp database");
            res.status(401).json({
                error: err
              });
        }
        else {
            res.json({RTP:RTP});
        }
    });
});

app.post("/addRTP", (req,res) => {
    const R = new RTPM({
        RTP:"85-95"
    });
    R.save().then(data =>{
        console.log(data)
        res.send(data);
    }).catch(err => {
        console.log(err)
    }); 
});

app.get("/fetchStores", (req,res) => {
    StoresM.find({}).then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
});

app.get("/fetchTickets", (req,res) => {
    TicketM.find({}).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
});

app.post("/fetchTicketsUser", (req,res) => {
    const {Identifiant} = req.body;
    TicketM.find({IdentifiantStore:Identifiant}).sort({ _id: -1 }).limit(3000).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
});

app.post("/resetCompteUser", (req,res) => {
    const {Identifiant} = req.body;
    TicketM.deleteMany({IdentifiantStore:Identifiant}).then(data => {
        SoldeM.find({Identifiant:Identifiant}).then(data => {
            StoresM.findOneAndUpdate({"Identifiant":Identifiant},{RevenuNet:0,Annule:0,RésultatPayé:0,Soldes:0,SoldeStartTime:""}).exec((err, storeU) => {
                if (!storeU) {
                    console.log("401: wrong identifiant (identifiant trying " + Identifiant + " )");
                    res.status(401).json({
                        error: 'Veuillez saisir votre identifiant correctement'
                      });
                }
                else {
                    res.send("Deleted all data");
                }
            });
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
});

app.get("/purgeTickets", (req,res) => {
    TicketM.deleteMany({}).then(data => {
        console.log("Purged all tickets in database");
        res.send("Deleted all tickets in the database");
    }).catch(err => {
        console.log(err);
    })
});


app.get("/totalInfos", (req,res) => {
    StoresM.find({}).count((err, count) => {
        if(err)
        {
            res.status(401).json(err);
        }
        else {
            //res.status(200).json({Count:count});
            StoresM.find({}).then(data => {
                var sum = 0;
                data.forEach(s => {
                    console.log(s.Balance);
                    sum += parseFloat(s.Balance);
                });
                console.log(sum.toFixed(2));
                TicketM.find({}).count((err2,count2) => {
                    if(err2)
                    {
                        res.status(401).json(err);
                    } else {
                        res.status(200).json({Count:count,TotalBalance:sum.toFixed(2),TotalTickets:count2});
                    }
                });

            });
        }
    });
});

app.post("/totalTicketsPerStore", (req,res) => {
    const {IdentifiantStore} = req.body;
    TicketM.find({IdentifiantStore}).count((err,count) => {
        if(err)
        {
            res.status(401).json(err);
        } else {
            console.log(IdentifiantStore + " has : " + count + " tickets in total");
            res.status(200).json({TotalTickets:count});
        }
    });

})

app.post('/editStore', (req,res) => {
    const {_id,Status,Balance} = req.body;
    StoresM.findByIdAndUpdate(_id, {"Status":Status,Balance:Balance}, (err,sto) => {
        if(err)
        {
            console.log(err);
            res.status(401).json({
                error: err
            });
        } else {
            res.send(sto);
        }
    });
});

app.post('/addAdmin', (req,res) => {
    const {Identifiant,Password} = req.body;
    StoresM.findOne({"Identifiant":Identifiant}).exec((err, user) => {
        if (user) {
            res.status(401).json({
                error: 'Compte existant'
              });
        }
        else {
            const A = new AdminM({
                Identifiant,
                Password
            });
            A.save().then(data =>{
                console.log(data)
                res.send(data);
            }).catch(err => {
                console.log(err)
            }); 
        }
    });
});

app.post('/addStore', (req,res) => {
    const {Identifiant,Password} = req.body;
    StoresM.findOne({"Identifiant":Identifiant}).exec((err, user) => {
        if (user) {
            res.status(401).json({
                error: 'Compte existant'
              });
        }
        else {
            const S = new StoresM({
                Identifiant,
                Password,
                Balance:"0.0",
                Status:"active"
            });
            S.save().then(data =>{
                console.log(data)
                res.send(data);
            }).catch(err => {
                console.log(err)
            }); 
        }
    });
});

app.post('/saveTicket', (req,res) => {
    const {TicketNumber,TurnID,Bets,Statut,date,payment,IdentifiantStore} = req.body;
    TicketM.findOne({TicketNumber,TurnID,Statut,date,payment,IdentifiantStore}).exec((errF, TicketS) => {
        if(errF)
        console.log(errF)
        else if(!TicketS)
        {
            console.log(date);
            const betsArray = JSON.parse(Bets);
            const ticket = new TicketM({
                TicketNumber,
                TurnID,
                Bets:betsArray,
                Statut,
                date:date,
                payment,
                IdentifiantStore
            });
            ticket.save().then(data => {
                console.log(data)
                res.send(data);
            }).catch(err => {
                console.log(err)
            }); 
        }
    });
});

app.post('/updateTicket', (req,res) => {
    const {TicketNumber,TurnID,date,IdentifiantStore,Statut,payment} = req.body;
    console.log("Updated ticket, " + "TicketNumber: " + TicketNumber + " TurnID: " + TurnID + " IdentifiantStore " + IdentifiantStore + " Statut " + Statut + " payment " + payment);
    TicketM.findOneAndUpdate({TicketNumber,TurnID,IdentifiantStore},{Statut:Statut,payment:payment}, (err,ticktt) => {
        if(err)
        {
            console.log(err);
            res.status(401).json({
                error: err
            });
        
        }
        if(!ticktt)
        {
            console.log("Ticket required not found ? (check ur combination for that specific test case ! )");
        } 
        else {
            res.send(ticktt);
        }
    });
});

app.post('/saveSolde', (req,res) => {
    const {Identifiant,RevenuNet,RésultatPayé,Soldes,StartTime,EndTime,Annule,SoldeNet} = req.body;
    const soldeE = new SoldeM({
        Identifiant,
        RevenuNet,
        RésultatPayé,
        Soldes,
        StartTime,
        EndTime,
        Annule,
        SoldeNet
    });
    console.log(soldeE);
    soldeE.save().then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        console.log(err)
    }); 
});

app.post("/fetchSoldes", (req,res) => {
    const {Identifiant} = req.body;
    SoldeM.find({Identifiant:Identifiant}).then(data => {
        res.send({Soldes:data});
    }).catch(err => {
        console.log(err);
    })
});

/*app.post('/addBook', upload.array("bookFiles",2), async(req, res, next) => {
    const files = req.files;
    if(!files)
    {
        const error = new Error('Please upload imagecover and bookfile');
        error.httpStatusCode = 400
      
        return next("Upload image and bookfile");
    }
    console.log(files);
    
    var imageFilePath = files[0].mimetype.includes("image") ? files[0].path : files[1].path;
    var bookFilePath = files[0].mimetype.includes("image") ? files[1].path : files[0].path;
    //const {Title, Author, Image, Synopsis, Characters, fileUrl, bookType} = req.body;
    const {Title, Author, Synopsis, Characters, bookType,bookPrice} = req.body;
    const B = new BookM({
        Title,
        Author,
        Image:imageFilePath.replaceAll('\\', '/'),
        Synopsis,
        Characters,
        fileUrl:bookFilePath.replaceAll('\\', '/'),
        bookType,
        bookPrice
    });
    B.save().then(data =>{
        console.log(data)
        res.status(201).json(data);
    }).catch(err => {
        console.log(err)
    }); 
})*/

app.listen(port, () => {
    console.log("Server running at port " + port);
})