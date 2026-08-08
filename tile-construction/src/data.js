const IM = (id, ext = 'webp') => `https://framerusercontent.com/images/${id}.${ext}`

export const IMG = {
  hero1: IM('C7Z0j6EPVP9LXzpqeauOhO3lwiU'),
  hero2: IM('xe0Zmnv9qsUdqvnaNjDeRo0HhiE'),
  skyline: IM('qy9TrRptmyuaSgGAicieo4hMeLc'),
  skyline2: IM('5MF3iH5Ooy40Nd2C1CfIZlDAJ4A', 'png'),
  about: IM('LMsKMTTrZwXu6v0q9qqcJgLoD6s'),
  plan: IM('kaWypKlqhytYTeU0oCEUoMEkSGw'),
  planMobile: IM('Lj2XAZ7ev8XXhoXFiuYu1TVZ8'),
  map: IM('vohzTCOQVugwV46Hf46YkS5ZoU'),
  floor2a: IM('5aQyfy7dTy8krcyEjNCfEaisFTk'),
  floor2b: IM('dDRJi91W81ZnixZNWgc3NBjHU'),
  floor2c: IM('MN8fplhAXYq2QAm8BvkpupZuyA'),
  floor2d: IM('s9RwG5C5Dhmp8lCdGjl5ol3WuIA'),
  floor2e: IM('jrt2t3L5rP2HzSYRwa15V0Q8', 'png'),
  floor3a: IM('mKekjono8UQf6KnqMUqKozBFY'),
  floor3b: IM('TK3mj8bTNuN2LYgT0FB64JCDu4M'),
  floor3c: IM('uefGStsEiKuLllizHDBYNVWWDP4'),
  parallax: IM('thwsjrYk4cNRM82yVszSmVANtPM', 'png')
}

export const GALLERY = [
  'o4qNdUSBYy2B20gWCdvsCi5SA',
  'Y3QMeRq4XOT6BBEH1oKyAy5Wt4',
  'iDZY62sjPlYp3UECRq7JtrUcA9w',
  'ztd0M6o6Emnng0CrFijF078HdE',
  'kzZyLZE6Waede51t9LQUaGEEVw',
  'ErKuehymdNT7lajmLzK6pHrqw',
  '1lwjglIEr1gqSfZaXl1X3HgDY',
  'SgMv3mmS3Z39YspbkYIHcM42iKk',
  'lHa77yURuIf22TMNkKDMyiwPs',
  'i4ail6yCTdg7RY81J7HRxskSJ4',
  'k5VZANzgBZcpD7k9ssqWN2loJAg',
  '3N79IxpQMvuIZJwErl4PpBkFdVc',
  't3JT1qnLy77Tlwx24RpnbuKBqU',
  'AoleG0sifqvei11ChjkXWnYaPo',
  'A6R4KiKgrJ0DLIziprL8JYa0lVY'
].map((id) => IM(id))

export const COMPANY = {
  name: 'Tile Construction',
  tagline: 'Built to Last',
  established: 'Since 1962',
  phone: '212.555.0142',
  email: 'build@tileconstruction.com'
}
