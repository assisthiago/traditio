import { ITEMS } from '@/fixtures/items';

export const CATEGORIES_PRODUCTS = [
  {
    "id": 1,
    "name": "Header Title 1",
    "items": ITEMS
  },
  {
    "id": 2,
    "name": "Header Title 2",
    "items": ITEMS
  },
  {
    "id": 3,
    "name": "Header Title 3",
    "items": ITEMS
  },
  {
    "id": 4,
    "name": "Header Title 4",
    "items": ITEMS
  },
  {
    "id": 5,
    "name": "Header Title 5",
    "items": ITEMS
  }
]

export const CATEGORIES_PRODUCT = [
  {
    "id": 1,
    "title": "Header Title 1",
    "subtitle": "Header SubTitle 1",
    "type": "choose one",
    "required": true,
    "items": [
      {
        "id": 1,
        "name": "Lorem ipsum dolor sit amet orci aliquam.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra urna sed lorem tempus, ac semper ante laoreet. Nulla vitae sem massa. Nullam turpis sapien, vestibulum id orci eget, auctor.",
        "price": 234.56,
        "image": "https://placehold.co/75",
      },
      {
        "id": 2,
        "name": "Lorem Ipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra urna sed lorem tempus, ac semper ante laoreet. Nulla vitae sem massa. Nullam turpis sapien, vestibulum id orci eget, auctor.",
        "price": 234.56,
        "image": "https://placehold.co/75",
      },
    ]
  },
  {
    "id": 2,
    "title": "Header Title 2",
    "subtitle": "Header SubTitle 2",
    "type": "add on",
    "required": false,
    "items": [
      {
        "id": 1,
        "name": "Lorem ipsum dolor sit amet orci aliquam.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra urna sed lorem tempus, ac semper ante laoreet. Nulla vitae sem massa. Nullam turpis sapien, vestibulum id orci eget, auctor.",
        "price": 234.56,
        "image": "https://placehold.co/75",
      },
      {
        "id": 1,
        "name": "Aliqua Ut",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra urna sed lorem tempus, ac semper ante laoreet. Nulla vitae sem massa. Nullam turpis sapien, vestibulum id orci eget, auctor.",
        "price": 234.56,
        "image": "https://placehold.co/75",
      },
      {
        "id": 1,
        "name": "Aliqua Ut",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra urna sed lorem tempus, ac semper ante laoreet. Nulla vitae sem massa. Nullam turpis sapien, vestibulum id orci eget, auctor.",
        "price": 234.56,
        "image": "https://placehold.co/75",
      }
    ]
  }
]
