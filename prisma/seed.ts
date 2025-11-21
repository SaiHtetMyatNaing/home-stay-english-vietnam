import { PrismaClient } from '../app/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Helper: pick random element from array
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

async function main() {
  console.log('Starting seeding with Faker.js...');

  // Define some realistic nationalities with proper flags
  const nationalities = [
    { name: 'France', flag: 'FR' },
    { name: 'Germany', flag: 'DE' },
    { name: 'Spain', flag: 'ES' },
    { name: 'Italy', flag: 'IT' },
    { name: 'United Kingdom', flag: 'GB' },
    { name: 'United States', flag: 'US' },
    { name: 'Canada', flag: 'CA' },
    { name: 'Australia', flag: 'AU' },
    { name: 'Japan', flag: 'JP' },
    { name: 'South Korea', flag: 'KR' },
    { name: 'Brazil', flag: 'BR' },
    { name: 'Argentina', flag: 'AR' },
    { name: 'Netherlands', flag: 'NL' },
    { name: 'Sweden', flag: 'SE' },
    { name: 'Switzerland', flag: 'CH' },
  ];

  const stayDurations = [
    '3 days',
    '5 days',
    '1 week',
    '10 days',
    '2 weeks',
    '3 weeks',
    '1 month',
    '6 weeks',
    '2 months',
  ];

  const stayPeriods = () => {
    const monthsBack = faker.number.int({ min: 1, max: 18 });
    const date = faker.date.recent({ days: monthsBack * 30 });
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // 1. Create 5 fake users
  const users = await Promise.all(
    Array.from({ length: 5 }, async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName }).toLowerCase();

      return prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: `${firstName} ${lastName}`,
          email,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          emailVerified: faker.datatype.boolean({ probability: 0.8 }),
        },
      });
    })
  );

  console.log(`Created ${users.length} users`);

  // 2. Create 5 reviews (one per user)
  const reviews = await Promise.all(
    users.map(async (user) => {
      const nationality = randomItem(nationalities);
      const rating = faker.number.int({ min: 3, max: 5 }); // mostly positive reviews
      const isFiveStar = rating === 5;

      const titles = isFiveStar
        ? [
            'Amazing stay – highly recommend!',
            'Perfect in every way',
            'Felt like home from day one',
            'Couldn’t have asked for better',
            'Already planning my next visit!',
            '10/10 experience',
          ]
        : [
            'Great place with minor suggestions',
            'Very good stay overall',
            'Lovely apartment!',
            'Really enjoyed our time here',
            'Wonderful host and location',
          ];

      const reviewTexts = isFiveStar
        ? [
            'Everything was absolutely perfect. The host was incredibly kind and responsive, the apartment was spotless and even nicer than the photos. Prime location, super comfortable bed, fast Wi-Fi — everything you need. Will definitely come back!',
            'One of the best Airbnb experiences we’ve ever had. Thoughtful touches everywhere, amazing communication, and the place felt brand new. Thank you for an unforgettable stay!',
            'Stunning views, peaceful neighborhood, and a host who goes above and beyond. Already missing this place!',
          ]
        : [
            'Really lovely apartment and great host. Only small note: could use a few more kitchen utensils and an extra blanket. Otherwise fantastic – would book again!',
            'We had a wonderful stay! Everything was clean and as described. The check-in process was smooth and the host gave excellent local recommendations.',
            'Beautiful place in a perfect location. Wi-Fi was a bit slow at times, but nothing major. Highly recommend!',
          ];

      return prisma.review.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          stayDuration: randomItem(stayDurations),
          stayPeriod: stayPeriods(),
          rating,
          title: randomItem(titles),
          nationality: nationality.name,
          countryFlag: nationality.flag,
          reviewText: randomItem(reviewTexts),
          approved: true,
          date: faker.date.recent({ days: faker.number.int({ min: 10, max: 400 }) }),
        },
      });
    })
  );

  console.log(`Created ${reviews.length} reviews`);
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });