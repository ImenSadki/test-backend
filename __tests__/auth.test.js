const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

describe('Auth Tests', () => {
    // Avant tous les tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/library_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    // Après tous les tests
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    // Avant chaque test
    beforeEach(async () => {
        await User.deleteMany({}); // Nettoie la collection users
    });

    // Test d'inscription
    test('Should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                role: 'client'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Utilisateur créé avec succès');
    });

    // Test de connexion
    test('Should login user', async () => {
        // Créer d'abord un utilisateur
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                role: 'client'
            });

        // Essayer de se connecter
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});