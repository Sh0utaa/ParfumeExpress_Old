import { ID, Query } from "appwrite"; // Import Query to filter documents
import { databases } from "./src/appwriteConfig";

const collections = [
  {
    databaseId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_POSTS,
    name: "posts",
  },
  {
    databaseId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_USERCART,
    name: "cart",
  }
];

const db = {};

// UserCart repository
db[collections[1].name] = {
   // Function to get list of posts by user ID
   getPostsByUserId: async (userId) => {
    try {
      const response = await databases.listDocuments(
        collections[1].databaseId,
        collections[1].id,
        [Query.equal('userId', userId)] // Adjusted to filter by userId field
      );
      return response.documents; // Return the array of matched documents
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  // Function to add a UserCart data entry (many-to-many relationship)
  addUserCartEntry: async (userId, postId) => {
    try {
        // Generate a unique document ID or use 'ID.unique()' if Appwrite expects it
        const response = await databases.createDocument(
            collections[1].databaseId,
            collections[1].id,
            ID.unique(), // This will generate a unique ID for the document
            {  // Specify the data field as an object with expected properties
                UserId: userId,
                ProductId: postId
            }
        );
        return response; // Return the created document
    } catch (error) {
        console.error("Error adding UserCart entry:", error);
        throw error;
    }
  },
  // Function to check if a user has already added a specific post to their cart
  isPostInCart: async (userId, postId) => {
    try {
        const response = await databases.listDocuments(
          collections[1].databaseId,
          collections[1].id,
          [
              Query.equal('UserId', userId),
              Query.equal('ProductId', postId)
          ]
        );
        return response.documents.length > 0; // Returns true if the document exists, otherwise false
    } catch (error) {
        console.error("Error checking UserCart entry:", error);
        throw error;
    }
  }
}


// Posts repository
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

    searchByTitle: async (searchTerm) => {
      try {
        const response = await databases.listDocuments(
          collections[0].databaseId,
          collections[0].id,
          [Query.search("Title", searchTerm)]
        );
        return response.documents;
      } catch (error) {
        console.error("Error searching posts:", error);
        return [];
      }
    },

};

export { db };
