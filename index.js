const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


let albumes = [
  { 
    id: 1, 
    titulo: 'Artaud', 
    artista: 'Pescado Rabioso', 
    año: 1973 
  },
  { id: 2, 
    titulo: 'La argentinidad al palo', 
    artista: 'Bersuit Vergarabat', 
    año: 2000 
  },
  { id: 3, 
    titulo: 'Oktubre',
    artista: 'Patricio rey y sus redonditos de ricota',
    año: 1986
  },
  {
    id:4,
    titulo: "Bicicleta",
    artista: "Serú Girán",
    año: 1980
  }
]

app.use(express.json());


app.get('/albumes', (req, res) => {
  res.send(albumes);
});

app.get('/albumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const album = albumes.find(album => album.id === id);

  if (!album) {
    res.status(404).send('El álbum no fue encontrado.');
  } else {
    res.send(album);
  }
});


app.post('/albumes', (req, res) => {
  const album = req.body;
  album.id = albumes.length + 1;
  albumes.push(album);
  res.send(album);
});


app.put('/albumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let album = albumes.find(album => album.id === id);

  if (!album) {
    res.status(404).send('El álbum no fue encontrado.');
  } else {
    album.titulo = req.body.titulo;
    album.artista = req.body.artista;
    album.año = req.body.año;
    res.send(album);
  }
});

app.delete('/albumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = albumes.findIndex(album => album.id === id);

  if (index === -1) {
    res.status(404).send('El álbum no fue encontrado.');
  } else {
    albumes.splice(index, 1);
    res.send('El álbum fue eliminado correctamente.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
