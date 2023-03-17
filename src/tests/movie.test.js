const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')
require('../models/index')

let movieId;

test('POST /movies should create one movie', async()=>{
    const newMovie = {
        name: "Eternals",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/21/08/19/10/48/2250523.jpg",
        synopsis: "Hace millones de años, los seres cósmicos conocidos como los Celestiales comenzaron a experimentar genéticamente con los humanos. Su intención era crear individuos superpoderosos que hicieran únicamente el bien, pero algo salió mal y aparecieron los Desviantes, destruyendo y creando el caos a su paso. Ambas razas se han enfrentado en una eterna lucha de poder a lo largo de la historia. En medio de esta guerra, Ikaris (Richard Madden) y Sersi (Gemma Chan) tratarán de vivir su propia historia de amor.",
        releaseYear: 2021
    }
    const res = await request(app).post('/movies').send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
})

test('GET /movies should return all movies', async()=>{
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})


test('PUT /movies/:id should update one movie', async()=>{
    const body = {
        name: "Eternals updated",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/21/08/19/10/48/2250523.jpg",
        synopsis: "Hace millones de años, los seres cósmicos conocidos como los Celestiales comenzaron a experimentar genéticamente con los humanos. Su intención era crear individuos superpoderosos que hicieran únicamente el bien, pero algo salió mal y aparecieron los Desviantes, destruyendo y creando el caos a su paso. Ambas razas se han enfrentado en una eterna lucha de poder a lo largo de la historia. En medio de esta guerra, Ikaris (Richard Madden) y Sersi (Gemma Chan) tratarán de vivir su propia historia de amor.",
        releaseYear: 2021
    }
    const res = await request(app)
    .put(`/movies/${movieId}`)
    .send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
})

test('POST /movies/:id/genres should set the movie genres', async()=>{
    const genre = await Genre.create({
        name: "drama"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('POST /movies/:id/actors should set the movie actors', async()=>{
    const actor = await Actor.create({
        firstName: "Angelina",
        lastName: "Jolie",
        nationality: "American",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/15/11/10/14/58/490093.jpg",
        birthday: "1975-04-06"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('POST /movies/:id/directors should set the movie directors', async()=>{
    const director = await Director.create({
        firstName: "Chloé",
        lastName: "Zhao",
        nationality: "Chinise",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/14/12/08/14/25/563107.jpg",
        birthday: "1982-03-03"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('DELETE /movies/:id should delete one movie', async()=>{
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
})
