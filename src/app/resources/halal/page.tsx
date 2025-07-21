'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Search,
  Navigation,
  Award
} from 'lucide-react';


// Type definitions
interface HalalSpot {
  id: number;
  name: string;
  type: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  address: string;
  phone: string;
  hours: string;
  website: string | null;
  image: string;
  coordinates: { lat: number; lng: number };
  verified: boolean;
  description: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

const HalalFoodMap = () => {
  const [selectedSpot, setSelectedSpot] = useState<HalalSpot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  // Sample halal food spots data - Easy for executives to update!
  const halalSpots: HalalSpot[] = [
    {
        "id": 1,
        "name": "Limestone Kabob House",
        "type": "restaurant",
        "cuisine": "Afghan, Pakistani, Indian, Middle Eastern, Moroccan",
        "rating": 4.4,
        "priceRange": "$$",
        "address": "251 Princess St, Kingston, ON K7L 1B5",
        "phone": "(613) 634-9600",
        "hours": "4:00 P.M - 9:00 P.M",
        "website": "https://www.limestonekabob.com",
        "image": "https://www.fbgcdn.com/pictures/e2676215-182b-4fbf-a5f0-b12b523ca3ba.jpg",
        "coordinates": {
          "lat": 44.2575027,
          "lng": -76.5703786
        },
        "verified": true,
        "description": "Limestone Kabob House - a fusion restaurant in the heart of Kingston, Ontario. Enjoy a nice dinner with your family, friends. Contemporary style seating , beautiful tapestry and authentic homemade food creates a relaxing atmosphere."
      },
      {
        "id": 2,
        "name": "Shawarma Damascus Kingston",
        "type": "restaurant",
        "cuisine": "Syrian, and Lebanese",
        "rating": 4.7,
        "priceRange": "$",
        "address": "101 Dalton Ave B8, Kingston, ON K7K 0C4",
        "phone": "(613) 541-1222",
        "hours": "11:00 A.M - 8:00 P.M (9:00 P.M Friday)",
        "website": "https://shawarmadamascuskingston.ca/",
        "image": "https://shawarmadamascuskingston.ca/wp-content/uploads/2023/09/shawarmadamascuskingston-mix-chicken-or-beef-family.webp",
        "coordinates": {
          "lat": 44.2684492,
          "lng": -76.5036196,
        },
        "verified": true,
        "description": "Shawarma Damascus is a family‑run eatery at 101 Dalton Ave in Kingston, specializing in authentic Syrian and Lebanese shawarma. We serve marinated spit‑roasted cuts of meat (chicken, beef, lamb) wrapped in fresh pita or served as hearty platters with vibrant veggies, pickles, and flavorful sauces. Ideal for casual meals, group take‑out, or dine‑in, with large portions, warm hospitality, and affordable prices."
      },
      {
        "id": 3,
        "name": "Dingaling's Chicken Wings",
        "type": "restaurant",
        "cuisine": "American/Canadian casual",
        "rating": 4.1,
        "priceRange": "$$",
        "address": "2511 Princess St, Kingston, ON K7M 7N2",
        "phone": "(613) 634-0444",
        "hours": "11:00 A.M - 3:00 A.M (Varies)",
        "website": "https://dingalings.ca/",
        "image": "https://i0.wp.com/dingalings.ca/wp-content/uploads/bb-plugin/cache/PHOTO-2021-10-14-00-19-46-square.jpg?w=1200&ssl=1",
        "coordinates": {
          "lat": 44.2578197,
          "lng": -76.5676094,
        },
        "verified": true,
        "description": "Dingaling’s Chicken Wings serves fresh, homestyle battered wings in a wide variety of bold sauces—from sweet to fiery. Perfect for casual dining, group meals, or take-out, our menu includes sandwiches, nachos, and classic sides like mac-and-cheese bites and jalapeño poppers. Great for any group size or occasion, with friendly service and a cozy atmosphere."
      },
      {
        "id": 4,
        "name": "Kebab44",
        "type": "restaurant",
        "cuisine": "Mediterranean / Middle‑Eastern grill",
        "rating": 4.8,
        "priceRange": "$$",
        "address": "1117 Midland Ave Unit 2, Kingston, ON K7P 2X8",
        "phone": "(613) 384-8222",
        "hours": "11:00 A.M - 10:00 P.M",
        "website": "https://kebab44.ca/",
        "image": "https://kebab44.ca/cdn/shop/files/WhatsApp_Image_2024-07-11_at_1.54.42_AM.jpg?v=1720645301&width=600",
        "coordinates": {
          "lat": 44.2640654,
          "lng": -76.5777643,
        },
        "verified": true,
        "description": "Kebab44 brings a bold taste of the Mediterranean to Kingston with freshly grilled kebabs, shawarma, and vibrant sides. Inspired by authentic recipes and rich spices, our menu is packed with flavour—from savoury wraps and rice plates to crispy falafel and creamy hummus. Whether you're dining in, grabbing take-out, or feeding a group, Kebab44 offers warm hospitality, generous portions, and a cozy, welcoming atmosphere—perfect for any occasion."
      },
    {
        "id": 5,
        "name": "Manoosheh",
        "type": "restaurant",
        "cuisine": "Lebanese",
        "rating": 4.9,
        "priceRange": "$",
        "address": "163 Division St, Kingston, ON K7L 3M7",
        "phone": "(613) 767-1111",
        "hours": "9:30 A.M - 10:00 P.M",
        "website": "https://www.manoosheh.ca/",
        "image": "https://5580198897d57ebe730e.cdn6.editmysite.com/uploads/b/5580198897d57ebe730e7f9bb10f9d7c3cb869679fa2344f6a07aa450980aa78/post%202_1681142119.jpg?width=2400&optimize=medium",
        "coordinates": {
            "lat": 44.2328171,
            "lng": -76.4927682
        },
        "verified": true,
        "description": "Manoosheh is a Lebanese restaurant in Kingston, ON, offering authentic flatbreads (Manaeesh) and other traditional dishes. They are known for their fresh ingredients and flavorful food, including Muhammara, Labneh wraps, and hummus."
    },
    {
        "id": 6,
        "name": "MightyBird",
        "type": "restaurant",
        "cuisine": "American/Canadian casual, Chicken",
        "rating": 4.8,
        "priceRange": "$$",
        "address": "764 Gardiners Rd Unit F001-A, Kingston, ON, K7M 3X9",
        "phone": "(613) 767-0731",
        "hours": "11:00 AM to 09:00 PM (Mon-Thu, Sun), 11:00 AM to 10:00 PM (Fri-Sat)",
        "website": "https://mightybird.ca/",
        "image": "https://tb-static.uber.com/prod/image-proc/processed_images/4e359b99aeaeb83760f78940805d93e1/30be7d11a3ed6f6183354d1933fbb6c7.jpeg",
        "coordinates": {
            "lat": 44.2488147,
            "lng": -76.5702374
        },
        "verified": true,
        "description": "MightyBird is a chicken restaurant in Kingston, ON, specializing in crispy chicken sandwiches, tenders, and waffles. They offer a variety of sauces and sides, including dirty fries and milkshakes."
    },
    {
        "id": 7,
        "name": "Osmow’s Shawarma",
        "type": "restaurant",
        "cuisine": "Mediterranean",
        "rating": 3.8,
        "priceRange": "$",
        "address": "339 Princess St, Kingston, ON, K7L 1B7",
        "phone": "(613) 766-4659",
        "hours": "11:00 AM - 3:00 AM (Mon-Sun)",
        "website": "https://osmows.com/",
        "image": "https://osmows.com/wp-content/uploads/2021/11/Overhead_hero19413.jpg",
        "coordinates": {
            "lat": 44.2489119,
            "lng": -76.650063
        },
        "verified": true,
        "description": "Osmow's Shawarma on Princess Street is a Mediterranean restaurant known for its chicken shawarma, falafel, and other Middle Eastern staples. They offer wraps, plates, and poutines with their signature sauces."
    },
    {
        "id": 8,
        "name": "Osmow’s Shawarma",
        "type": "restaurant",
        "cuisine": "Mediterranean",
        "rating": 4.2,
        "priceRange": "$",
        "address": "656 Gardiners Rd Unit 20B, Kingston, ON, K7M 3X9",
        "phone": "(613) 384-0656",
        "hours": "11:00 AM - 11:00 PM (Mon-Wed, Sun), 11:00 AM - 1:00 AM (Thu-Sat)",
        "website": "https://osmows.com/",
        "image": "https://osmows.com/wp-content/uploads/2023/04/Desktop-Banner.jpg",
        "coordinates": {
            "lat": 44.2489119,
            "lng": -76.6500636
        },
        "verified": true,
        "description": "This Osmow's Shawarma location on Gardiners Road offers the same modern Mediterranean cuisine as its sister stores. They serve a variety of shawarma options, including chicken, beef, and lamb, as well as falafel and poutine."
    },
    {
        "id": 9,
        "name": "Shelby’s Shawarma",
        "type": "restaurant",
        "cuisine": "Middle Eastern",
        "rating": 4.7,
        "priceRange": "$$",
        "address": "575 Princess St, Kingston, ON, K7L 0G7",
        "phone": "(613) 344-2075",
        "hours": "11:00 AM to 9:00 PM (Mon-Sun)",
        "website": "https://shelbys.ca/",
        "image": "https://display.blogto.com/articles/2024316-shelbys-shawarma.jpg",
        "coordinates": {
            "lat": 44.2362152,
            "lng": -76.5178403
        },
        "verified": true,
        "description": "Shelby's Legendary Shawarma on Princess Street is a popular spot for Middle Eastern food. They are known for their generous portions and unique creations like the Shelby's Wrap and shawarma poutine. They also offer traditional shawarma bowls and wraps."
    },
    {
        "id": 10,
        "name": "Shawarma Dubai",
        "type": "restaurant",
        "cuisine": "Middle Eastern",
        "rating": 4.8,
        "priceRange": "$",
        "address": "208 Division St, Kingston, ON K7K 3Z1",
        "phone": "(613) 531-7778",
        "hours": "11 a.m.–12 a.m. (Mon-Sun), except Fri is 12 p.m.–12 a.m.",
        "website": "",
        "image": "https://www.timeoutdubai.com/cloud/timeoutdubai/2023/01/13/Late-night-shawarma-at-Allo-Beirut.jpg",
        "coordinates": {
            "lat": 44.2342596,
            "lng": -76.4960007
        },
        "verified": true,
        "description": "Shawarma Dubai is a family-run Middle Eastern restaurant in Kingston, known for its fresh and flavorful shawarma. They offer generous portions of chicken and beef shawarma, as well as platters and family deals."
    },
    {
        "id": 11,
        "name": "Dr. Shawarma & Curries",
        "type": "restaurant",
        "cuisine": "Indian, Middle Eastern",
        "rating": 3.8,
        "priceRange": "$$",
        "address": "383 Princess St, Kingston, ON, K7L 1B9",
        "phone": "(613) 877-9770",
        "hours": "11:00 AM - 1:00 AM (Mon-Thu, Sun), 11:00 AM - 3:00 AM (Fri-Sat)",
        "website": "https://www.drshawarmacanada.com/",
        "image": "https://tb-static.uber.com/prod/image-proc/processed_images/feff419ecfd87424d0c7f463914cb952/9b3aae4cf90f897799a5ed357d60e09d.jpeg",
        "coordinates": {
            "lat": 44.2331313,
            "lng": -76.4938621
        },
        "verified": true,
        "description": "Dr. Shawarma & Curries is a women-owned restaurant in Kingston that offers a fusion of South Asian and Middle Eastern cuisine. They serve a variety of shawarmas, curries, biryanis, and other dishes. Customers can customize the spice level of their food."
    },
    {
        "id": 12,
        "name": "Shawarma El Mina",
        "type": "restaurant",
        "cuisine": "Middle Eastern, Lebanese",
        "rating": 4.7,
        "priceRange": "$$",
        "address": "1759 Bath Rd, Kingston, ON, K7M 4Y3",
        "phone": "(613) 776-9997",
        "hours": "11:00 AM - 8:00 PM (Mon-Sun), except Fri is 11:00 AM - 9:00 PM",
        "website": "https://shawarmaelmina.com/",
        "image": "https://www.elmina.ca/wp-content/uploads/sites/72/2022/07/274774883_3026838584233035_2703289771940462282_n.jpg",
        "coordinates": {
            "lat": 44.2372353,
            "lng": -76.5776249
        },
        "verified": true,
        "description": "Shawarma El Mina is a Middle Eastern restaurant in Kingston that specializes in authentic shawarma. They offer a variety of platters, wraps, and family deals with chicken, beef, and lamb options. They are also known for their fresh ingredients and generous portions."
    },
    {
        "id": 13,
        "name": "Pita Land Shawarma",
        "type": "restaurant",
        "cuisine": "Middle Eastern",
        "rating": 4.0,
        "priceRange": "$$",
        "address": "759 Bayridge Dr, Kingston, ON, K7P 2P1",
        "phone": "(613) 384-1233",
        "hours": "11:00 AM and closes at 9:00 PM",
        "website": "https://pitaland.ca/pita-land-kingston/",
        "image": "https://pitaland.ca/wp-content/uploads/2021/11/Pita-Land-Fries.jpg",
        "coordinates": {
            "lat": 43.8921854,
            "lng": -79.5085661
        },
        "verified": true,
        "description": "Pita Land Shawarma is a restaurant in Kingston that has been serving Mideast cuisine since 2003. They offer a wide variety of pitas, shawarma, and other Middle Eastern dishes. They are known for their fresh and healthy food."
    },
    {
        "id": 14,
        "name": "Naan Stop Express",
        "type": "restaurant",
        "cuisine": "Indian, Pakistani",
        "rating": 4.7,
        "priceRange": "$",
        "address": "331 Bath Rd, C, Kingston, ON, K7M 2X6",
        "phone": "(613) 766-3312",
        "hours": "11:00 A.M - 9:00 P.M",
        "website": "",
        "image": "https://tb-static.uber.com/prod/image-proc/processed_images/4307871ba167cbceaae5b7768d314994/fb86662148be855d931b37d6c1e5fcbe.jpeg",
        "coordinates": {
            "lat": 44.240236,
            "lng": -76.5299849
        },
        "verified": true,
        "description": "Naan Stop Express is a family-run Pakistani restaurant in Kingston. They are known for their authentic dishes, such as butter chicken, chapli kabab, and fresh naan. They offer a cozy and welcoming atmosphere."
    },
    {
        "id": 15,
        "name": "Pasha",
        "type": "Bakery",
        "cuisine": "Turkish, Middle Eastern",
        "rating": 4.5,
        "priceRange": "$",
        "address": "61 Division St, Kingston, ON, K7L 3L8",
        "phone": "(613) 542-8282",
        "hours": "9:00 A.M - 10:00 P.M",
        "website": "http://pashakingston.com/",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHl_RCFyzYmTkfy3Ci8gOHP86Du0Vmpy2QpA&s",
        "coordinates": {
            "lat": 44.22941,
            "lng": -76.48625
        },
        "verified": true,
        "description": "Pasha is a Turkish restaurant in Kingston that serves a variety of Middle Eastern dishes, including shawarma, kababs, and baklava. They are also known for their fresh-baked goods, such as simit and pide. The restaurant has a professional and friendly staff."
    },
    {
        "id": 16,
        "name": "Tahini’s",
        "type": "restaurant",
        "cuisine": "Middle Eastern",
        "rating": 4.6,
        "priceRange": "$$",
        "address": "320 Princess St, Kingston, ON, K7L 1B6",
        "phone": "(343) 344-4088",
        "hours": "10:00 A.M - 1:00 A.M",
        "website": "https://tahinis.com/",
        "image": "https://tb-static.uber.com/prod/image-proc/processed_images/90bd69414cd0e9f89ce646b5d5043419/30be7d11a3ed6f6183354d1933fbb6c7.jpeg",
        "coordinates": {
            "lat": 44.2325036,
            "lng": -76.4920465
        },
        "verified": true,
        "description": "Tahini's is a Middle Eastern restaurant on Princess Street that offers a modern twist on classic dishes. They are known for their fusion shawarmas, such as the Jamaican Jerk and Butter Chicken wraps. They also serve traditional bowls, poutines, and a variety of appetizers."
    },
    {
        "id": 17,
        "name": "House Of Donair & Shawarma",
        "type": "restaurant",
        "cuisine": "Mediterranean, Lebanese",
        "rating": 4.3,
        "priceRange": "$",
        "address": "394 Princess St #5, Kingston, ON, K7L 1B8",
        "phone": "(613) 766-3373",
        "hours": "11:30 AM - 9:00 PM",
        "website": "https://houseofdonair.ca/",
        "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfa8kySSqSZ1OzWqehDmFefFqB_EGF0Ih_weVXaXJMke188Ij2acKfcOWT08zOqeXJChbeMUfNBXD31fCckNJ6Y1Is51ORd5R77eJTW5wFXY5DXEuubyQs5EubPO8b29ZaQwbkuH-DXk06HM9nX5O8iVoL2AyRptvPW5Yq67EIUzaXOSnNZ7ryg_Yzsw/s16000/House%20of%20Donair_Kingston_Ontario.jpg",
        "coordinates": {
            "lat": 44.2326424,
            "lng": -76.5283908
        },
        "verified": true,
        "description": "House of Donair & Shawarma is a family-run business that serves authentic Mediterranean and Lebanese cuisine. They specialize in donair and shawarma, offering a variety of pitas, plates, and family meals. They also have unique items like donair poutine and pizza."
    },
    {
        "id": 18,
        "name": "House of Donair",
        "type": "restaurant",
        "cuisine": "Mediterranean, Lebanese",
        "rating": 4.6,
        "priceRange": "$",
        "address": "1755 Bath Rd, Kingston, ON, K7M 4Y1",
        "phone": "(613) 634-6160",
        "hours": "11:00 A.M - 9:00 P.M",
        "website": "https://houseofdonair.ca/",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRE15SAmjOy20KrjH3amMeDB3jlGKGiyEINw&s",
        "coordinates": {
            "lat": 44.24153,
            "lng": -76.5781
        },
        "verified": true,
        "description": "House of Donair on Bath Road is another location of the family-run restaurant, serving the Kingston community since 2004. They are known for their authentic donairs and shawarmas, made with fresh, homemade ingredients. They offer dine-in, takeout, and delivery services."
    },
    {
        "id": 19,
        "name": "Villa Madina (TEMPORARILY CLOSED)",
        "type": "restaurant",
        "cuisine": "Mediterranean, Middle Eastern",
        "rating": 4.6,
        "priceRange": "$$",
        "address": "945 Gardiners Rd Building B, Unit 1, Kingston, ON, K7M 7H4",
        "phone": "(613) 389-6662",
        "hours": "10 AM - 8 PM (Mon-Fri), 10 AM - 6 PM (Sat), 11 AM - 5 PM (Sun)",
        "website": "https://villamadina.com/",
        "image": "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/8e55f7d2-3ce3-41f9-861f-cb6ca0824934.jpg",
        "coordinates": {
            "lat": 44.2563468,
            "lng": -76.5747459
        },
        "verified": true,
        "description": "Villa Madina, located in the Cataraqui Centre, has been serving Mediterranean and Middle Eastern cuisine for over 19 years. They offer a variety of shawarma options, including plates, sandwiches, salads, and poutines. They are known for their flavorful shawarma and friendly service."
    },
    {
        "id": 20,
        "name": "Hakka Horizon",
        "type": "restaurant",
        "cuisine": "Indo-Chinese, Thai, Nepalese",
        "rating": 4.4,
        "priceRange": "$$",
        "address": "304 Bagot St, Kingston, ON K7K 3B4",
        "phone": "(613) 542-4258",
        "hours": "11am to 11pm (Mon, Wed-Sun), Closed Tue",
        "website": "https://hakkahorizon.com/",
        "image": "https://tb-static.uber.com/prod/image-proc/processed_images/d6c4b2bf5bf94e58c4a51a4d63452bed/30be7d11a3ed6f6183354d1933fbb6c7.jpeg",
        "coordinates": {
            "lat": 44.2323838,
            "lng": -76.5026956
        },
        "verified": true,
        "description": "Hakka Horizon offers a fusion of Indo-Chinese, Thai, and Nepalese cuisine. They are known for their flavorful Hakka dishes, momos (dumplings), and curries. The restaurant has a cozy and friendly atmosphere."
    },
    {
        "id": 21,
        "name": "Mary Brown’s Chicken",
        "type": "restaurant",
        "cuisine": "Fried Chicken, Canadian",
        "rating": 4.5,
        "priceRange": "$$",
        "address": "2815 Princess St, Unit 7, Kingston, ON, K7P 2X2",
        "phone": "(613) 389-7878",
        "hours": "11:00 AM - 10:00 PM (Mon-Sun)",
        "website": "https://marybrowns.com/",
        "image": "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/c8d6f869-cfd4-4c25-bf43-313f0b7626a1.jpg",
        "coordinates": {
            "lat": 44.2590813,
            "lng": -76.6016017
        },
        "verified": true,
        "description": "Mary Brown's Chicken is a Canadian fast-food chain that is famous for its fried chicken and taters. They use fresh, Grade A chicken and have a signature recipe. The Kingston location is known for its friendly service and clean environment."
    },
    {
        "id": 22,
        "name": "Popeyes Louisiana Kitchen",
        "type": "restaurant",
        "cuisine": "Fried Chicken, Cajun, American",
        "rating": 3.7,
        "priceRange": "$$",
        "address": "1046 Princess St, Unit C5, Kingston, ON, K7L 1H2",
        "phone": "(613) 542-2020",
        "hours": "10:30 a.m. - 11:00 p.m. (Mon-Sun)",
        "website": "https://www.popeyes.com/",
        "image": "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/1896b9dd-17b7-4cf3-96e5-d09602a54de5.jpg",
        "coordinates": {
            "lat": 44.2591895,
            "lng": -76.6737031
        },
        "verified": true,
        "description": "Popeyes Louisiana Kitchen is a global fast-food chain that specializes in New Orleans-style fried chicken. Their menu features spicy chicken, tenders, shrimp, and other regional items. The Kingston location offers both dine-in and delivery services."
    },
    {
        "id": 23,
        "name": "Meltwich Food Co",
        "type": "restaurant",
        "cuisine": "American, Sandwiches",
        "rating": 4.6,
        "priceRange": "$$",
        "address": "495 Princess St Unit A, Kingston, ON, K7L 1C5",
        "phone": "(613) 331-3863",
        "hours": "11am-2am (Sun-Mon, Wed-Sat), 12pm-2am (Tue)",
        "website": "https://meltwich.ca/",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV54BLEYZ7NNzMuoXstXZqr6D64SEBLP1JcQ&s",
        "coordinates": {
            "lat": 44.2328125,
            "lng": -79.2313468
        },
        "verified": true,
        "description": "Meltwich Food Co. is a restaurant that specializes in gourmet grilled cheese sandwiches. They also offer a variety of burgers, poutines, and Philly cheesesteaks. The Kingston location has a modern and inviting atmosphere."
    }
]

  const filteredSpots = halalSpots.filter((spot) => {
    const q = searchQuery.toLowerCase();
    return (
      spot.name.toLowerCase().includes(q) ||
      spot.cuisine.toLowerCase().includes(q)
    );
  });

  const getDirections = (spot: HalalSpot) => {
  const { lat, lng } = spot.coordinates;
  let url = `https://maps.google.com/maps?daddr=${lat},${lng} (${encodeURIComponent(spot.address)})`;
  if (userLocation) {
    // Use "saddr" param to set start point
    url += `&saddr=${userLocation.lat},${userLocation.lng}`;
  }
  window.open(url, "_blank");
};


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }),
        () => {
          console.log("Location access denied");
        }
      );
    }
  }, []);

  const isSearching = searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-amber-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/70 to-navy-900/50" />
        <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-amber-400/10 to-yellow-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-blue-600/15 to-slate-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <div className="relative pt-16 sm:pt-24 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl border border-amber-300/30">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-1">
                Halal Food Map
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-amber-200 font-medium">
                Kingston & Queen's University
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-40 bg-slate-900/98 backdrop-blur-xl border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-300 z-10" />
            <input
              type="text"
              placeholder="Search halal restaurants, groceries, cafés..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-amber-200/30 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all duration-300 text-slate-800 placeholder-slate-500 shadow-xl hover:bg-white text-base font-medium hover:shadow-2xl focus:shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-16 sm:pb-24">
        {!isSearching ? (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-400/20 p-5 sm:p-6 mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-amber-300 mb-4 sm:mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-100 text-sm sm:text-base">Total Locations</span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                      {halalSpots.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-100 text-sm sm:text-base">Avg Rating</span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                      {(
                        halalSpots.reduce((sum, s) => sum + s.rating, 0) /
                        halalSpots.length
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Spot Details */}
              {selectedSpot && (
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-400/20 overflow-hidden">
                  <div
                    className="h-36 sm:h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${selectedSpot.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-amber-300 flex-1 pr-2">
                        {selectedSpot.name}
                      </h3>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-amber-200">
                          {selectedSpot.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs sm:text-sm font-medium rounded-full">
                        {selectedSpot.cuisine}
                      </span>
                      <span className="text-amber-200 text-xs sm:text-sm font-medium">
                        {selectedSpot.priceRange}
                      </span>
                    </div>
                    <p className="text-amber-100 text-sm mb-4 sm:mb-6 leading-relaxed">
                      {selectedSpot.description}
                    </p>
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                          {selectedSpot.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-amber-100">
                          {selectedSpot.hours}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-amber-100">
                          {selectedSpot.phone}
                        </span>
                      </div>
                      {selectedSpot.website && (
                        <div className="flex items-center space-x-3">
                          <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <a
                            href={`https://${selectedSpot.website}`}
                            className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            {selectedSpot.website}
                          </a>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => getDirections(selectedSpot)}
                      className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:from-amber-300 hover:to-yellow-400 text-sm sm:text-base"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* All Spots List */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  All Halal Spots{" "}
                  <span className="text-base sm:text-lg lg:text-xl">({halalSpots.length})</span>
                </h2>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {halalSpots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-amber-400/20 overflow-hidden hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex flex-col sm:flex-row">
                        <div
                          className="w-full sm:w-40 md:w-48 h-32 sm:h-auto bg-cover bg-center relative flex-shrink-0"
                          style={{ backgroundImage: `url(${spot.image})` }}
                        >
                          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-all duration-200" />
                        </div>
                        <div className="flex-1 p-4 sm:p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-base sm:text-lg font-bold text-amber-300 group-hover:text-amber-200 transition-colors flex-1 pr-2">
                              {spot.name}
                            </h3>
                            <div className="flex items-center space-x-1 flex-shrink-0">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-semibold text-amber-200">
                                {spot.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs font-medium rounded-full">
                              {spot.cuisine}
                            </span>
                            <span className="text-amber-200 text-xs">
                              {spot.priceRange}
                            </span>
                          </div>
                          <p className="text-amber-100 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                            {spot.description}
                          </p>
                          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start text-amber-200 text-xs sm:text-sm flex-1 min-w-0">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 text-amber-400 mt-0.5" />
                              <span className="truncate leading-relaxed">{spot.address}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                getDirections(spot);
                              }}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:from-amber-300 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center sm:justify-start space-x-1 sm:ml-3 shadow-lg self-start sm:self-center"
                            >
                              <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Directions</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-2">
                Search Results{" "}
                <span className="text-base sm:text-lg lg:text-xl">({filteredSpots.length})</span>
              </h2>
              <p className="text-amber-200 text-sm sm:text-base">Results for "{searchQuery}"</p>
            </div>

            {filteredSpots.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/60 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-amber-400/20">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-300 mb-2">
                  No results found
                </h3>
                <p className="text-amber-200 text-sm sm:text-lg">
                  Try adjusting your search terms or browse all locations
                </p>
              </div>
            ) : (
              filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className="group cursor-pointer"
                >
                  <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-amber-400/20 overflow-hidden hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex flex-col sm:flex-row">
                      <div
                        className="w-full sm:w-40 md:w-48 h-32 sm:h-auto bg-cover bg-center relative flex-shrink-0"
                        style={{ backgroundImage: `url(${spot.image})` }}
                      >
                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-all duration-200" />
                      </div>
                      <div className="flex-1 p-4 sm:p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-amber-300 group-hover:text-amber-200 transition-colors flex-1 pr-2">
                            {spot.name}
                          </h3>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-semibold text-amber-200">
                              {spot.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs font-medium rounded-full">
                            {spot.cuisine}
                          </span>
                          <span className="text-amber-200 text-xs">
                            {spot.priceRange}
                          </span>
                        </div>
                        <p className="text-amber-100 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                          {spot.description}
                        </p>
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-start text-amber-200 text-xs sm:text-sm">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 text-amber-400 mt-0.5" />
                            <span className="truncate leading-relaxed">{spot.address}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center text-amber-200 text-xs sm:text-sm">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-amber-400" />
                              <span>{spot.hours}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                getDirections(spot);
                              }}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:from-amber-300 hover:to-yellow-400 transition-all duration-200 flex items-center space-x-1 shadow-lg self-start"
                            >
                              <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Directions</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
    </div>
  );
};

export default HalalFoodMap;