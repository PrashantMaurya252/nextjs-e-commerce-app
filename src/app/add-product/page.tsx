import prisma from "@/lib/db/prisma"
import { redirect } from "next/navigation";
import FormSubmissionButton from "../(components)/FormSubmissionButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata={
  title:"Add Product - Bazarzone"
}

async function addProduct(formData:FormData){
  "use server"
  const session = await getServerSession(authOptions)

  if(!session){
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }

  const name=formData.get("name")?.toString();
  const description=formData.get("description")?.toString();
  const imageUrl=formData.get("imageUrl")?.toString();
  const price=Number(formData.get("price") || 0);

  

  if(!name || !description || !imageUrl || !price){
    throw Error("Missing Required Fields")
  }

  await prisma.product.create({
    data:{name,description,imageUrl,price},
  });
  redirect("/")
}

export default async function AddProductPage(){
  const session = await getServerSession(authOptions)

  if(!session){
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }
    return(
        <div>
          <h1 className="text-lg mb-3 font-bold">Add Product</h1>
          <form action={addProduct}>
             <input required name="name" placeholder="Name" className="mb-3 w-full input input-bordered" />
             <textarea name="description" placeholder="Description" required className="textarea-bordered textarea mb-3 w-full"></textarea>
             <input required name="imageUrl" type="url" placeholder="Image URL" className="mb-3 w-full input input-bordered" />
             <input required name="price" type="number" placeholder="Price" className="mb-3 w-full input input-bordered" />
             <FormSubmissionButton className="btn-block">Add Product</FormSubmissionButton>
          </form>
        </div>
    )
}