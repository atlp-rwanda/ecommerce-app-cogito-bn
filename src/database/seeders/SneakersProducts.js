const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const shoeSneakers = [
      {
        name: 'Air Max 90',
        description:
          'Classic sneakers with iconic Air Max cushioning for maximum comfort and style.',
      },
      {
        name: 'Chuck Taylor All Star',
        description:
          'Timeless sneakers with a canvas upper and rubber sole, perfect for casual wear.',
      },
      {
        name: 'Stan Smith',
        description:
          'Clean and minimalistic sneakers with a leather upper and perforated 3-Stripes branding.',
      },
      {
        name: 'Superstar',
        description: 'Iconic sneakers with a shell toe design and signature 3-Stripes branding.',
      },
      {
        name: 'Vans',
        description:
          'Skate-inspired sneakers with a suede and canvas upper and the Vans classic side stripe.',
      },
      {
        name: 'Air Force 1',
        description:
          'Legendary sneakers with a leather upper and Nike Air cushioning for all-day comfort.',
      },
      {
        name: 'Gazelle',
        description:
          'Vintage-inspired sneakers with a suede upper and contrasting 3-Stripes branding.',
      },
      {
        name: 'ReeBook',
        description:
          'Timeless sneakers with a soft leather upper and a die-cut EVA midsole for cushioning.',
      },
      {
        name: 'Blazer Mid',
        description:
          'Basketball-inspired sneakers with a suede or leather upper and a padded collar for ankle support.',
      },
      {
        name: 'Air Jordan 1',
        description: 'High-top sneakers with a leather upper and the iconic Jordan wings logo.',
      },
      {
        name: 'Puma Suede',
        description: 'Lifestyle sneakers with a suede upper and Puma branding for a sporty look.',
      },
      {
        name: 'Reebok Club C',
        description:
          'Classic sneakers with a soft leather upper and a low-cut design for a clean aesthetic.',
      },
      {
        name: 'Adidas NMD',
        description:
          'Modern sneakers with a sock-like construction and Boost cushioning for energy return.',
      },
      {
        name: 'New Balance 574',
        description:
          'Versatile sneakers with a suede and mesh upper and ENCAP cushioning for support.',
      },
      {
        name: 'Converse One Star',
        description:
          'Suede sneakers with a distinctive star logo and a comfortable OrthoLite insole.',
      },
      {
        name: 'Vans Authentic',
        description: 'Low-top sneakers with a durable canvas upper and a signature waffle outsole.',
      },
      {
        name: 'Nike Roshe Run',
        description:
          'Lightweight sneakers with a mesh upper and a cushioned Phylon midsole for comfort.',
      },
      {
        name: 'Adidas Ultraboost',
        description:
          'Performance sneakers with a Primeknit upper and responsive Boost cushioning for a responsive ride.',
      },
      {
        name: 'Jordan Retro 11',
        description:
          'Classic basketball sneakers with patent leather detailing and a carbon fiber shank for support.',
      },
      {
        name: 'Reebok Classic',
        description:
          'Timeless sneakers with a leather upper and a cushioned EVA midsole for all-day comfort.',
      },
    ];
    const SneakersimageUrls = [
      'https://www.highsnobiety.com/static-assets/thumbor/LRfEnNYFwP8xEEn558Wa0YZJsSo=/1200x720/www.highsnobiety.com/static-assets/wp-content/uploads/2021/10/12171047/nike-air-max-90-winter-variations-feature.jpg',
      'https://www.gluestore.com.au/cdn/shop/products/560845-20220916-_MG_8402_1600x.jpg?v=1663548339',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlyBVAk0ovwAO8UC06Y6TBTvefYn-aPFtmQ&usqp=CAU',
      'https://5.imimg.com/data5/YM/TL/MY-42622857/adidas-superstar-500x500.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFKbZGsYBHfFUs82MVJ1UtxWHPRcO0xF_HBsPK0E2QvDLZyZwHxSWYbCFKk9NQzDLTEo0&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQnuFVDUZkwoOo3UkwQE-Wg0Ua6X0MQxwQLiF7t8_PU6kIHS3R0xXvVThxpj5TA1YTjg&usqp=CAU',
      'https://images.asos-media.com/products/adidas-originals-gazelle-trainers-in-collegiate-green/203694687-1-collegiategreen?$n_750w$&wid=750&hei=750&fit=crop',
      'https://landaustore.co.uk/cdn/shop/products/reebok-mens-reebok-trainers-mens-classic-leather-black-black-66360_a3144278-bb1f-40b0-a671-c5b7c694dd42.jpg?v=1604011113',
      'https://images.stockx.com/images/Nike-Blazer-Mid-77-Vintage-White-Black-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=jpg&auto=compress&dpr=2&trim=color&updated_at=1606325720&q=75',
      'https://www.highsnobiety.com/static-assets/thumbor/YDXBIM0FcgQ4r-Dcporz2dYBHeQ=/1600x1141/www.highsnobiety.com/static-assets/wp-content/uploads/2022/09/23162637/air-jordan-1-black-white-panda-date-price.jpg',
      'https://www.80scasualclassics.co.uk/images/puma-suede-classic-trainers-navy-white-p591-115457_zoom.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XX0pCpS76LjGamB32NLiACbsa7SXY50_Gg&usqp=CAU',
      'https://i.ebayimg.com/images/g/52EAAOSwf8lipwfW/s-l1600.jpg',
      'https://img.mytheresa.com/1094/1236/66/jpeg/catalog/product/06/P00758513.jpg',
      'https://pavement.co.nz/cdn/shop/files/converse-one-star-pro-suede-low-blackblackwhite-alt1-pavement_1024x1024.jpg?v=1684805988',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRphcd_BwEM0k1SvKIVlWSu-ANsvbu2aYYQ&usqp=CAU',
      'https://assets-global.website-files.com/64a86d230c3e07ee19a9191b/64a86d270c3e07ee19aa39da_Untitled%20(1070%20%C3%97%20760%20px)%20(67).png',
      'https://cdn.fleetfeet.com/assets/adidasultraboost.jpeg/dynamic:1-aspect:2.4-fit:cover-strategy:entropy/adidasultraboost--1440.jpg',
      'https://i.ebayimg.com/00/s/MTAwMFgxNDI1/z/ILAAAOSwSpNf07I3/$_58.png',
      'https://reebok.bynder.com/transform/391ec920-9a7a-43aa-b9f5-cb5aa9bcc323/100038884_SLC_eCom-tif?io=transform:scale,width:600',
    ];
    for (let i = 0; i < shoeSneakers.length; i++) {
      const product = shoeSneakers[i];
      const productName = product.name;
      const productDescription = product.description;
      // Check if the product name already exists
      const existingProduct = products.find((pro) => pro.name === productName);

      // If the product name already exists, generate a new name
      if (existingProduct) {
        i--;
        continue;
      }

      // Add the new product to the array
      products.push({
        name: productName,
        description: productDescription,
        category_id: 11,
        vendor_id: 6,
        image: SneakersimageUrls[i].split(','),
        price: generateRandomPrice(),
        quantity: 50,
        stock: 'In Stock',
        expiredAt: '2025-04-23',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
