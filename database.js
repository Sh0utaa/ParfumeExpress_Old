import { ID } from "appwrite";
import { databases } from "./src/appwriteConfig";

const collections = [ 
    {
        'databaseId':import.meta.env.VITE_DATABASE_ID,
        'id':import.meta.env.VITE_COLLECTION_ID_POSTS,
        'name':'posts'
    },
    {
        'databaseId':import.meta.env.VITE_DATABASE_ID,
        'id':import.meta.env.VITE_COLLECTION_ID_PROFILEPICS,
        'name':'profilePics',
    }
]

const db = {}

db[collections[0].name] = {
    list: (queries) => databases.listDocuments(
        collections[0].databaseId,
        collections[0].id,
        queries,
    )
}

export {db}