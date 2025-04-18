export const ITEM = {
  "id": 1,
  "name": "Lorem ipsum dolor sit amet consectetur adipiscing elit",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra urna sed lorem tempus, ac semper ante laoreet. Nulla vitae sem massa. Nullam turpis sapien, vestibulum id orci eget, auctor.",
  "price": 9999.99,
  "image": "https://placehold.co/100"
}

export const ADDITIONAL = { ...ITEM }

export const CATEGORIES_ADDITIONALS = [
  {
    "id": 1,
    "title": "Header Title 1",
    "subtitle": "Header SubTitle 1",
    "additionals": [ADDITIONAL, { ...ADDITIONAL, id: 2 }],
    "show": true,
    "type": "choose one",
    "required": true,
    "created_at": "2021-09-01T00:00:00.000Z",
    "updated_at": "2021-09-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Header Title 2",
    "subtitle": "Header SubTitle 2",
    "show": false,
    "additionals": [ADDITIONAL],
    "type": "add on",
    "required": false,
    "created_at": "2021-09-01T00:00:00.000Z",
    "updated_at": "2021-09-01T00:00:00.000Z"
  },
  {
    "id": 3,
    "title": "Header Title 3",
    "subtitle": "Header SubTitle 3",
    "show": false,
    "additionals": [{ ...ADDITIONAL, id: 3 }, { ...ADDITIONAL, id: 4 }],
    "type": "select multiple",
    "required": false,
    "created_at": "2021-09-01T00:00:00.000Z",
    "updated_at": "2021-09-01T00:00:00.000Z"
  }
]

export const PRODUCT = { ...ITEM, "categories": CATEGORIES_ADDITIONALS }
export const PRODUCTS = [PRODUCT]

export const CATEGORIES_PRODUCTS = [
  {
    "id": 1,
    "title": "Header Title 1",
    "subtitle": "Header SubTitle 1",
    "show": true,
    "products": PRODUCTS,
    "created_at": "2021-09-01T00:00:00.000Z",
    "updated_at": "2021-09-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Header Title 2",
    "subtitle": "Header SubTitle 2",
    "show": false,
    "products": PRODUCTS,
    "created_at": "2021-09-01T00:00:00.000Z",
    "updated_at": "2021-09-01T00:00:00.000Z"
  }
]

export const ORDERS = [
  {
    "id": 1,
    "status": "aguardando",
    "address": "Rua Jornalista Mario Lisboa 298 - Casa 101 - CEP 21655-460",
    "observation": "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    "payment_method": "credit",
    "delivery": true,
    "delivery_cost": 9999.99,
    "total": 9999.99,
    "delivery_forecast": "01/01/2000 00:00",
    "delivered_at": null,
    "created_at": "01/01/2000 00:00",
    "updated_at": "01/01/2000 00:00",
    "products": [
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      },
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      }
    ]
  },
  {
    "id": 2,
    "status": "preparando",
    "address": "Rua Jornalista Mario Lisboa 298 - Casa 101 - CEP 21655-460",
    "observation": "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    "payment_method": "debit",
    "delivery": true,
    "delivery_cost": 9999.99,
    "total": 9999.99,
    "delivery_forecast": "01/01/2000 00:00",
    "delivered_at": null,
    "created_at": "01/01/2000 00:00",
    "updated_at": "01/01/2000 00:00",
    "products": [
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      },
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      }
    ]
  },
  {
    "id": 3,
    "status": "entregando",
    "address": "Rua Jornalista Mario Lisboa 298 - Casa 101 - CEP 21655-460",
    "observation": "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    "payment_method": "cash",
    "delivery": true,
    "delivery_cost": 9999.99,
    "total": 9999.99,
    "delivery_forecast": "01/01/2000 00:00",
    "delivered_at": null,
    "created_at": "01/01/2000 00:00",
    "updated_at": "01/01/2000 00:00",
    "products": [
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      },
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      }
    ]
  },
  {
    "id": 4,
    "status": "finalizado",
    "address": "Rua Jornalista Mario Lisboa 298 - Casa 101 - CEP 21655-460",
    "observation": "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    "payment_method": "pix",
    "delivery": true,
    "delivery_cost": 9999.99,
    "total": 9999.99,
    "delivery_forecast": "01/01/2000 00:00",
    "delivered_at": "01/01/2000 00:00",
    "created_at": "01/01/2000 00:00",
    "updated_at": "01/01/2000 00:00",
    "products": [
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      },
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      }
    ]
  },
  {
    "id": 5,
    "status": "cancelado",
    "address": "Rua Jornalista Mario Lisboa 298 - Casa 101 - CEP 21655-460",
    "observation": "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    "payment_method": "cash",
    "delivery": true,
    "delivery_cost": 9999.99,
    "total": 9999.99,
    "delivery_forecast": "01/01/2000 00:00",
    "delivered_at": null,
    "created_at": "01/01/2000 00:00",
    "updated_at": "01/01/2000 00:00",
    "products": [
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      },
      {
        ...ITEM,
        "quantity": 1,
        "additionals": [
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
          {
            ...ADDITIONAL,
            "quantity": 1,
          },
        ]
      }
    ]
  }
];

export const CART = {
  "products": [
    {
      ...ITEM,
      "quantity": 1,
      "total": 9999.99,
      "additionals": [
        {
          ...ADDITIONAL,
          "quantity": 1,
          "price": 9999.99,
        },
        {
          ...ADDITIONAL,
          "quantity": 1,
          "price": 9999.99,
        },
        {
          ...ADDITIONAL,
          "quantity": 1,
          "price": 9999.99,
        },
      ]
    }
  ],
  "total": 9999.99,
}
