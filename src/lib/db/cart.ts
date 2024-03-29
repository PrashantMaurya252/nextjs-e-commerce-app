import { cookies } from "next/headers";
import prisma from "./prisma";

export async function getCard(){
    const localCartId=cookies().get("localCardId")?.value
    const cart=localCartId ? 
    await prisma.cart.findUnique({
        where:{id:localCartId},
        include:{items:{
            include:{product:true}
        }}
    })
    :null;

    if(!cart){
        return null;
    }

    return{
        ...cart,
        size:cart.items.reduce((acc,item)=>acc+item.quantity,0)
    }
}

export async function createCart(){
    const newCart=await prisma.cart.create({
        data:{}
    })
    cookies().set("localCartId",newCart.id);
}