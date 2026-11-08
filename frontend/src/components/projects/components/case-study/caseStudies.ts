export interface CaseStudy {
  title: string;
  category: string;
  subtitle?: string;
  highlights: { heading: string; text: string }[];
  detailGroups: { heading: string; paragraphs: number[] }[];
}

export const caseStudies = {
  "pytorch": {
    "title": "PyTorch Computer Vision & Tool-Enabled LLM App",
    "category": "COMPUTER VISION / FULL-STACK DEVELOPMENT",
    "highlights": [
      {
        "heading": "Overview",
        "text": "A full-stack computer vision app using PyTorch Faster R-CNN for object detection and Mask R-CNN for instance segmentation, with a Java Spring Boot API, Flask inference service, and TypeScript frontend."
      },
      {
        "heading": "Interaction",
        "text": "LangChain and LangGraph connect a locally hosted Qwen3 LLM to tools for filtering detections, modifying overlays, and seeking through video. Python validates tool calls before execution."
      },
      {
        "heading": "Processing",
        "text": "Video inference runs through an asynchronous job queue, with media and results stored in S3 and job status tracked in DynamoDB. The frontend polls for progress; retries and cached results support repeat requests."
      },
      {
        "heading": "Memory",
        "text": "A Q4_K_M-quantized Qwen3-0.6B model runs on the CPU through llama.cpp. On-demand switching between vision and language models limits memory use, while a disk-backed KV cache avoids reprocessing the shared prompt."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "LLM & Tool Calls",
        "paragraphs": [
          1
        ]
      },
      {
        "heading": "Memory Management",
        "paragraphs": [
          2
        ]
      },
      {
        "heading": "Image & Video Processing",
        "paragraphs": [
          3,
          5
        ]
      },
      {
        "heading": "AWS Architecture",
        "paragraphs": [
          4
        ]
      },
      {
        "heading": "Deployment",
        "paragraphs": [
          6
        ]
      }
    ],
    "subtitle": "Java / Python / TypeScript / LangChain / AWS CDK / GitHub Actions"
  },
  "alpine": {
    "title": "Ski & Rock Climbing E-Commerce Store",
    "category": "E-COMMERCE / FULL-STACK DEVELOPMENT",
    "highlights": [
      {
        "heading": "Overview",
        "text": "A full-stack climbing and ski storefront built with TypeScript, Redux, and a C#/.NET API. Users can search products, submit reviews, manage a cart, and track orders."
      },
      {
        "heading": "Data & authorization",
        "text": "Entity Framework Core models products, orders, reviews, and users in PostgreSQL on AWS RDS. JWT middleware enforces resource ownership, with Google OAuth available for sign-in."
      },
      {
        "heading": "Payments",
        "text": "The PayPal SDK and sandbox accounts simulate checkout. API responses update payment status in PostgreSQL, linking purchases to each user’s order history."
      },
      {
        "heading": "Deployment",
        "text": "GitHub Actions builds Docker images and pushes them to ECR. AWS CDK deploys the Nginx frontend and .NET API together on ECS Fargate."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "Application Architecture",
        "paragraphs": [
          1
        ]
      },
      {
        "heading": "Database Modeling & Migrations",
        "paragraphs": [
          5,
          6
        ]
      },
      {
        "heading": "Payments",
        "paragraphs": [
          4
        ]
      },
      {
        "heading": "Authentication & Authorization",
        "paragraphs": [
          7,
          8
        ]
      },
      {
        "heading": "Deployment & Networking",
        "paragraphs": [
          2,
          3
        ]
      }
    ],
    "subtitle": ".NET / C# / TypeScript / PostgreSQL / AWS CDK / GitHub Actions"
  },
  "kotlin": {
    "title": "Kotlin (Jetpack Compose) - Sacramento City and Flight Search App",
    "category": "MOBILE DEVELOPMENT / JETPACK COMPOSE",
    "highlights": [
      {
        "heading": "Overview",
        "text": "Sacramento City and Flight Search are Kotlin Android applications built for OSU CS 492. Jetpack Compose provides declarative interfaces for browsing recommendations and flight data."
      },
      {
        "heading": "State",
        "text": "ViewModel exposes UI state through Kotlin data classes and retains it across configuration changes. State determines which composable screen is rendered."
      },
      {
        "heading": "Persistence",
        "text": "Flight Search uses SQLite through Room, with DAO-defined SQL queries for database operations. Coroutines keep database work asynchronous and off the main thread."
      },
      {
        "heading": "Interface & source",
        "text": "LazyColumn renders scrolling collections, with Compose modifiers controlling presentation. Flight Search source is public; Sacramento City is shown as a recording under course restrictions."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "Compose Interface",
        "paragraphs": [
          4
        ]
      },
      {
        "heading": "State & Data Models",
        "paragraphs": [
          5,
          6
        ]
      },
      {
        "heading": "Database & Coroutines",
        "paragraphs": [
          3
        ]
      },
      {
        "heading": "Projects & Source Availability",
        "paragraphs": [
          1,
          2
        ]
      }
    ],
    "subtitle": "Kotlin / Jetpack Compose / SQLite / Room"
  },
  "ksp": {
    "title": "C# KSP Automated Scripting - kRPC (Remote Procedure Calls)",
    "category": "SIMULATION / C# SCRIPTING",
    "highlights": [
      {
        "heading": "Overview",
        "text": "A C# scripting experiment that automates rocket launches in Kerbal Space Program through kRPC, connecting external code to the game’s spacecraft controls."
      },
      {
        "heading": "Integration",
        "text": "The kRPC mod runs a server inside the game. External scripts read flight telemetry and send control commands using remote procedure calls."
      },
      {
        "heading": "Flight control",
        "text": "The recorded script automates launch, staging, and the gravity turn as the rocket approaches orbit, applying programming to orbital-mechanics experiments."
      },
      {
        "heading": "Scope",
        "text": "A focused gameplay automation experiment rather than a full game mod. The demonstration shows the script alongside the resulting flight sequence."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview & Scope",
        "paragraphs": [
          0,
          1
        ]
      },
      {
        "heading": "kRPC Integration",
        "paragraphs": [
          2,
          4
        ]
      },
      {
        "heading": "Launch Automation",
        "paragraphs": [
          3
        ]
      }
    ],
    "subtitle": "C# / kRPC"
  },
  "shell": {
    "title": "Small Shell (smallsh) - C Unix Shell",
    "category": "SYSTEMS PROGRAMMING / UNIX",
    "highlights": [
      {
        "heading": "Overview",
        "text": "A C shell built with the Unix process API, supporting interactive commands and non-interactive execution from a file. Parent and child processes handle command execution."
      },
      {
        "heading": "Processes & signals",
        "text": "The shell monitors background processes, reports their exit status and PID, and resumes stopped children with SIGCONT. Signal handling separates shell behavior from child-process behavior."
      },
      {
        "heading": "Expansion",
        "text": "Special parameters expose the shell PID, last foreground exit status, and most recent background process. Named environment variables are expanded before execution."
      },
      {
        "heading": "Input & output",
        "text": "Command-line input is split into tokens. Input, output, and append redirection connect standard streams to files through the <, >, and >> operators."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "Background Processes",
        "paragraphs": [
          1
        ]
      },
      {
        "heading": "Parameter Expansion",
        "paragraphs": [
          2
        ]
      },
      {
        "heading": "Signal Handling",
        "paragraphs": [
          3
        ]
      },
      {
        "heading": "Parsing & Redirection",
        "paragraphs": [
          4
        ]
      }
    ],
    "subtitle": "C / Unix"
  },
  "hash": {
    "title": "Hash Map Data Structure Implementation - Python",
    "category": "DATA STRUCTURES / PYTHON",
    "highlights": [
      {
        "heading": "Overview",
        "text": "Two hash map implementations developed for OSU CS 261, using dynamic arrays with separate collision-resolution strategies: open addressing and separate chaining."
      },
      {
        "heading": "Open addressing",
        "text": "Collisions trigger probing within the underlying array until an available slot is found, keeping key/value entries inside the table itself."
      },
      {
        "heading": "Separate chaining",
        "text": "Each bucket holds a linked list. Keys that hash to the same index are stored as additional nodes in that bucket’s chain."
      },
      {
        "heading": "Complexity",
        "text": "Resizing controls the load factor and collision frequency. With a suitable hash distribution, operations are expected amortized O(1); resizing or pathological collisions can require O(N) work."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "Open Addressing",
        "paragraphs": [
          1
        ]
      },
      {
        "heading": "Separate Chaining",
        "paragraphs": [
          2
        ]
      },
      {
        "heading": "Load Factor & Complexity",
        "paragraphs": [
          3
        ]
      }
    ],
    "subtitle": "Python / pytest"
  },
  "slash": {
    "title": "C++ Unreal Engine Project Slash",
    "category": "GAME DEVELOPMENT / C++",
    "highlights": [
      {
        "heading": "Overview",
        "text": "An in-progress Unreal Engine project based on a Udemy course, exploring C++ gameplay programming, character animation, and combat interactions."
      },
      {
        "heading": "Combat geometry",
        "text": "Dot and cross products determine the direction of weapon impacts relative to an actor. The resulting hit direction selects the appropriate enemy reaction animation."
      },
      {
        "heading": "Animation",
        "text": "Animation state machines use C++ variables exposed to Blueprint. Inverse kinematics adjusts character poses on sloped surfaces, while sockets attach equipped items."
      },
      {
        "heading": "Gameplay interfaces",
        "text": "Weapon box traces detect overlaps and dispatch hit responses through a shared HitInterface. Additional C++ logic handles sphere overlaps and treasure spawning."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "Combat Geometry & Animation",
        "paragraphs": [
          1
        ]
      },
      {
        "heading": "Gameplay Events & State Machines",
        "paragraphs": [
          2
        ]
      },
      {
        "heading": "Hit Interfaces",
        "paragraphs": [
          3
        ]
      }
    ],
    "subtitle": "C++ / Unreal Engine / Blueprint"
  },
  "opengl": {
    "title": "OpenGL C++ Solar System Model",
    "category": "COMPUTER GRAPHICS / C++",
    "highlights": [
      {
        "heading": "Overview",
        "text": "A C++ solar-system model using OpenGL, GLSL vertex and fragment shaders, 8K planet textures, and lighting. The scene includes planets, moons, asteroid belts, and a galaxy skybox."
      },
      {
        "heading": "Rendering",
        "text": "GPU shaders transform vertices and calculate fragment colors. OpenGL display lists reuse stored drawing commands for planet spheres and other scene objects."
      },
      {
        "heading": "Textures",
        "text": "Earth’s surface and cloud textures are blended in the fragment shader. Texture-coordinate offsets animate cloud movement using elapsed time and a sinusoidal function."
      },
      {
        "heading": "Orbits & source",
        "text": "Orbital periods are calculated from orbital radii using Kepler’s third law. Demonstrations are available, but source is withheld under OSU CS 450 course restrictions."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "GPU Shaders",
        "paragraphs": [
          1
        ]
      },
      {
        "heading": "Scene Composition & Display Lists",
        "paragraphs": [
          2
        ]
      },
      {
        "heading": "Cloud Textures",
        "paragraphs": [
          3
        ]
      },
      {
        "heading": "Orbital Mechanics",
        "paragraphs": [
          4
        ]
      }
    ],
    "subtitle": "C++ / OpenGL / GLSL"
  },
  "rsa": {
    "title": "RSA & AES Encryption App",
    "category": "DESKTOP & WEB / CRYPTOGRAPHY",
    "highlights": [
      {
        "heading": "Overview",
        "text": "An Electron and React application for experimenting with RSA and AES text encryption and decryption, available as a desktop executable and web interface."
      },
      {
        "heading": "Encoding",
        "text": "Keys and ciphertext are represented in Base64 so binary cryptographic data can be displayed, copied, and exchanged as text."
      },
      {
        "heading": "Interoperability",
        "text": "OpenSSL CLI tutorials demonstrate workflows compatible with the application, including keeping private keys locally and exchanging encrypted text or files."
      },
      {
        "heading": "Hybrid exchange",
        "text": "A student-developed microservice receives an RSA public key and returns an encrypted AES key plus AES-encrypted text. The application decrypts the key and then the message."
      }
    ],
    "detailGroups": [
      {
        "heading": "Overview",
        "paragraphs": [
          0
        ]
      },
      {
        "heading": "Key & Ciphertext Encoding",
        "paragraphs": [
          1
        ]
      },
      {
        "heading": "OpenSSL Interoperability",
        "paragraphs": [
          2
        ]
      },
      {
        "heading": "Hybrid Key Exchange",
        "paragraphs": [
          3
        ]
      }
    ],
    "subtitle": "Electron.js / React.js"
  }
} satisfies Record<string, CaseStudy>;
