// import * as Knex from "knex";
//
// export async function seed(knex: Knex): Promise<void> {
//     // Deletes ALL existing entries
//     await knex("ingredients").del();
//     await knex("recipes").del();
//
//     await knex("ingredients").insert([
//         {
//             name: 'Chocolate',
//             slug: 'chocolate',
//             description: 'Bitter, but delicious.',
//             created_at: new Date().toISOString()
//         },
//         {
//             name: 'Vanilla',
//             slug: 'vanilla',
//             description: 'Sweet, but wonderful.',
//             created_at: new Date().toISOString()
//         },
//         {
//             name: 'Strawberry',
//             slug: 'strawberry',
//             description: 'Fruity, but tasty. In season in every summer, some farms let you pick them fresh. In ice cream, they are wonderful, and even eating them plain, they are spectacular.',
//             created_at: new Date().toISOString()
//         },
//         {
//             name: 'Banana',
//             slug: 'banana',
//             description: 'Great in bread, great in ice cream, great alone, they are all, always great!',
//             created_at: new Date().toISOString()
//         }
//     ])
//
//         // Inserts seed entries
//     await knex("recipes").insert([
//         {
//             name: "Cake",
//             slug: "cake",
//             description: "Delicious and fluffy. Full of frosting and sugar. A must-have for any celebration.",
//             completion_time: 1,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Chicken Teriyaki",
//             slug: "chicken-teriyaki",
//             description: "Savory and delicious. Be sure to eat it all.",
//             completion_time: 12,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Apple Pie",
//             slug: "apple-pie",
//             description: "A little slice of Autumn. Full of apple flavor.",
//             completion_time: 15,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Chicken Katsu",
//             slug: "chicken-katsu",
//             description: "Tasty chicken with delicious sauce.",
//             completion_time: 19,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Ice Cream",
//             slug: "ice-cream",
//             description: "Delicious and cold Summer treat.",
//             completion_time: 1,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Tacos",
//             slug: "tacos",
//             description: "Tasty and with all the fixings.",
//             completion_time: 21,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Nachos",
//             slug: "nachos",
//             description: "Delicious, but it seems like every bar sells them.",
//             completion_time: 31,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Banh Mi",
//             slug: "banh-mi",
//             description: "A fresh and delicious Vietnamese sandwich.",
//             completion_time: 51,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Pasta",
//             slug: "pasta",
//             description: "Full of delicious pasta, sauce, and cheese.",
//             completion_time: 18,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Pretzel",
//             slug: "pretzel",
//             description: "Delicious and salty snack.",
//             completion_time: 1,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Grilled Cheese",
//             slug: "grilled-cheese",
//             description: "Gooey and delicious cheese-bread.",
//             completion_time: 14,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Lemonade",
//             slug: "lemonade",
//             description: "Sugary, delightful water.",
//             completion_time: 11,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Cheeseburger",
//             slug: "cheeseburger",
//             description: "A BBQ classic.",
//             completion_time: 81,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Pickles",
//             slug: "pickles",
//             description: "Crispy and sour.",
//             completion_time: 61,
//             created_at: new Date().toISOString()
//         },
//         {
//             name: "Bread",
//             slug: "bread",
//             description: "Tangy and fluffy, a staple.",
//             completion_time: 91,
//             created_at: new Date().toISOString()
//         },
//     ]);
// }
