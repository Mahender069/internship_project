import { PrismaClient } from "./generated/prisma/client";
import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg(connectionString); // ← fixed
const prisma = new PrismaClient({ adapter });

faker.seed(42);

const STATES = [
  "Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu",
  "Maharashtra", "Kerala", "Delhi", "Gujarat"
];

const CITIES = {
  Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Kerala: ["Kochi", "Kozhikode", "Thrissur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"]
};

const COURSE_NAMES = [
  "B.Tech CSE", "B.Tech ECE", "B.Tech EEE", "B.Tech Mechanical",
  "B.Tech Civil", "B.Tech AI & ML", "BCA", "MCA", "MBA", "BBA", "B.Sc Data Science"
];

async function main() {
  console.log("🌱 Starting Seed...");

  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Database cleaned");

  const passwordHash = await bcrypt.hash("Password@123", 10);
  const users = [];

  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: passwordHash
      }
    });
    users.push(user);
  }

  console.log(`✅ ${users.length} Users Created`);

  const colleges = [];

  for (let i = 0; i < 100; i++) {
    const state = faker.helpers.arrayElement(STATES);
    const location = faker.helpers.arrayElement(CITIES[state as keyof typeof CITIES]);

    const college = await prisma.college.create({
      data: {
        name: faker.company.name() + " College",
        location,
        state,
        fees: faker.number.int({ min: 40000, max: 350000 }),
        rating: faker.number.float({ min: 2.5, max: 5, multipleOf: 0.1 }),         // ← fixed
        placementRate: faker.number.float({ min: 40, max: 100, multipleOf: 0.1 }), // ← fixed
        averagePackage: faker.number.int({ min: 300000, max: 2500000 }),
        description: faker.lorem.paragraph()
      }
    });

    colleges.push(college);
  }

  console.log(`✅ ${colleges.length} Colleges Created`);

  const courses = [];

  for (let i = 0; i < 300; i++) {
    const college = faker.helpers.arrayElement(colleges);
    courses.push({
      name: faker.helpers.arrayElement(COURSE_NAMES),
      duration: faker.helpers.arrayElement(["2 Years", "3 Years", "4 Years"]),
      fees: faker.number.int({ min: 40000, max: 300000 }),
      collegeId: college.id
    });
  }

  await prisma.course.createMany({ data: courses });
  console.log(`✅ ${courses.length} Courses Created`);

  const reviews = [];

  for (let i = 0; i < 500; i++) {
    const college = faker.helpers.arrayElement(colleges);
    const user = faker.helpers.arrayElement(users);
    reviews.push({
      rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }), // ← fixed
      comment: faker.lorem.sentences(2),
      userId: user.id,
      collegeId: college.id
    });
  }

  await prisma.review.createMany({ data: reviews });
  console.log(`✅ ${reviews.length} Reviews Created`);

  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━");
  console.log("Seed Complete");
  console.log("20 Users | 100 Colleges | 300 Courses | 500 Reviews");
  console.log("━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });