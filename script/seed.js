'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'krabby@email.com', password: '123'}),
    User.create({email: 'squirtle@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Melbourne Breakfast',
      description:
        'When the winds start howling, this brew will see you through. Indulge a little with this full-bodied vanilla sweet tea bound to keep you cosy all year round. Sip it up Melbourne style!',
      price: 4,
      inventory: 10,
      image: '/img/melbourne-breakfast.jpg'
    }),
    Product.create({
      name: 'Oolong Fresh',
      description: 'Loose leaf fresh oolong tea.',
      price: 10,
      inventory: 10,
      image: '/img/oolong-fresh.jpg'
    }),
    Product.create({
      name: 'Packs a Peach',
      description:
        'It is all peachy with this succulent blend of lip smacking flavours. This sweet brew sings of peach, papaya, apple and roasted chicory, creating a soft combo that really packs a peach. Also great iced.',
      price: 12,
      inventory: 10,
      image: '/img/packs-a-peach.jpg'
    }),
    Product.create({
      name: 'Pumping Pomegranate',
      description:
        'The essence of the Grand Bazaar, Istanbul. A sweet, tangy and mystical flavour, this tea will take you on a flavour journey with its many surprises.',
      price: 11,
      inventory: 10,
      image: '/img/pumping-pomegranate.jpg'
    }),
    Product.create({
      name: '100% Organic Matcha',
      description:
        'Our 100% certified organic matcha is a fine, highly prized powdered green tea traditionally used as part of the Japanese tea ceremony.',
      price: 11,
      inventory: 10,
      image: '/img/matcha.jpg'
    }),
    Product.create({
      name: 'Chai',
      description:
        'Complex, spicy and incredibly tasty, our signature chai blend is a unique classic. Perfect to wrap your hands around on a chilly afternoon. Traditionally brewed with milk and honey.',
      price: 11,
      inventory: 10,
      image: '/img/chai.jpg'
    }),
    Product.create({
      name: 'French Earl Grey',
      description:
        'Earl Grey gets a French twist which is oh-so-fruity. A medium-bodied black tea base with pretty petals and notes of fruit that play with classic bergamot in an inspiring, bold and refined infusion.',
      price: 11,
      inventory: 10,
      image: '/img/french.jpg'
    }),
    Product.create({
      name: 'Banana Bake Loose Leaf',
      description:
        'A robust black banana tea with hints of vanilla and banana to take you away to a picture perfect winters day, all snuggled up with a cuppa and munching on a warm loaf of banana bread.',
      price: 11,
      inventory: 10,
      image: '/img/banana-bake.jpg'
    }),
    Product.create({
      name: 'Watermelon Sorbet ',
      description:
        'Chill out in style with this oh-so-yummy poolside blend of lush watermelon and fresh mint. Kick your feet up…this brew makes it happy hour, every hour.',
      price: 11,
      inventory: 10,
      image: '/img/watermelon-sorbet.jpg'
    }),
    Product.create({
      name: 'Sencha Mango Loose Leaf',
      description:
        'Sencha green tea with mango equals a tropical treat that is sweet, mellow and packed with juicy mango vibes. A bright brew to bring a little sunshine into every cuppa.',
      price: 11,
      inventory: 10,
      image: '/img/sencha-mango.jpg'
    }),
    Product.create({
      name: 'Jade Mountain Loose Leaf',
      description:
        'Explore Jade Mountain and discover a utopia of cocoa, brittle pieces and green tea. A hint of chocolate and sweet hazelnut praline is totally worth it.',
      price: 11,
      inventory: 10,
      image: '/img/jade-mountain.jpg'
    }),
    Product.create({
      name: 'Detox Loose Leaf',
      description:
        'Been a little naughty? Whatever good intentions you might have, this detox tea is here to help you through!',
      price: 11,
      inventory: 10,
      image: '/img/detox.jpg'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
