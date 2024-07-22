"use server";

import { driver } from "./db";
import { neo4jUser } from "./types/user";

export const getUserById = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (u:User { applicationId: $applicationId }) RETURN u`,
    { applicationId: id }
  );

  const users = result.records.map((record) => record.get("u").properties);
  if (users.length == 0) return null;
  return users[0] as neo4jUser;
};

export const createUser = async (user: neo4jUser) => {
  const result = await driver.executeQuery(
    `CREATE (u:User { applicationId: $applicationId, firstname: $firstname, lastname: $lastname, email: $email })`,
    {
      applicationId: user.applicationId,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    }
  );
};
