import { Inngest } from "inngest";
import { connect } from "mongoose";
import { connectDB } from "./db.js";
import { User } from "../src/models/User.models.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "vibeconnect_app_user" });

const syncUser = inngest.createFunction(
  { name: "Sync User" },
  { event: "clerk/user.created" },
    async ({ event }) => {
        // This function will run whenever a user is created in Clerk
        await connectDB();
        // Access the user data from the event
        // The structure of event.data will depend on Clerk's webhook payload
        // Here, we're assuming it contains id, email, name, and image fields
        const { id, email_addresses, first_name,last_name, profile_image_url } = event.data;
       const newUser={
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""}  ${last_name || ""}`,
        image: profile_image_url
       }
       await User.create(newUser);
    }
    );
    const deleteUser = inngest.createFunction(
       { id: "vibeconnect_app_user_deleted" },

      { event: "clerk/user.deleted" },
        async ({ event }) => {
            // This function will run whenever a user is deleted in Clerk
      await connectDB();
            // Access the user data from the event
            // The structure of event.data will depend on Clerk's webhook payload
            // Here, we're assuming it contains id field
            const { id } = event.data;
         
           await User.findOneAndDelete({clerkId:id});
        }
        );

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser,deleteUser];