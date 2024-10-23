const app = require('./app');
const mongoose = require('mongoose');
const PORT = 5000;

// Connexion à MongoDB sans options obsolètes
mongoose.connect('mongodb://localhost:27017/library')
    .then(() => {
        console.log('Connecté à MongoDB');
    })
    .catch(err => {
        console.error('Erreur de connexion :', err);
    });

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
