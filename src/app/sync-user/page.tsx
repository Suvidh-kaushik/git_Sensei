import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import { db } from '~/server/db';

const page = async () => {
  const {userId}=await auth();

  if(!userId){
    throw new Error('User not found');
  }

  const client=await clerkClient();
  const user= await client.users.getUser(userId);
  
  if(!user.emailAddresses[0]?.emailAddress){
     return notFound();
  }

  // await db.user.upsert({
  //   where:{
  //   emailAddr:user.emailAddresses[0]?.emailAddress ?? ""
  //   },
  //   update:{
  //       imageUrl:user.imageUrl,
  //       firstName:user.firstName,
  //       lastName:user.lastName
  //   },
  //   create:{
  //       id:userId,
  //       emailAddr:user.emailAddresses[0]?.emailAddress ??" ",
  //       imageUrl:user.imageUrl,
  //       firstName:user.firstName,
  //       lastName:user.lastName
  //   }
  // })

  // return redirect('/create')


  const userFound=await db.user.findFirst({
        where:{
          emailAddr:user.emailAddresses[0]?.emailAddress??""
        }
  })

  if(userFound){
    return redirect("/create")
  }
  else{
    await db.user.upsert({
      where:{
        emailAddr:user.emailAddresses[0]?.emailAddress??" "
      },
      update:{
        imageUrl:user.imageUrl,
        firstName:user.firstName,
        lastName:user.lastName
      },
      create:{
              id:userId,
              emailAddr:user.emailAddresses[0]?.emailAddress ??" ",
              imageUrl:user.imageUrl,
              firstName:user.firstName,
              lastName:user.lastName
          }
    })
  }

  return redirect("/create")

}

export default page