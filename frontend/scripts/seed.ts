import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashed = await bcrypt.hash("Suri31cata", 10);
  await prisma.user.create({
    data: {
      email: "babakhan.adilzhan@gmail.com",
      password: hashed,
      isAdmin: true,
    },
  });

  console.log("Admin created!");
  process.exit();
}

main();
