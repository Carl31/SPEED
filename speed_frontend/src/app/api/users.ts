import { User } from "../../components/userInterface";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const dbUsers: User[] = [];
  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((dataObject) => {
        // Extract values from the object and convert them into an array
        const dataArray = Object.values(dataObject);

        for (const user of dataArray) {
          dbUsers.push(user as User);
        }
      })
      .catch((error) => {
        console.error("Error fetching or parsing data:", error);
      });
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }
  res.status(200).json(dbUsers);
}
