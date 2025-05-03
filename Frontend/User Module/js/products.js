 const vivoProducts = [
  {
    id: "VIVO-SM-001",
    title: "Vivo X100 Pro",
    description: "Vivo X100 Pro with Snapdragon 8 Gen 2, 120Hz AMOLED Display.",
    originalPrice: 79999,
    sellingPrice: 74999,
    colors:[
        "#000000",
        "#FFFFFF",
        "linear-gradient(45deg, #1F1C2C, #928DAB)"
        
      ],
    sizes: {
      RAM: ["8GB", "12GB"],
      Storage: ["128GB", "256GB"],
      Processor: ["Snapdragon 8 Gen 2"]
    },
    specifications: {
      display: "6.78-inch AMOLED, 120Hz",
      battery: "5000mAh, 80W Fast Charging",
      camera: "50MP + 12MP + 8MP Triple Camera",
      os: "Funtouch OS based on Android 14"
    },
    mainImage: "../assets/product-images/product 4.jpeg",
    casualImages: [
      "https://example.com/vivo-x100-pro-1.jpg",
      "https://example.com/vivo-x100-pro-2.jpg"
    ],
    category: "Smartphones",
    rating: 2.7,
    reviews: 1280,
    stock: 0,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-002",
    title: "Vivo V27",
    description: "Vivo V27 with MediaTek Dimensity 920, 120Hz AMOLED Display.",
    originalPrice: 35999,
    sellingPrice: 32999,
    colors: ["#1E90FF", "#FFC0CB", "linear-gradient(45deg, #FF6B6B, #FFD700)"],
    sizes: {
      RAM: ["8GB", "12GB"],
      Storage: ["128GB", "256GB"],
      Processor: "MediaTek Dimensity 920"
    },
    specifications: {
      display: "6.78-inch AMOLED, 120Hz",
      battery: "4600mAh, 66W Fast Charging",
      camera: "50MP + 8MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 13"
    },
    mainImage: "../assets/product-images/product 1.jpeg",
    casualImages: [
      "https://example.com/vivo-v27-1.jpg",
      "https://example.com/vivo-v27-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.5,
    reviews: 1020,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-003",
    title: "Vivo Y100",
    description: "Vivo Y100 with MediaTek Dimensity 900, 90Hz AMOLED Display.",
    originalPrice: 24999,
    sellingPrice: 22999,
    colors: ["#8B0000", "#FFFFFF", "linear-gradient(45deg, #FF4500, #FFD700)"],
    sizes: {
      RAM: ["6GB", "8GB"],
      Storage: ["128GB"],
      Processor: "MediaTek Dimensity 900"
    },
    specifications: {
      display: "6.67-inch AMOLED, 90Hz",
      battery: "4500mAh, 44W Fast Charging",
      camera: "64MP + 8MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 12"
    },
    mainImage: "../assets/product-images/product 2.jpeg",
    casualImages: [
      "https://example.com/vivo-y100-1.jpg",
      "https://example.com/vivo-y100-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.4,
    reviews: 740,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-004",
    title: "Vivo X80 Pro",
    description: "Vivo X80 Pro with Snapdragon 8 Gen 1, 120Hz AMOLED Display.",
    originalPrice: 79999,
    sellingPrice: 75999,
    colors: ["#0000FF", "#228B22", "linear-gradient(45deg, #7B68EE, #FFD700)"],
    sizes: {
      RAM: ["12GB"],
      Storage: ["256GB"],
      Processor: "Snapdragon 8 Gen 1"
    },
    specifications: {
      display: "6.78-inch AMOLED, 120Hz",
      battery: "4700mAh, 80W Fast Charging",
      camera: "50MP + 48MP + 12MP + 8MP Quad Camera",
      os: "Funtouch OS based on Android 12"
    },
    mainImage: "../assets/product-images/product 3.jpeg",
    casualImages: [
      "https://example.com/vivo-x80-pro-1.jpg",
      "https://example.com/vivo-x80-pro-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.8,
    reviews: 1780,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-005",
    title: "Vivo T1 5G",
    description: "Vivo T1 5G with Snapdragon 695, 120Hz LCD Display.",
    originalPrice: 22999,
    sellingPrice: 20999,
    colors: ["#1E90FF", "#FF69B4", "linear-gradient(45deg, #FF6B6B, #FFD700)"],
    sizes: {
      RAM: ["6GB", "8GB"],
      Storage: ["128GB"],
      Processor: "Snapdragon 695"
    },
    specifications: {
      display: "6.58-inch LCD, 120Hz",
      battery: "5000mAh, 18W Fast Charging",
      camera: "50MP + 2MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 11"
    },
    mainImage: "https://example.com/vivo-t1-main.jpg",
    casualImages: [
      "https://example.com/vivo-t1-1.jpg",
      "https://example.com/vivo-t1-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.3,
    reviews: 920,
    stock: 10,
    warranty: "1 Year"
  },
  {
    id: "VIVO-SM-006",
    title: "Vivo Y36",
    description: "Vivo Y36 with Snapdragon 680 and 90Hz LCD display.",
    originalPrice: 18999,
    sellingPrice: 16999,
    colors: ["#FF4500", "#FF6347", "linear-gradient(45deg, #FF7F50, #FFD700)"],
    sizes: {
      RAM: ["6GB", "8GB"],
      Storage: ["128GB"],
      Processor: "Snapdragon 680"
    },
    specifications: {
      display: "6.58-inch LCD, 90Hz",
      battery: "5000mAh, 44W Fast Charging",
      camera: "50MP + 2MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 12"
    },
    mainImage: "https://example.com/vivo-y36-main.jpg",
    casualImages: [
      "https://example.com/vivo-y36-1.jpg",
      "https://example.com/vivo-y36-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.4,
    reviews: 820,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-007",
    title: "Vivo V25 Pro",
    description: "Vivo V25 Pro with MediaTek Dimensity 1300 and 120Hz AMOLED display.",
    originalPrice: 39999,
    sellingPrice: 36999,
    colors: ["#9370DB", "#4B0082", "linear-gradient(45deg, #8A2BE2, #7B68EE)"],
    sizes: {
      RAM: ["8GB", "12GB"],
      Storage: ["128GB", "256GB"],
      Processor: "MediaTek Dimensity 1300"
    },
    specifications: {
      display: "6.56-inch AMOLED, 120Hz",
      battery: "4830mAh, 66W Fast Charging",
      camera: "64MP + 12MP + 5MP Triple Camera",
      os: "Funtouch OS based on Android 13"
    },
    mainImage: "https://example.com/vivo-v25-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-v25-pro-1.jpg",
      "https://example.com/vivo-v25-pro-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.6,
    reviews: 1150,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-008",
    title: "Vivo T2",
    description: "Vivo T2 with Snapdragon 695 and 120Hz AMOLED display.",
    originalPrice: 24999,
    sellingPrice: 22999,
    colors: ["#00CED1", "#20B2AA", "linear-gradient(45deg, #48D1CC, #5F9EA0)"],
    sizes: {
      RAM: ["6GB", "8GB"],
      Storage: ["128GB"],
      Processor: "Snapdragon 695"
    },
    specifications: {
      display: "6.6-inch AMOLED, 120Hz",
      battery: "4500mAh, 44W Fast Charging",
      camera: "64MP + 8MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 12"
    },
    mainImage: "https://example.com/vivo-t2-main.jpg",
    casualImages: [
      "https://example.com/vivo-t2-1.jpg",
      "https://example.com/vivo-t2-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.5,
    reviews: 970,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-009",
    title: "Vivo Y55",
    description: "Vivo Y55 with Snapdragon 680 and 60Hz LCD display.",
    originalPrice: 16999,
    sellingPrice: 14999,
    colors: ["#FF4500", "#DC143C", "linear-gradient(45deg, #FF6347, #FF7F50)"],
    sizes: {
      RAM: ["4GB", "6GB"],
      Storage: ["128GB"],
      Processor: "Snapdragon 680"
    },
    specifications: {
      display: "6.44-inch LCD, 60Hz",
      battery: "5000mAh, 44W Fast Charging",
      camera: "50MP + 2MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 11"
    },
    mainImage: "https://example.com/vivo-y55-main.jpg",
    casualImages: [
      "https://example.com/vivo-y55-1.jpg",
      "https://example.com/vivo-y55-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.3,
    reviews: 630,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-010",
    title: "Vivo X70 Pro",
    description: "Vivo X70 Pro with MediaTek Dimensity 1200 and 120Hz AMOLED display.",
    originalPrice: 49999,
    sellingPrice: 45999,
    colors: ["#FFD700", "#FFA500", "linear-gradient(45deg, #FF4500, #FF8C00)"],
    sizes: {
      RAM: ["8GB", "12GB"],
      Storage: ["128GB", "256GB"],
      Processor: "MediaTek Dimensity 1200"
    },
    specifications: {
      display: "6.56-inch AMOLED, 120Hz",
      battery: "4450mAh, 55W Fast Charging",
      camera: "50MP + 12MP + 8MP + 2MP Quad Camera",
      os: "Funtouch OS based on Android 11"
    },
    mainImage: "https://example.com/vivo-x70-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-x70-pro-1.jpg",
      "https://example.com/vivo-x70-pro-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.7,
    reviews: 1350,
    stock: 10,
    warranty: "1 Year"
  },
  {
    id: "VIVO-SM-011",
    title: "Vivo Y33s",
    description: "Vivo Y33s with MediaTek Helio G80 and 60Hz IPS display.",
    originalPrice: 17999,
    sellingPrice: 15999,
    colors: ["#4682B4", "#5F9EA0", "linear-gradient(45deg, #1E90FF, #00CED1)"],
    sizes: {
      RAM: ["4GB", "6GB"],
      Storage: ["128GB"],
      Processor: "MediaTek Helio G80"
    },
    specifications: {
      display: "6.58-inch IPS LCD, 60Hz",
      battery: "5000mAh, 18W Fast Charging",
      camera: "50MP + 2MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 11"
    },
    mainImage: "https://example.com/vivo-y33s-main.jpg",
    casualImages: [
      "https://example.com/vivo-y33s-1.jpg",
      "https://example.com/vivo-y33s-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.2,
    reviews: 540,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-012",
    title: "Vivo V21",
    description: "Vivo V21 with MediaTek Dimensity 800U and 90Hz AMOLED display.",
    originalPrice: 32999,
    sellingPrice: 29999,
    colors: ["#8A2BE2", "#9932CC", "linear-gradient(45deg, #7B68EE, #6A5ACD)"],
    sizes: {
      RAM: ["8GB"],
      Storage: ["128GB", "256GB"],
      Processor: "MediaTek Dimensity 800U"
    },
    specifications: {
      display: "6.44-inch AMOLED, 90Hz",
      battery: "4000mAh, 33W Fast Charging",
      camera: "64MP + 8MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 11"
    },
    mainImage: "https://example.com/vivo-v21-main.jpg",
    casualImages: [
      "https://example.com/vivo-v21-1.jpg",
      "https://example.com/vivo-v21-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.5,
    reviews: 870,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-013",
    title: "Vivo Y53s",
    description: "Vivo Y53s with Snapdragon 480 and 60Hz LCD display.",
    originalPrice: 19999,
    sellingPrice: 17999,
    colors: ["#FF1493", "#FF69B4", "linear-gradient(45deg, #FF6B6B, #FF7F50)"],
    sizes: {
      RAM: ["6GB"],
      Storage: ["128GB"],
      Processor: "Snapdragon 480"
    },
    specifications: {
      display: "6.58-inch LCD, 60Hz",
      battery: "5000mAh, 33W Fast Charging",
      camera: "64MP + 2MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 11"
    },
    mainImage: "https://example.com/vivo-y53s-main.jpg",
    casualImages: [
      "https://example.com/vivo-y53s-1.jpg",
      "https://example.com/vivo-y53s-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.3,
    reviews: 640,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-014",
    title: "Vivo T1 Pro 5G",
    description: "Vivo T1 Pro 5G with Snapdragon 778G and 120Hz AMOLED display.",
    originalPrice: 28999,
    sellingPrice: 25999,
    colors: ["#00BFFF", "#1E90FF", "linear-gradient(45deg, #5F9EA0, #4682B4)"],
    sizes: {
      RAM: ["6GB", "8GB"],
      Storage: ["128GB"],
      Processor: "Snapdragon 778G"
    },
    specifications: {
      display: "6.58-inch AMOLED, 120Hz",
      battery: "4700mAh, 66W Fast Charging",
      camera: "64MP + 8MP + 2MP Triple Camera",
      os: "Funtouch OS based on Android 12"
    },
    mainImage: "https://example.com/vivo-t1-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-t1-pro-1.jpg",
      "https://example.com/vivo-t1-pro-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.6,
    reviews: 920,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SM-015",
    title: "Vivo X60 Pro",
    description: "Vivo X60 Pro with Snapdragon 870 and 120Hz AMOLED display.",
    originalPrice: 54999,
    sellingPrice: 49999,
    colors: ["#FFD700", "#FFA500", "linear-gradient(45deg, #FF4500, #FF8C00)"],
    sizes: {
      RAM: ["12GB"],
      Storage: ["256GB"],
      Processor: "Snapdragon 870"
    },
    specifications: {
      display: "6.56-inch AMOLED, 120Hz",
      battery: "4200mAh, 33W Fast Charging",
      camera: "48MP + 13MP + 8MP Triple Camera",
      os: "Funtouch OS based on Android 11"
    },
    mainImage: "https://example.com/vivo-x60-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-x60-pro-1.jpg",
      "https://example.com/vivo-x60-pro-2.jpg"
    ],
    category: "Smartphones",
    rating: 4.7,
    reviews: 1180,
    stock: 10,
    warranty: "1 Year"
  },
  
  
  
  // === Smartwatches ===
  {
    id: "VIVO-SW-001",
    title: "Vivo Watch 2",
    description: "Vivo Watch 2 with AMOLED Display and SpO2 Monitoring.",
    originalPrice: 15999,
    sellingPrice: 13999,
    colors: ["#000000", "#FFFFFF", "linear-gradient(45deg, #1F1C2C, #928DAB)"],
    sizes: {
      Dial: ["42mm", "46mm"],
      Strap: ["Silicone", "Leather"],
      Processor: "Apollo 4s"
    },
    specifications: {
      display: "1.43-inch AMOLED, 466 x 466 pixels",
      battery: "510mAh, up to 14 days battery life",
      features: [
        "Heart Rate Monitoring",
        "SpO2 Monitoring",
        "Sleep Tracking",
        "5 ATM Water Resistance"
      ],
      os: "Proprietary OS"
    },
    mainImage: "https://example.com/vivo-watch-2-main.jpg",
    casualImages: [
      "https://example.com/vivo-watch-2-1.jpg",
      "https://example.com/vivo-watch-2-2.jpg"
    ],
    category: "Smartwatches",
    rating: 4.6,
    reviews: 820,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SW-002",
    title: "Vivo Watch SE",
    description: "Vivo Watch SE with GPS and Long Battery Life.",
    originalPrice: 12999,
    sellingPrice: 10999,
    colors: ["#1E90FF", "#FFC0CB", "linear-gradient(45deg, #FF6B6B, #FFD700)"],
    sizes: {
      Dial: ["42mm"],
      Strap: ["Silicone"],
      Processor: "Apollo 3"
    },
    specifications: {
      display: "1.39-inch AMOLED, 454 x 454 pixels",
      battery: "460mAh, up to 12 days battery life",
      features: [
        "Heart Rate Monitoring",
        "Step Counting",
        "GPS",
        "Sleep Tracking"
      ],
      os: "Proprietary OS"
    },
    mainImage: "https://example.com/vivo-watch-se-main.jpg",
    casualImages: [
      "https://example.com/vivo-watch-se-1.jpg",
      "https://example.com/vivo-watch-se-2.jpg"
    ],
    category: "Smartwatches",
    rating: 4.4,
    reviews: 620,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SW-003",
    title: "Vivo Watch GT",
    description: "Vivo Watch GT with AMOLED Display and Sports Tracking.",
    originalPrice: 17999,
    sellingPrice: 15999,
    colors: ["#8A2BE2", "#9932CC", "linear-gradient(45deg, #7B68EE, #6A5ACD)"],
    sizes: {
      Dial: ["46mm"],
      Strap: ["Leather", "Metal"],
      Processor: "Snapdragon Wear 3100"
    },
    specifications: {
      display: "1.39-inch AMOLED, 454 x 454 pixels",
      battery: "500mAh, up to 15 days battery life",
      features: [
        "Heart Rate Monitoring",
        "Sports Tracking",
        "Step Counting",
        "5 ATM Water Resistance"
      ],
      os: "Wear OS"
    },
    mainImage: "https://example.com/vivo-watch-gt-main.jpg",
    casualImages: [
      "https://example.com/vivo-watch-gt-1.jpg",
      "https://example.com/vivo-watch-gt-2.jpg"
    ],
    category: "Smartwatches",
    rating: 4.7,
    reviews: 940,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SW-004",
    title: "Vivo Watch Fit",
    description: "Vivo Watch Fit with Lightweight Design and AMOLED Display.",
    originalPrice: 11999,
    sellingPrice: 9999,
    colors: ["#FF4500", "#FFD700", "linear-gradient(45deg, #FF6347, #FFA500)"],
    sizes: {
      Dial: ["40mm"],
      Strap: ["Silicone"],
      Processor: "Apollo 3"
    },
    specifications: {
      display: "1.55-inch AMOLED, 360 x 360 pixels",
      battery: "420mAh, up to 10 days battery life",
      features: [
        "Heart Rate Monitoring",
        "Step Counting",
        "Sleep Tracking",
        "Water Resistance"
      ],
      os: "Proprietary OS"
    },
    mainImage: "https://example.com/vivo-watch-fit-main.jpg",
    casualImages: [
      "https://example.com/vivo-watch-fit-1.jpg",
      "https://example.com/vivo-watch-fit-2.jpg"
    ],
    category: "Smartwatches",
    rating: 4.5,
    reviews: 580,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-SW-005",
    title: "Vivo Watch Sport",
    description: "Vivo Watch Sport with Advanced Fitness Tracking and GPS.",
    originalPrice: 19999,
    sellingPrice: 17999,
    colors: ["#228B22", "#32CD32", "linear-gradient(45deg, #2E8B57, #3CB371)"],
    sizes: {
      Dial: ["46mm"],
      Strap: ["Silicone", "Nylon"],
      Processor: "Snapdragon Wear 4100"
    },
    specifications: {
      display: "1.45-inch AMOLED, 466 x 466 pixels",
      battery: "520mAh, up to 16 days battery life",
      features: [
        "Heart Rate Monitoring",
        "Sports Tracking",
        "GPS",
        "Water Resistance"
      ],
      os: "Wear OS"
    },
    mainImage: "https://example.com/vivo-watch-sport-main.jpg",
    casualImages: [
      "https://example.com/vivo-watch-sport-1.jpg",
      "https://example.com/vivo-watch-sport-2.jpg"
    ],
    category: "Smartwatches",
    rating: 4.8,
    reviews: 1020,
    stock: 10,
    warranty: "1 Year"
  },
  // === Earbuds ===
  {
    id: "VIVO-EB-001",
    title: "Vivo TWS Neo",
    description: "Vivo TWS Neo with Bluetooth 5.2 and Deep Bass.",
    originalPrice: 5999,
    sellingPrice: 4999,
    colors: ["#FFFFFF", "#000000", "linear-gradient(45deg, #ADD8E6, #4682B4)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.2",
      Battery: "25 hours with case"
    },
    specifications: {
      drivers: "12mm Dynamic Drivers",
      mic: "Dual Mic with ENC",
      latency: "88ms Low Latency",
      features: [
        "Deep Bass",
        "Touch Controls",
        "IP54 Water Resistance",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-neo-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-neo-1.jpg",
      "https://example.com/vivo-tws-neo-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.5,
    reviews: 620,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-002",
    title: "Vivo TWS 2",
    description: "Vivo TWS 2 with Active Noise Cancellation and Low Latency.",
    originalPrice: 7999,
    sellingPrice: 6999,
    colors: ["#1E90FF", "#FFA500", "linear-gradient(45deg, #FF6347, #FF7F50)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.2",
      Battery: "30 hours with case"
    },
    specifications: {
      drivers: "14.2mm Drivers",
      mic: "Triple Mic with ENC",
      latency: "88ms Low Latency",
      features: [
        "Active Noise Cancellation",
        "Touch Controls",
        "IP54 Water Resistance",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-2-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-2-1.jpg",
      "https://example.com/vivo-tws-2-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.7,
    reviews: 720,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-003",
    title: "Vivo TWS Air",
    description: "Vivo TWS Air with AI Noise Cancellation and Lightweight Design.",
    originalPrice: 4999,
    sellingPrice: 4499,
    colors: ["#8A2BE2", "#9932CC", "linear-gradient(45deg, #7B68EE, #6A5ACD)"],
    sizes: {
      Type: "Semi-In-Ear",
      Bluetooth: "5.0",
      Battery: "20 hours with case"
    },
    specifications: {
      drivers: "11mm Drivers",
      mic: "Dual Mic with AI ENC",
      latency: "98ms Low Latency",
      features: [
        "AI Noise Cancellation",
        "Touch Controls",
        "IPX4 Water Resistance",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-air-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-air-1.jpg",
      "https://example.com/vivo-tws-air-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.4,
    reviews: 580,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-004",
    title: "Vivo TWS Pro",
    description: "Vivo TWS Pro with Hybrid ANC and HD Sound.",
    originalPrice: 9999,
    sellingPrice: 8999,
    colors: ["#FFD700", "#FFA500", "linear-gradient(45deg, #FF4500, #FF8C00)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.3",
      Battery: "32 hours with case"
    },
    specifications: {
      drivers: "13mm HD Drivers",
      mic: "Triple Mic with ENC",
      latency: "75ms Ultra Low Latency",
      features: [
        "Hybrid ANC",
        "Touch Controls",
        "IPX5 Water Resistance",
        "HD Sound"
      ]
    },
    mainImage: "https://example.com/vivo-tws-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-pro-1.jpg",
      "https://example.com/vivo-tws-pro-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.8,
    reviews: 860,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-005",
    title: "Vivo TWS Lite",
    description: "Vivo TWS Lite with High Bass and Comfortable Fit.",
    originalPrice: 3999,
    sellingPrice: 3499,
    colors: ["#228B22", "#32CD32", "linear-gradient(45deg, #2E8B57, #3CB371)"],
    sizes: {
      Type: "Semi-In-Ear",
      Bluetooth: "5.1",
      Battery: "18 hours with case"
    },
    specifications: {
      drivers: "10mm Drivers",
      mic: "Single Mic with ENC",
      latency: "95ms Low Latency",
      features: [
        "High Bass",
        "Touch Controls",
        "IPX4 Water Resistance",
        "Comfortable Fit"
      ]
    },
    mainImage: "https://example.com/vivo-tws-lite-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-lite-1.jpg",
      "https://example.com/vivo-tws-lite-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.3,
    reviews: 480,
    stock: 10,
    warranty: "1 Year"
  },
  
  
  // === Additional Earbuds ===
  {
    id: "VIVO-EB-006",
    title: "Vivo TWS Air Pro",
    description: "Vivo TWS Air Pro with ANC and Ultra Low Latency.",
    originalPrice: 8999,
    sellingPrice: 7999,
    colors: ["#FFD700", "#FF4500", "linear-gradient(45deg, #FF8C00, #FFA500)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.2",
      Battery: "28 hours with case"
    },
    specifications: {
      drivers: "12mm Drivers",
      mic: "Dual Mic with ENC",
      latency: "75ms Ultra Low Latency",
      features: [
        "Active Noise Cancellation",
        "Touch Controls",
        "IP54 Water Resistance",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-air-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-air-pro-1.jpg",
      "https://example.com/vivo-tws-air-pro-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.6,
    reviews: 680,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-007",
    title: "Vivo TWS Max",
    description: "Vivo TWS Max with Extended Battery Life and ENC.",
    originalPrice: 10999,
    sellingPrice: 9999,
    colors: ["#1E90FF", "#4682B4", "linear-gradient(45deg, #5F9EA0, #00CED1)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.3",
      Battery: "40 hours with case"
    },
    specifications: {
      drivers: "14mm Drivers",
      mic: "Triple Mic with ENC",
      latency: "70ms Ultra Low Latency",
      features: [
        "Extended Battery Life",
        "ENC",
        "IP55 Water Resistance",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-max-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-max-1.jpg",
      "https://example.com/vivo-tws-max-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.8,
    reviews: 720,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-008",
    title: "Vivo TWS Sports",
    description: "Vivo TWS Sports with Secure Fit and Water Resistance.",
    originalPrice: 7999,
    sellingPrice: 6999,
    colors: ["#32CD32", "#228B22", "linear-gradient(45deg, #2E8B57, #3CB371)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.1",
      Battery: "24 hours with case"
    },
    specifications: {
      drivers: "10mm Drivers",
      mic: "Dual Mic with ENC",
      latency: "85ms Low Latency",
      features: [
        "Secure Fit",
        "Water Resistance",
        "Auto Connect",
        "High Bass"
      ]
    },
    mainImage: "https://example.com/vivo-tws-sports-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-sports-1.jpg",
      "https://example.com/vivo-tws-sports-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.5,
    reviews: 580,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-009",
    title: "Vivo TWS Flex",
    description: "Vivo TWS Flex with Flexible Design and Deep Bass.",
    originalPrice: 5999,
    sellingPrice: 5499,
    colors: ["#8A2BE2", "#9932CC", "linear-gradient(45deg, #7B68EE, #6A5ACD)"],
    sizes: {
      Type: "Semi-In-Ear",
      Bluetooth: "5.0",
      Battery: "20 hours with case"
    },
    specifications: {
      drivers: "11mm Drivers",
      mic: "Dual Mic with ENC",
      latency: "95ms Low Latency",
      features: [
        "Deep Bass",
        "Flexible Design",
        "IPX4 Water Resistance",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-flex-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-flex-1.jpg",
      "https://example.com/vivo-tws-flex-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.4,
    reviews: 520,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-010",
    title: "Vivo TWS Lite Pro",
    description: "Vivo TWS Lite Pro with HD Sound and ENC.",
    originalPrice: 6999,
    sellingPrice: 6499,
    colors: ["#FF69B4", "#FF1493", "linear-gradient(45deg, #FF4500, #FF7F50)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.1",
      Battery: "26 hours with case"
    },
    specifications: {
      drivers: "12mm Drivers",
      mic: "Single Mic with ENC",
      latency: "90ms Low Latency",
      features: [
        "HD Sound",
        "Noise Cancellation",
        "Touch Controls",
        "Water Resistance"
      ]
    },
    mainImage: "https://example.com/vivo-tws-lite-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-lite-pro-1.jpg",
      "https://example.com/vivo-tws-lite-pro-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.6,
    reviews: 610,
    stock: 10,
    warranty: "1 Year"
  },
  
  // === More Earbuds ===
  {
    id: "VIVO-EB-011",
    title: "Vivo TWS Boom",
    description: "Vivo TWS Boom with Enhanced Bass and ENC.",
    originalPrice: 7999,
    sellingPrice: 6999,
    colors: ["#000000", "#FFFFFF", "linear-gradient(45deg, #1F1C2C, #928DAB)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.2",
      Battery: "28 hours with case"
    },
    specifications: {
      drivers: "12mm Drivers",
      mic: "Dual Mic with ENC",
      latency: "75ms Ultra Low Latency",
      features: [
        "Enhanced Bass",
        "Touch Controls",
        "IP54 Water Resistance",
        "Fast Charging"
      ]
    },
    mainImage: "https://example.com/vivo-tws-boom-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-boom-1.jpg",
      "https://example.com/vivo-tws-boom-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.7,
    reviews: 750,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-012",
    title: "Vivo TWS Classic",
    description: "Vivo TWS Classic with Comfortable Fit and HD Sound.",
    originalPrice: 5999,
    sellingPrice: 5499,
    colors: ["#8B0000", "#DC143C", "linear-gradient(45deg, #FF4500, #FF7F50)"],
    sizes: {
      Type: "Semi-In-Ear",
      Bluetooth: "5.0",
      Battery: "24 hours with case"
    },
    specifications: {
      drivers: "11mm Drivers",
      mic: "Dual Mic with ENC",
      latency: "90ms Low Latency",
      features: [
        "HD Sound",
        "Touch Controls",
        "IPX4 Water Resistance",
        "Comfortable Fit"
      ]
    },
    mainImage: "https://example.com/vivo-tws-classic-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-classic-1.jpg",
      "https://example.com/vivo-tws-classic-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.5,
    reviews: 680,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-013",
    title: "Vivo TWS Dynamic",
    description: "Vivo TWS Dynamic with High Bass and ENC.",
    originalPrice: 6999,
    sellingPrice: 5999,
    colors: ["#32CD32", "#228B22", "linear-gradient(45deg, #2E8B57, #3CB371)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.1",
      Battery: "22 hours with case"
    },
    specifications: {
      drivers: "13mm Drivers",
      mic: "Dual Mic with ENC",
      latency: "88ms Low Latency",
      features: [
        "High Bass",
        "Touch Controls",
        "Water Resistance",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-dynamic-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-dynamic-1.jpg",
      "https://example.com/vivo-tws-dynamic-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.6,
    reviews: 640,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-014",
    title: "Vivo TWS Plus",
    description: "Vivo TWS Plus with Active Noise Cancellation and HD Sound.",
    originalPrice: 9999,
    sellingPrice: 8999,
    colors: ["#FFA500", "#FF6347", "linear-gradient(45deg, #FF4500, #FF7F50)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.3",
      Battery: "30 hours with case"
    },
    specifications: {
      drivers: "14mm Drivers",
      mic: "Triple Mic with ENC",
      latency: "78ms Low Latency",
      features: [
        "Active Noise Cancellation",
        "HD Sound",
        "Touch Controls",
        "Water Resistance"
      ]
    },
    mainImage: "https://example.com/vivo-tws-plus-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-plus-1.jpg",
      "https://example.com/vivo-tws-plus-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.8,
    reviews: 860,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-EB-015",
    title: "Vivo TWS Ultra",
    description: "Vivo TWS Ultra with Ultra Low Latency and Extended Battery.",
    originalPrice: 11999,
    sellingPrice: 10999,
    colors: ["#1E90FF", "#4682B4", "linear-gradient(45deg, #5F9EA0, #00CED1)"],
    sizes: {
      Type: "In-Ear",
      Bluetooth: "5.3",
      Battery: "40 hours with case"
    },
    specifications: {
      drivers: "15mm Drivers",
      mic: "Triple Mic with ENC",
      latency: "65ms Ultra Low Latency",
      features: [
        "Ultra Low Latency",
        "Extended Battery",
        "HD Sound",
        "Auto Connect"
      ]
    },
    mainImage: "https://example.com/vivo-tws-ultra-main.jpg",
    casualImages: [
      "https://example.com/vivo-tws-ultra-1.jpg",
      "https://example.com/vivo-tws-ultra-2.jpg"
    ],
    category: "Earbuds",
    rating: 4.9,
    reviews: 910,
    stock: 10,
    warranty: "1 Year"
  },
  
  // === Tablets ===
  {
    id: "VIVO-TAB-001",
    title: "Vivo Pad Pro",
    description: "Vivo Pad Pro with Snapdragon 870 and 120Hz Display.",
    originalPrice: 44999,
    sellingPrice: 41999,
    colors: ["#000000", "#FFFFFF", "linear-gradient(45deg, #1F1C2C, #928DAB)"],
    sizes: {
      Display: "12.1-inch, 2560x1600, 120Hz",
      Processor: "Snapdragon 870",
      RAM: "8GB",
      Storage: "256GB"
    },
    specifications: {
      battery: "10000 mAh",
      camera: "13 MP + 8 MP (Rear), 8 MP (Front)",
      features: [
        "120Hz Display",
        "Dolby Vision",
        "Quad Speakers",
        "Stylus Support"
      ]
    },
    mainImage: "https://example.com/vivo-pad-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-pro-1.jpg",
      "https://example.com/vivo-pad-pro-2.jpg"
    ],
    category: "Tablets",
    rating: 4.8,
    reviews: 650,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-002",
    title: "Vivo Pad Air",
    description: "Vivo Pad Air with Snapdragon 695 and Lightweight Design.",
    originalPrice: 34999,
    sellingPrice: 32999,
    colors: ["#1E90FF", "#4682B4", "linear-gradient(45deg, #5F9EA0, #00CED1)"],
    sizes: {
      Display: "11-inch, 2400x1600, 90Hz",
      Processor: "Snapdragon 695",
      RAM: "6GB",
      Storage: "128GB"
    },
    specifications: {
      battery: "8400 mAh",
      camera: "8 MP (Rear), 5 MP (Front)",
      features: [
        "Lightweight Design",
        "90Hz Display",
        "Dual Speakers",
        "Fast Charging"
      ]
    },
    mainImage: "https://example.com/vivo-pad-air-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-air-1.jpg",
      "https://example.com/vivo-pad-air-2.jpg"
    ],
    category: "Tablets",
    rating: 4.6,
    reviews: 520,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-003",
    title: "Vivo Pad Lite",
    description: "Vivo Pad Lite with MediaTek Helio and Compact Design.",
    originalPrice: 24999,
    sellingPrice: 22999,
    colors: ["#32CD32", "#228B22", "linear-gradient(45deg, #2E8B57, #3CB371)"],
    sizes: {
      Display: "10.5-inch, 2000x1200, 60Hz",
      Processor: "MediaTek Helio G90T",
      RAM: "4GB",
      Storage: "64GB"
    },
    specifications: {
      battery: "7000 mAh",
      camera: "5 MP (Rear), 2 MP (Front)",
      features: [
        "Compact Design",
        "Stereo Speakers",
        "Long Battery Life",
        "Face Unlock"
      ]
    },
    mainImage: "https://example.com/vivo-pad-lite-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-lite-1.jpg",
      "https://example.com/vivo-pad-lite-2.jpg"
    ],
    category: "Tablets",
    rating: 4.4,
    reviews: 410,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-004",
    title: "Vivo Pad Max",
    description: "Vivo Pad Max with Snapdragon 8 Gen 1 and 144Hz Display.",
    originalPrice: 59999,
    sellingPrice: 57999,
    colors: ["#8A2BE2", "#9932CC", "linear-gradient(45deg, #7B68EE, #6A5ACD)"],
    sizes: {
      Display: "13-inch, 3000x2000, 144Hz",
      Processor: "Snapdragon 8 Gen 1",
      RAM: "12GB",
      Storage: "512GB"
    },
    specifications: {
      battery: "12000 mAh",
      camera: "16 MP (Rear), 12 MP (Front)",
      features: [
        "144Hz Display",
        "Quad Speakers",
        "Fast Charging",
        "Stylus & Keyboard Support"
      ]
    },
    mainImage: "https://example.com/vivo-pad-max-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-max-1.jpg",
      "https://example.com/vivo-pad-max-2.jpg"
    ],
    category: "Tablets",
    rating: 4.9,
    reviews: 800,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-005",
    title: "Vivo Pad Mini",
    description: "Vivo Pad Mini with Lightweight and Compact Design.",
    originalPrice: 19999,
    sellingPrice: 17999,
    colors: ["#FF69B4", "#FF1493", "linear-gradient(45deg, #FF4500, #FF7F50)"],
    sizes: {
      Display: "8.5-inch, 1600x1200, 60Hz",
      Processor: "MediaTek Helio P60T",
      RAM: "3GB",
      Storage: "32GB"
    },
    specifications: {
      battery: "5100 mAh",
      camera: "5 MP (Rear), 2 MP (Front)",
      features: [
        "Compact Design",
        "Stereo Speakers",
        "Long Battery Life",
        "Face Unlock"
      ]
    },
    mainImage: "https://example.com/vivo-pad-mini-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-mini-1.jpg",
      "https://example.com/vivo-pad-mini-2.jpg"
    ],
    category: "Tablets",
    rating: 4.3,
    reviews: 320,
    stock: 10,
    warranty: "1 Year"
  },
  
  // === More Tablets ===
  {
    id: "VIVO-TAB-006",
    title: "Vivo Pad Ultra",
    description: "Vivo Pad Ultra with 4K Display and Snapdragon 8 Gen 2.",
    originalPrice: 69999,
    sellingPrice: 65999,
    colors: ["#000000", "#1C1C1C", "linear-gradient(45deg, #333333, #4F4F4F)"],
    sizes: {
      Display: "13.3-inch, 3840x2160, 120Hz",
      Processor: "Snapdragon 8 Gen 2",
      RAM: "16GB",
      Storage: "1TB"
    },
    specifications: {
      battery: "12000 mAh",
      camera: "20 MP (Rear), 12 MP (Front)",
      features: [
        "4K Display",
        "HDR10+",
        "Quad Speakers",
        "Stylus & Keyboard Support"
      ]
    },
    mainImage: "https://example.com/vivo-pad-ultra-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-ultra-1.jpg",
      "https://example.com/vivo-pad-ultra-2.jpg"
    ],
    category: "Tablets",
    rating: 4.9,
    reviews: 980,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-007",
    title: "Vivo Pad Max Pro",
    description: "Vivo Pad Max Pro with AMOLED Display and 5G Support.",
    originalPrice: 64999,
    sellingPrice: 59999,
    colors: ["#FF4500", "#FF7F50", "linear-gradient(45deg, #FF8C00, #FFA500)"],
    sizes: {
      Display: "12.9-inch, 3200x1800, 120Hz",
      Processor: "Snapdragon 8+ Gen 1",
      RAM: "12GB",
      Storage: "512GB"
    },
    specifications: {
      battery: "11000 mAh",
      camera: "18 MP (Rear), 10 MP (Front)",
      features: [
        "AMOLED Display",
        "5G Support",
        "Fast Charging",
        "Face Unlock"
      ]
    },
    mainImage: "https://example.com/vivo-pad-max-pro-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-max-pro-1.jpg",
      "https://example.com/vivo-pad-max-pro-2.jpg"
    ],
    category: "Tablets",
    rating: 4.8,
    reviews: 860,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-008",
    title: "Vivo Pad Slim",
    description: "Vivo Pad Slim with Lightweight Build and Fast Charging.",
    originalPrice: 34999,
    sellingPrice: 31999,
    colors: ["#4682B4", "#1E90FF", "linear-gradient(45deg, #00CED1, #5F9EA0)"],
    sizes: {
      Display: "11-inch, 2400x1600, 90Hz",
      Processor: "Snapdragon 778G",
      RAM: "8GB",
      Storage: "256GB"
    },
    specifications: {
      battery: "8800 mAh",
      camera: "12 MP (Rear), 8 MP (Front)",
      features: [
        "Lightweight Build",
        "Stereo Speakers",
        "Fast Charging",
        "Face Unlock"
      ]
    },
    mainImage: "https://example.com/vivo-pad-slim-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-slim-1.jpg",
      "https://example.com/vivo-pad-slim-2.jpg"
    ],
    category: "Tablets",
    rating: 4.7,
    reviews: 720,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-009",
    title: "Vivo Pad Lite Plus",
    description: "Vivo Pad Lite Plus with High-Resolution Display and Long Battery.",
    originalPrice: 27999,
    sellingPrice: 25999,
    colors: ["#32CD32", "#228B22", "linear-gradient(45deg, #2E8B57, #3CB371)"],
    sizes: {
      Display: "10.5-inch, 2000x1200, 60Hz",
      Processor: "MediaTek Dimensity 810",
      RAM: "6GB",
      Storage: "128GB"
    },
    specifications: {
      battery: "7500 mAh",
      camera: "8 MP (Rear), 5 MP (Front)",
      features: [
        "High-Resolution Display",
        "Dual Speakers",
        "Long Battery Life",
        "Face Unlock"
      ]
    },
    mainImage: "https://example.com/vivo-pad-lite-plus-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-lite-plus-1.jpg",
      "https://example.com/vivo-pad-lite-plus-2.jpg"
    ],
    category: "Tablets",
    rating: 4.5,
    reviews: 600,
    stock: 10,
    warranty: "1 Year"
  },
  
  {
    id: "VIVO-TAB-010",
    title: "Vivo Pad Flex",
    description: "Vivo Pad Flex with Foldable Display and 5G Support.",
    originalPrice: 89999,
    sellingPrice: 84999,
    colors: ["#8A2BE2", "#9932CC", "linear-gradient(45deg, #7B68EE, #6A5ACD)"],
    sizes: {
      Display: "13-inch Foldable, 2560x1600, 120Hz",
      Processor: "Snapdragon 8 Gen 2",
      RAM: "16GB",
      Storage: "1TB"
    },
    specifications: {
      battery: "13000 mAh",
      camera: "20 MP (Rear), 12 MP (Front)",
      features: [
        "Foldable Display",
        "5G Support",
        "High-Performance Chipset",
        "Face Unlock"
      ]
    },
    mainImage: "https://example.com/vivo-pad-flex-main.jpg",
    casualImages: [
      "https://example.com/vivo-pad-flex-1.jpg",
      "https://example.com/vivo-pad-flex-2.jpg"
    ],
    category: "Tablets",
    rating: 4.9,
    reviews: 1000,
    stock: 10,
    warranty: "1 Year"
  }
];


export default vivoProducts;
