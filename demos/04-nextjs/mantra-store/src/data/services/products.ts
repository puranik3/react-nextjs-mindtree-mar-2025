import mongoose from "@/data/init";

// A model has the methods to talk to the DB and get the data for a specific collection (table) - Products table
const Product = mongoose.model("Product");

export const getProducts = async (page: number = 1) => {
    let inferredPage = 1;

    if (page) {
        if (!isNaN(+page)) {
            inferredPage = +page;
        }
    }

    const count = await Product.countDocuments();

    const products = await Product.find()
        .skip((inferredPage - 1) * 10)
        .limit(10)
        .select("-__v -createdAt -updatedAt -description -reviews");

    const mappedProducts = products.map((p) =>
        p.toJSON({ flattenObjectIds: true })
    );

    return {
        count,
        page: inferredPage,
        products: mappedProducts,
    };
};