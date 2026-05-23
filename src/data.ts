import { Product, Review } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "salted-brownie",
    name: "Signature Salted Fudgy Brownie",
    price: 12.50,
    description: "A deep, decadent 70% cacao brownie topped with flakes of Maldon sea salt for the perfect balance of sweet and savory.",
    category: "Brownies",
    tags: ["Gluten-Free"],
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz_SQ1frnKZFi-_CilPwXjnVKFAmPF_8Lm_FrlJ5_GfQpXMexSRECweaFja7JUlX3fL_3kO0ixIALIr_2X79WhbYP02Gh89OlIyeYxCO0n_YkJKmDxx_TNY-ThKRSN_nQeaOUkwWODttGvIHM0J-50Ymjz-2vnnoQb8C7QY9BlbfHMfbOoa9ZtUHW_JEkooOkpkiHQTMKvQwM9iCvwF1sGbOTQtte70LIISCIZdMyXfZNQnweDf46dyhEhTY13NJepi74CmE2nAVdt",
    sensoryProfile: {
      description: "As you pull apart the fragile, paper-thin crinkle crust, a cloud of toasted hazelnut and deep bourbon vanilla escapes. The first bite reveals a dense, velvet interior—intense and dark, yet balanced by the sharp, occasional spark of sea salt crystals that dance across the palate. It is not just a dessert; it is a meticulously composed symphony of texture and temperature.",
      characteristics: [
        { label: "Single Origin", icon: "spa" },
        { label: "Sea Salt", icon: "set_meal" },
        { label: "Baked Daily", icon: "temp_preferences_custom" },
        { label: "Organic", icon: "potted_plant" }
      ],
      ingredients: "A2 European Butter, Ecuadorian 70% Dark Chocolate, Muscovado Sugar, Madagascar Bourbon Vanilla Bean, Organic Free-Range Eggs, Maldon Fleur de Sel."
    },
    pairs: ["espresso", "earl-grey"]
  },
  {
    id: "almond-croissant",
    name: "Almond Flake Croissant",
    price: 8.75,
    description: "Double-baked butter croissant filled with creamy almond frangipane and topped with toasted sliced almonds.",
    category: "Pastries",
    tags: ["Contains Nuts"],
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxq-TfTfILFNaNb1gApvRprED1MjJs_Sg5GmgsC7h6d2R5QJkEtQxYSsggnl_i6udF4_GnhJsO6Nu5T0i45dgk9MZhF5AAewjePVY4FImTKazGgj6Ftt6uL0SgMN6F5Y9Br6APyRVTDHTdLETTWOV0OnojYwj73LFZH--jsfHDLZzb-H0HCKhEcs8l_Qh24urDQITGfcooq3Cre8KONyONdpoRx9qeb1zBZn1jssfSwKIjYQLoSw1LP61zfjsqZT0cLoFd18QMNyj_",
    sensoryProfile: {
      description: "Golden, flaky, and double-baked to absolute perfection. Our signature 48-hour laminated dough embraces a velvety, rich almond frangipane core, topped with a cascade of oven-crisp almond slivers and sweet sugar dust. A warm scent of butter and toasted core nuts follows each bites.",
      characteristics: [
        { label: "Laminated Dough", icon: "layers" },
        { label: "Twice Baked", icon: "wb_sunny" },
        { label: "Baked Daily", icon: "timer" },
        { label: "Nut-Rich", icon: "cookie" }
      ],
      ingredients: "Heritage Flour, Grass-fed European Butter, Ground Almonds, Madagascar Vanilla Essence, Confectioner Organic Sugar, Free-Range Organic Eggs."
    },
    pairs: ["espresso", "earl-grey"]
  },
  {
    id: "velvet-brownie-shop",
    name: "Velvet Sea Salt Brownie",
    price: 6.50,
    description: "Deep dark cacao from Madagascar paired with fleur de sel. A balance of intense chocolate and delicate mineral crunch.",
    category: "Brownies",
    tags: ["Gluten-Free"],
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIzpkRHmy6dHZZD9Vn1VNwD1wTu5nEPe85F8vaM5PH_nVv3izkuPjBidJQ_FKLTpaCwiAAjadnYkxUZLqDdovxXlEirsLsPC9CVnApi95rzsbTzqnXkeFNnBVf6rdoI5qxRuz5LyCz5irBFbr46XW5qRvb5QF_BE6qblOxGfwwMAhPr6CBi8uDP2sHv36NBaU7Yh4GruDBBlJeJzfPIrAgf8RcEPoS05ujyI173pzCwrDa9cj5hmyT76SN0DEB6DGZUkfaHi3JtUS_",
    sensoryProfile: {
      description: "A denser, smaller individual treat packed with rich, dark chocolate intensity. The sprinkle of hand-harvested rock salt cuts through the sweetness and elevates the rich, earthy chocolate notes of single-origin Madagascar cocoa Beans.",
      characteristics: [
        { label: "Folk Salts", icon: "waves" },
        { label: "Fudgy Center", icon: "cake" },
        { label: "Rich Dairy", icon: "opacity" },
        { label: "Madagascar Cocoa", icon: "forest" }
      ],
      ingredients: "70% Single-origin Madagascar chocolate, European butter, cane sugar, range eggs, fleur de sel."
    },
    pairs: ["espresso"]
  },
  {
    id: "golden-croissant",
    name: "Golden Frangipane Croissant",
    price: 7.25,
    description: "Our signature 48-hour fermented dough, filled with sweet almond cream and double-baked to golden perfection.",
    category: "Pastries",
    tags: ["Nut-Free-Optional"],
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRU7Oy8tKSi4hfBuRKZHj7YFKPWkBhwGTX8bQYlRDLRf0z45_W7SWsYUHgH76XTdGAje12HSDgBvoU2Az22GgrCek8SSxvcdaCxv8heFWucH8-bkv67AndYuqky3HUoDYU0TfUns0EzLlDF2_hVBJBpoX2eHzquyFV4RtcUltZyJOhIFb7dwl8H6O5XtdxSkfSQr7XamR7u1RWOGd9jeFiRSzPkA5DU8xHntb656sYnzccszLZuqaW-_3xbT4BlqXI_Upa2L3Y6R5g",
    sensoryProfile: {
      description: "A sweet butter dough prepared over 2 full days, resulting in hundreds of hyper-thin golden layers. Filled with smooth homemade frangipane that dissolves blissfully on your tongue.",
      characteristics: [
        { label: "48-Hour Fold", icon: "auto_awesome" },
        { label: "Almond Frangipane", icon: "spa" },
        { label: "Crispy Layer", icon: "grain" },
        { label: "Craft Butter", icon: "egg" }
      ],
      ingredients: "Heritage wheat, raw cane sugar, whole almond meal, cultures, farm fresh butter, mountain spring saltwater."
    },
    pairs: ["earl-grey"]
  },
  {
    id: "pistachio-tart",
    name: "Sicilian Pistachio Tart",
    price: 12.00,
    description: "Silky pistachio ganache, roasted nut crumble, and a hint of citrus zest in a butter shortcrust.",
    category: "Cakes",
    tags: ["Limited Edition", "Contains Nuts"],
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUQbpr9M-P0gLRwnsO3pL0K5qmAYpNBAb96riBMq41raxyTbIWG5jxY4nQ10dYiLmB5_UCW1RBCZvSAXvi-sA5wh8qEb_C1mdD4j1xmJFs6rwTN-h-c7IhpNnKMnQPaLt656G1z6HOzg4LxpTOlm9xJbBzmkKs8euy3kQ7Z2WB5pGbnDGDPk7eP3FG4Q7q340PjJKvN-K23Qh8OT2sUtGRxhd0Ah6Iqecjt0lsyYKM2S1aWXbJcjdiIV9CnK6Bni7Mkm_puwGQrAmJ",
    sensoryProfile: {
      description: "An elegant, minimalist work of art. Featuring vibrant, stone-ground Sicilian pistachio paste blended into a velvety white chocolate ganache, set inside an incredibly crispy sweet butter shortcrust shell.",
      characteristics: [
        { label: "Sicilian Nuts", icon: "emerald" },
        { label: "Crispy Shell", icon: "cookie" },
        { label: "Citrus Spark", icon: "wb_sunny" },
        { label: "Bespoke Cut", icon: "design_services" }
      ],
      ingredients: "Sicilian Pistachios, White Chocolate, Heavy Cream, Citrus Zest, Wheat Flour, Organic Butter, Free-Range Eggs."
    },
    pairs: ["earl-grey"]
  },
  {
    id: "heritage-sourdough",
    name: "Heritage 72hr Sourdough",
    price: 9.50,
    description: "Wild-yeast fermented for three days for a complex tang and an incredibly crispy, charred crust.",
    category: "Artisan Sourdough",
    tags: ["Vegan"],
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzU9AH0qbKPxfmxtXj5IDMVOZsU9mxu8vCDcVDyERg_fQkF5pMfNgDDQtNQmUJd-Pa40Ub7fsexo14dtUtxajg86JyR1vtXE6g7F7kzF6D84u3rN-3OVlF-aMMIjK2cu0gGqhd2L4n5N2cYm0b5r-QTnnq2UDzRpN1fU77J6wjIPATo58UJYmyfgmfM-2Mt8jHAT4Fxtdkuw4aRQy4-Z0ZTyw1SSmSLzUI6BpNculAv-oGeOXS0G1Ti7BpJRDI1C7bShg-4qf0n18r",
    sensoryProfile: {
      description: "A masterpiece of wild fermentation. Crafted from ancient heritage grains sourced from organic heirloom producers. Hand-scored and baked on red-hot stone shelves to yield a perfect thick, amber, blistered crust and a wet, airy crumb.",
      characteristics: [
        { label: "72h Ferment", icon: "hourglass_empty" },
        { label: "Heritage Grains", icon: "🌾" },
        { label: "Hand-Scored", icon: "gesture" },
        { label: "Stone Baked", icon: "fireplace" }
      ],
      ingredients: "Stoneground Heritage Spelt, Heirloom Einkorn Wheat, Purified Mountain water, Sea Salt, Wild Sourdough Starter."
    },
    pairs: ["espresso"]
  },
  // Extra detailed items used in the checkout screen default bakery basket:
  {
    id: "pistachio-glazed-croissant",
    name: "Pistachio Glazed Croissant",
    price: 7.50,
    description: "Twice-baked almond filling and glazed with a glossy, stone-ground pistachio spread.",
    category: "Pastries",
    tags: ["Contains Nuts"],
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmQt-FSdI-m9Ib4-iBclBUbp4x0m4IfvsOJRPt73MEu9cRbhWUdFbwRSJK6fum9HH-AIgSjgof_ryY8QPbrFV4yW7dlDrJivPz9FuYRmGwJnzdD7LnvJt1FUlIUcH1oEtvjlZo68NRNubD3u57ai8m0fsXYCVpY5_nXhKF19Fwv7eq9fHkAFkMrJTpHld91AzTYcwKC8I-oioJunjZwxwxvqgv7tErK1FeHkFX7P0f1f3HVHaZ0k7BdATLpFH6Z2ulkqyfXxr1FB7g",
    sensoryProfile: {
      description: "Flaky, buttery, double-baked, loaded with custom green Sicilian pistachio cream and adorned with delicate nuts on a smooth glossy glaze.",
      characteristics: [
        { label: "Twice Baked", icon: "bolt" },
        { label: "Pistachio Dream", icon: "spa" }
      ],
      ingredients: "Grade-A European butter, Heritage raw flour, whole pistachio kernels, premium sugar glaze."
    }
  },
  {
    id: "velvet-dark-babka",
    name: "Velvet Dark Babka",
    price: 22.00,
    description: "Richly twisted with 70% Tanzanian cocoa, braided to perfection, presenting deep caramel and chocolate swirls in every slice.",
    category: "Cakes",
    tags: [],
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR42uThllg9ClHEhoylh4bLPmSdJ1oGLvNtYcIj07pPyOqtQ2umR42LRuGbrPzel3zV97rJJ7QFDyI6F3WM_9uNN8yc1aCFVMWIR7a_rFMYOwxkPU3OxiyjrV1a9ibE5Bj2JlX6-jAc7Zengxjx5SxyehnKcUdW945a4zeap906DKSpzyhCdIJSA4ECODI95NZelL2G_l8U5LGcZQHo44hjzLwAMRwXkR02yURu4DfWkpEn_MttRScAIJ6kK4YC028LqyNu2yYlVag",
    sensoryProfile: {
      description: "Intricately woven ribbons of buttery bread dough holding sweet, thick volcanic cacao spreads and organic dark chocolate chunks.",
      characteristics: [
        { label: "Ancient Twist", icon: "repeat" },
        { label: "Tanzanian Cocoa", icon: "terrain" }
      ],
      ingredients: "Flour, Tanzanian 70% Chocolate, cultured cream, natural honey, eggs, cinnamon glaze."
    }
  }
];

// Coffee items for Pairing section
export const COFFEE_ITEMS = [
  {
    id: "espresso",
    name: "Single Origin Espresso",
    price: 4.50,
    description: "Notes of plum and almond",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDLNuNB9triCz235AJlBdaoQ7-Qha6DdVrQp3g8WtC8M0eqgJ3qaTj_cSfYabPI8qRJXk6_oqbDJMKxs1mgfc-IeeOeNmFbtNmEg4Tq9T3UYIuisHopgTbGmKUp7XWUT42Dr2PpRieI-eF72HxhY-y5Vg9p7Zir8p_XgZ3nF8daZ_kC6ulEl8mdJDHrBCo9toGta0ClfleLbiZQ7dEbB89WPrTSzwj24A8PmeMNdjrCJlN4CX73J6qkjfRKr13mN7F-prOJ3gD87r3"
  },
  {
    id: "earl-grey",
    name: "Earl Grey Reserve",
    price: 6.00,
    description: "Bergamot and cornflower",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpLoxDjhI0uE65jhI6ipoxUuCvgJsBPZ-cz3bJ7e5xZsO0a1HWukIL5P_vdvn4dnAKj--hMQD8ogBwZ3Q-QqGanm_1zLCaeZc0UY484X2eDvR6YXPYc8OrXhKRD4oA5wT7_qNE6ZvT7Upj5xe7fLJGnamw8A3eFNSxmJxINAYZkuihp9bWDGl01OFmkyiI3F4n7_oFP59Povjzd112DsuhAZwijQ3annXJ7TMPE7IWyZQ8OxhyGWr4nz0KT9aChoZGuM4ksmZRFa5n"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Eleanor Vance",
    role: "Local Resident",
    rating: 5,
    comment: "The sourdough has a perfect crust and that tangy crumb I've been searching for. CraveLab is now my Saturday morning ritual.",
    avatarColor: "bg-amber-100"
  },
  {
    id: "rev2",
    name: "Marcus Thorne",
    role: "Food Critic",
    rating: 5,
    comment: "Their salted brownies are dangerous! I ordered a batch for my birthday and they were gone in minutes. Exceptional quality.",
    avatarColor: "bg-orange-100"
  },
  {
    id: "rev3",
    name: "Sarah Jenkins",
    role: "Designer",
    rating: 5,
    comment: "The experience from website to delivery was flawless. The pastries arrived still warm and smelled like a dream.",
    avatarColor: "bg-red-50"
  }
];

export const CATEGORIES = [
  {
    name: "Brownies",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0sZ2L8yuyNMQ3i0mr3Jtj7uKdnJrreoH4jA2uxbjECbosvcGQCBHtstb7Rm1Ad7PdpQnsWtiOOPapGHP0dHN16gX9n3cfcM_U-TqIBMO-GNpK_gUwKUs7eK5KJuKCT4_BRinv0UvV6IlAZDfekjujONpYBfAsHR6iKAe6ec4sSzDAyptWTkYVcMoOPxUZei_dJ_aRiqPOgZXrwG_FeSFM--owolzCk5pnHd81W5xVHZzMzHL4tfcU7rotJk5vaWU1cYaLRSoLG2o3"
  },
  {
    name: "Patties",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcxBEq0aii2bWsx-4KfOvocUjS_06SWlG-lA4YkW1zEpOm46bxZafug-E9WCOohsQs1OgqWe_WaDEwp64jXSWwRf_18p3TwH_laRxP9wsJVMReHp_C6iz1YhSf_3mQItGFfH8sWpOSxTnmrgmmOjFtliCh449SPaFvDsknytC5q0cLV0Euaj-H3Oewe42B0zGsDIylCzWVVn2SPMqFHb6-IU9gPaXOljijbtyqkdYp05A2EJ81OpcNCaKnsiw65RwE1LygSav1npFL"
  },
  {
    name: "Pastries",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS0IIfik9xWuxc0_fqKnLTe6cOCkIw_KbphOH1oZoj82DwpCkO9wLoidn1lhE_fKROngD4AUXNOQ5gZH9hbzSeFdF_vGvcZoQsbuK1LnSCvHU7I2RPuP2tY98GrdPxWwJHjvdglZnXMpOWHs_utrZ1GQAy_sBMzaCUSPsZzd2SkkTp5kDhEQs8Lekaa7v3aTz--9bDQI628iMpZOBE3Vo49S9GbQZSLS3TUuHgiF6Za4bUKavxKC41yrLNzAfxs_6KHqTWgmbqFwnp"
  },
  {
    name: "Cakes",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVWE9dTJNqLVUPgld2mFTXctfTDJltWjzFKQgwnvKWJjm68Ggq40qFxsi7piKV4LLDD2bUnCjkNnH07s6xbwA3E8xsxLuwZQVU7R4NjqkPiGcVfB6b5y2pUB-AAybLNmSi0IC7AvnacJwqit90DAWUO-s9j-I2ALFLYPu-qDNzi2edoFoOOr8DsstF0gi3pMvOuKY4fSJCpCKFSzzCNxm2qIfEl62Tq_u_lNFMI-69AXErMzK26Rwyscnnsw052BX_-ZV1n7-Fq_Ts"
  },
  {
    name: "Cookies",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlAO5pjPLq8NX2d4W8G0CRZ7pkTiXNZv6Ma4U79RTQUPqivRVXQ8pS8f1c0MAqpnhXXP9ZnU_mOTwNCuOiw3kkOUIQ5c5iww1b0X8CciT7I-QppMJUicOxv39HZQhVlTIyzVV0jns1orCJE4-PTkR8I5QIylwhlghfbHijQv4xUx3hkyC7kkpP_BGjIbyElYpmxM2CbQWmLRWMlop4V8_4t8SRJr5vpwse1YtIOwFI2opUJ_kgbpA3_taTKHxVtteUFP2amcXUFHi3"
  },
  {
    name: "Coffee",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_itF9NiMMUre8NrOrxpJNjJMEmzEvOPYwBuO8Hn_XYdWWy4tHNb9vWSpOznjO95ovJqE2UIuzy9XyK7HHODD622jOfeyA45bUsRSIJ4rqf9RGUmimd5if8PxZA9vgPk5lu4NWpFfFw9rqxeFB6bFiprEVmRtOj4xc5ZVJFD3wVJ06HNqtmBeTxI7aWCDsY_dgGbMyfnEPpNml1NWkDCFjRTuuENPyRgrpOkCQrQ822ySAJ4z3bhsF1nwA3BfmnLtgh1lVwTXA8qNT"
  }
];
