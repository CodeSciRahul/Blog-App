import config from "../config/config";
import { Client,Databases,ID, Query, Storage } from "appwrite";

export class Post{
    client= new Client()
    Database
    storage
    constructor()
    {
        this.client
             .setEndpoint(config.appwriteurl)
             .setProject(config.appwriteprojectid)

        this.Database = new Databases(this.client)
        this.Storage = new Storage(this.client);
    }

    async CreatePost ({title, slug , content, featuredImage, status, userId})
    {
        try {
            return await this.Database.createDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            ) 
            
        } catch (error) {
            console.log("Post :: CreatePost :: error :: ", error);
        }
    }



    async UpdatePost (slug, {title, slug , content, featuredImage, status})
    {
        try {
            return await this.Database.updateDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug,
                {
                  title,
                  content,
                  featuredImage,
                  status
                    
                }
            )
            
        } catch (error) {
            console.log("Post :: UpdatePost :: error :: ", error);
        }

    }



    async DeletePost (slug)
    {
        try {
            await this.Database.deleteDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug
            )
            return true;
            
        } catch (error) {
            console.log("Post :: DeletePost:: error :: ", error);
            return false;
        }
    }


    async GetPost(slug)
    {
        try {
            return await this.Database.getDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug,
            )
        } catch (error) {
            console.log("Post :: GetPost :: error :: ", error);
            return false;
        }
    }


    async GetPosts( queries = [Query.equal("status","active")])
    {
        try {
            return await this.Database.listDocuments(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                queries,
            )
            
        } catch (error) {
            console.log("Post :: GetPosts :: error :: ", error);
            return false;
        }
    }


    // file upload service

    async UploadFile(file)
    {
        try {
            return await this.storage.CreateFile(
                config.appwritebucketid,
                ID.unique(),
                file,
                
            )
            
        } catch (error) {
            console.log("Post :: UploadFile :: error :: ", error);
            return false
        }

    }


    async DeleteFile(fileId)
    {
        try {
            await this.storage.deleteFile(
                config.appwritebucketid,
                fileId,
            )
            return true;
            
        } catch (error) {
            console.log("Post :: Deletefile :: error :: ",error);
            return false;
        }
    }


    async PreviewFile(fileId)
    {
        try {
            await this.storage.getFilePreview(
                config.appwritebucketid,
                fileId,
            )
            return true;
            
        } catch (error) {
            console.log("Post :: PreviewFile :: error :: ",error);
            return false;
        }
    }

}

const post = new Post();
export default post;

