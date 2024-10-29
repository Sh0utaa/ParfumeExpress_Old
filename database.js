import { ID, Query } from "appwrite"; // Import Query to filter documents
import { databases } from "./src/appwriteConfig";

const collections = [
  {
    databaseId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_POSTS,
    name: "posts",
  },
];

const db = {};

db[collections[0].name] = {
  list: (queries) =>
    databases.listDocuments(
      collections[0].databaseId,
      collections[0].id,
      queries
    ),
  
  // Function to get a specific post by its ID
  getById: async (postId) => {
    try {
      const response = await databases.listDocuments(
        collections[0].databaseId,
        collections[0].id,
        [Query.equal('$id', postId)] // Filter by ID
      );
      return response.documents[0] || null; // Return the first matched document or null if not found
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  },

    // Get all posts filtered by gender
    filterByGender: async (gender) => {
      try {
        const response = await databases.listDocuments(
          collections[0].databaseId,
          collections[0].id,
          [Query.equal("Gender", gender)] // Filter by gender
        );
        return response.documents; // Return matched documents
      } catch (error) {
        console.error("Error fetching posts by gender:", error);
        throw error;
      }
    },
};

export { db };
