const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const images = [
  "/img/lajkonik.jpg",
  "/img/krakowiak.JPG",
  "/img/nevelo.jpg",
  "/img/bombardier1.jpg",
  "/img/bombardier2.jpg",
  "/img/E1.jpg",
];


// GET / Home
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "TramwajeWKrakowie",
            description: "Blog o tramwajach jeżdżących po Krakowie"
        }

        let perPage = 5;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
    
    res.render('index', {
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
    });

    } catch (error) {
        console.log(error);
    }

});


// GET / POST :id
router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Blog o tramwajach jeżdżących po Krakowie"
      }
  
      const randomImage = images[Math.floor(Math.random() * images.length)];

      res.render('post', { 
          locals,
          data,
          image: randomImage,
          currentRoute: `/post/${slug}`
      });
    } catch (error) {
      console.log(error);
    }
  
  });


// POST / SearchTerm
router.post('/search', async (req, res) => {
try {
    const locals = {
    title: "Wyniki wyszukiwania",
    description: "Blog o tramwajach jeżdżących po Krakowie"
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
    $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
    ]
    });

    res.render("search", {
    data,
    locals,
    currentRoute: '/'
    });

} catch (error) {
    console.log(error);
}
});


router.get('/about', (req, res) => {
  const locals = {
    title: "O nas",
    description: "Blog o tramwajach jeżdżących po Krakowie"
  }

  res.render('about', {
    locals,
    currentRoute: '/about'
  });
});


router.get('/map', (req, res) => {
  const locals = {
    title: "Mapa tras",
    description: "Blog o tramwajach jeżdżących po Krakowie"
  }

    res.render('map', {
      locals,
      currentRoute: '/map'
    });
});


router.get('/contact', (req, res) => {
  const locals = {
    title: "Kontakt",
    description: "Blog o tramwajach jeżdżących po Krakowie"
  }

    res.render('contact', {
      locals,
      currentRoute: '/contact'
    });
});


module.exports = router;




// function insertPostData() {
//     Post.insertMany([
//             {
//         title: "Zmiany w rozkładzie jazdy na okres ferii zimowych",
//         body: "MPK Kraków ogłosiło zmiany w rozkładzie jazdy na czas ferii zimowych. Od poniedziałku 12 lutego część linii tramwajowych będzie kursować rzadziej, a na niektórych trasach pojawią się dodatkowe kursy.",
//         createdAt: new Date(),
//         updatedAt: new Date()
//     },
//     {
//         title: "Tramwaj hybrydowy na testach w Krakowie",
//         body: "MPK testuje nowy model tramwaju hybrydowego, który może poruszać się bez zasilania z sieci trakcyjnej. Testy potrwają miesiąc, a jeśli zakończą się pomyślnie, Kraków rozważy zakup takich pojazdów.",
//         createdAt: new Date(),
//         updatedAt: new Date()
//     },
//     {
//         title: "Kolizja tramwaju z samochodem na ulicy Dietla",
//         body: "Dziś rano na skrzyżowaniu ulic Dietla i Starowiślnej doszło do kolizji tramwaju linii 22 z samochodem osobowym. Ruch w kierunku Ronda Grunwaldzkiego był wstrzymany przez 40 minut.",
//         createdAt: new Date(),
//         updatedAt: new Date()
//     },
//     {
//         title: "Kolejne kursy nocnych tramwajów w weekendy",
//         body: "MPK Kraków ogłosiło, że w piątkowe i sobotnie noce zwiększona zostanie liczba kursów na liniach nocnych. Zmiany mają poprawić komfort podróży dla osób wracających z nocnych wydarzeń.",
//         createdAt: new Date(),
//         updatedAt: new Date()
//     },
//     {
//         title: "Modernizacja przystanków tramwajowych w centrum miasta",
//         body: "Władze Krakowa zapowiedziały modernizację kilku przystanków tramwajowych w centrum miasta. Nowe perony zostaną wyposażone w lepsze wiaty oraz system informacji pasażerskiej.",
//         createdAt: new Date(),
//         updatedAt: new Date()
//     }
//     ])
// }

// insertPostData();