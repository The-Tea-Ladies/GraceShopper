'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
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
