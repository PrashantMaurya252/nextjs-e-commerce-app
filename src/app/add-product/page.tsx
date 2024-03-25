export default function AddProductPage(){
    return(
        <div>
          <h1 className="text-lg mb-3 font-bold">Add Product</h1>
          <form>
             <input required name="name" placeholder="Name" className="mb-3 w-full input input-bordered" />
             <textarea name="description" placeholder="Description" required className="textarea-bordered textarea mb-3 w-full"></textarea>
             <input required name="imageUrl" type="url" placeholder="Image URL" className="mb-3 w-full input input-bordered" />
             <input required name="price" type="number" placeholder="Price" className="mb-3 w-full input input-bordered" />
             <button type="submit" className="btn btn-primary btn-block">Add Product</button>
          </form>
        </div>
    )
}