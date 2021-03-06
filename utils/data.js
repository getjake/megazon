import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Jane',
      email: 'jane@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false
    },
  ],
  products: [
    {
      name: "Waffle Long-Sleeve Henley T-Shirt",
      category: "Shirts",
      image: "/images/image-1.webp",
      slug: "waffle-henley-t-shirt",
      isFeatured: true,
      featuredImage : '/images/banner-1.jpg',
      price: 19.9,
      brand: "Uniqlo",
      rating: 4.5,
      numReviews: 15,
      countInStock: 10,
      description: "The distinctive casual texture of waffle fabric. A versatile T-shirt that works great on its own or layered.",
    },
    {
      name: "U Crew Neck Short-Sleeve T-Shirt",
      category: "Shirts",
      image: "/images/image-2.webp",
      slug: "crew-neck-t-shirt",
      isFeatured: true,
      featuredImage : '/images/banner-2.jpg',
      price: 29.9,
      brand: "Nike",
      rating: 3.9,
      numReviews: 10,
      countInStock: 20,
      description: "Smooth and elegant texture. This 100% cotton T-shirt looks great on its own.",
    },
    {
      name: "Satin Drape Jogger Pants",
      category: "Pants",
      image: "/images/image-3.webp",
      slug: "satin-drape-jogger-pants",
      isFeatured: true,
      featuredImage : '/images/banner-3.jpg',
      price: 39.9,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 18,
      countInStock: 30,
      description: "Relaxed yet elegant enough to wear out and about."
    },
    {
      name: "Linen-Blend Camisole Jumpsuit",
      category: "Dresses",
      image: "/images/image-4.webp",
      slug: "linen-blend-jumpsuit",
      isFeatured: false,
      price: 70,
      brand: "Uniqlo",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "The elegant look of linen. Shoulder straps allow length adjustment.",
    },
    {
      name: "Linen-Blend Short-Sleeve Kaftan",
      category: "Dresses",
      image: "/images/image-5.webp",
      slug: "linen-blend-short-sleeve-karftan",
      isFeatured: true,
      featuredImage : '/images/banner1.jpg',
      price: 49.9,
      brand: "Nike",
      rating: 4,
      numReviews: 13,
      countInStock: 20,
      description: "The distinctive casual texture of waffle fabric. A versatile T-shirt that works great on its own or layered.",
    },
    {
      name: "AIRism Cotton Tank Top",
      category: "Innerwears",
      image: "/images/image-6.webp",
      slug: "airsim-tank-top",
      isFeatured: false,
      price: 70,
      brand: "Uniqlo",
      rating: 4,
      numReviews: 11,
      countInStock: 20,
      description: "Innerwear for comfort in any temperature. Slightly longer hem stays tucked in.",
    },
  ],
};
export default data;
