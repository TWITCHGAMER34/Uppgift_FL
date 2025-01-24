### Presentation

Denna uppgift går ut på att skapa en enkel webbapplikation där användare kan registrera sig, logga in och komma åt en hemsida. Applikationen använder Node.js och Express för att hantera serverlogik och Knex.js för att interagera med en databas. Här är en detaljerad förklaring av varje route och varför varje del behövs.

### Register Route

**Funktion:** Registrerar en ny användare.

**Kod:**
```javascript
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await knex('users').insert({ username, password });
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});
```

### Förklaring:
- app.post('/register', async (req, res) => { ... }): Definierar en POST-route för /register.
- const { username, password } = req.body;: Extraherar användarnamn och lösenord från förfrågningskroppen.
- await knex('users').insert({ username, password });: Lägger till en ny användare i databasen.
- res.status(201).send('User registered successfully');: Skickar en framgångsstatus om registreringen lyckas.
- res.status(500).send('Error registering user');: Skickar en felstatus om registreringen misslyckas.

### Login Route

**Funktion:** Loggar in en användare.

**Kod:**
```javascript
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await knex('users').where({ username }).first();
        if (user && user.password === password) {
            req.session.userId = user.id;
            res.redirect('/homepage')
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
```
### Förklaring:
- app.post('/login', async (req, res) => { ... }): Definierar en POST-route för /login.
- const { username, password } = req.body;: Extraherar användarnamn och lösenord från förfrågningskroppen.
- const user = await knex('users').where({ username }).first();: Hämtar användaren från databasen.
- if (user && user.password === password) { ... }: Kontrollerar om användaren finns och lösenordet stämmer.
- req.session.userId = user.id;: Sparar användarens ID i sessionen.
- res.status(200).send('Login successful');: Skickar en framgångsstatus om inloggningen lyckas.
- res.status(401).send('Invalid credentials');: Skickar en felstatus om inloggningen misslyckas.
- res.status(500).send('Error logging in');: Skickar en felstatus om ett fel uppstår.

### Homepage Route

**Funktion:** Visar hemsidans innehåll.

**Kod:**
```javascript
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

app.get('/homepage', isAuthenticated, (req, res) => {
    console.log('success');
    res.sendFile(path.join(__dirname, 'homepage.html'));
});
```

### Förklaring:

- app.use(session({ ... }));: Konfigurerar session middleware.
- const isAuthenticated = (req, res, next) => { ... }: Middleware som kontrollerar om användaren är autentiserad.
- if (req.session && req.session.userId) { ... }: Kontrollerar om sessionen och användar-ID finns.
- res.status(401).send('Unauthorized');: Skickar en felstatus om användaren inte är autentiserad.
- app.get('/homepage', isAuthenticated, (req, res) => { ... }): Definierar en GET-route för /homepage som endast är tillgänglig om användaren är autentiserad.
- res.sendFile(path.join(__dirname, 'homepage.html'));: Skickar hemsidan till klienten.

### Sammanfattning

#### Denna uppgift demonstrerar hur man skapar en enkel webbapplikation med användarregistrering, inloggning och en skyddad hemsida. Varje route har en specifik funktion och använder middleware och databasoperationer för att hantera användarinteraktioner och säkerhet.