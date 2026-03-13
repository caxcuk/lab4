const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

let phonebookData =[];

try {
    const data = fs.readFileSync('./phonebook.json', 'utf8');
    phonebookData = JSON.parse(data);
} catch (err) {
    console.error("Файл не найден");
}

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        cancelBtn: function () {
            return new hbs.handlebars.SafeString('<a href="/" class="btn">Отказаться</a>');
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));

function getPhonebook() {
    return phonebookData;
}

function savePhonebook(newData) {
    phonebookData = newData;

    fs.writeFile('./phonebook.json', JSON.stringify(phonebookData, null, 2), (err) => {
        if (err) console.log("Ошибка:", err.message);
    });
}


app.get('/', (req, res) => {
    res.render('index', { contacts: getPhonebook(), allowClick: true });
});

app.get('/Add', (req, res) => {
    res.render('add', { contacts: getPhonebook(), allowClick: false });
});

app.post('/Add', (req, res) => {
    const contacts = getPhonebook();
    contacts.push({ name: req.body.name, phone: req.body.phone });
    savePhonebook(contacts);
    res.redirect('/');
});

app.get('/Update', (req, res) => {
    res.render('update', {
        contacts: getPhonebook(),
        allowClick: false,
        oldName: req.query.name,
        oldPhone: req.query.phone
    });
});

app.post('/Update', (req, res) => {
    let contacts = getPhonebook();
    const index = contacts.findIndex(c => c.name === req.body.oldName);
    if (index !== -1) {
        contacts[index] = { name: req.body.name, phone: req.body.phone };
        savePhonebook(contacts);
    }
    res.redirect('/');
});

app.post('/Delete', (req, res) => {
    let contacts = getPhonebook();
    contacts = contacts.filter(c => c.name !== req.body.oldName);
    savePhonebook(contacts);
    res.redirect('/');
});

app.get('/json', (req, res) => {
    res.sendFile(path.join(__dirname, 'phonebook.json'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});