// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main(
  student_num: String,
  password: String,
  first_name: string,
  last_name: string
) {
  const create_user = await prisma.user.create({
    data: {
      email: student_num + "@gordoncollege.edu.ph",
      first_name: first_name,
      last_name: last_name,
      password: await bcrypt.hash(password, 10),
    },
  });
}

main("unkown1", "na1", "first_name1", "last_name1");
main("unkown2", "na2", "first_name2", "last_name2");
