export interface IRecipe {
    _id: string;
    title: string;
    products: string[];
    description: string;
    imageUrl: string;
    type: string;
    likes: string[];
    created_at: string;
    updatedAt: string;
    __v: number;
}