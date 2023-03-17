const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

test('POST /actors should create one actor', async()=>{
    const newActor = {
        firstName: "Angelina",
        lastName: "Jolie",
        nationality: "American",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/15/11/10/14/58/490093.jpg",
        birthday: "1975-04-06"
    }
    const res = await request(app).post('/actors').send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
})

test('GET /actors should return all actors', async()=>{
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('PUT /actors/:id should update one actor', async()=>{
    const body = {
        firstName: "Angelina updated",
        lastName: "Jolie",
        nationality: "American",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/15/11/10/14/58/490093.jpg",
        birthday: "1975-04-06"
    }
    const res = await request(app)
    .put(`/actors/${actorId}`)
    .send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
})

test('DELETE /actors/:id should delete one actor', async()=>{
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
})