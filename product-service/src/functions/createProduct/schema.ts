export default {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "integer" },
    image: { type: "string" },
    year: { type: "string" },
    count: { type: "integer" },
  },
  required: ["title", "description", "price", "image", "year", "count"],
} as const;
