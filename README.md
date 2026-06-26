# \# Petrol Pump Dispensing Log Application

# 

# A full-stack web application to log fuel dispensing details at a petrol pump. Authenticated users can add new dispensing records and view a filterable list of all past records.

# 

# \---

# 

# \## Tech Stack

# 

# | Layer    | Technology                          | Why                                                   |

# |----------|-------------------------------------|-------------------------------------------------------|

# | Frontend | Angular 22 (Standalone Components)  | Modern, component-based, excellent TypeScript support |

# | Backend  | ASP.NET Core Web API (.NET 10)      | Robust, high-performance REST API framework           |

# | Database | Microsoft SQL Server                | Required as per specification                         |

# | Auth     | JWT Bearer Tokens                   | Stateless, secure token-based authentication          |

# | ORM      | Entity Framework Core               | Clean database access with code-first migrations      |

# 

# \---

# 

# \## Project Structure

# 

# ```

# petrol-pump-dispensing-log/

# ├── backend/

# │   └── PetrolPump.Api/          # ASP.NET Core Web API

# │       ├── Controllers/          # AuthController, DispensingController

# │       ├── Models/               # DispensingRecord

# │       ├── Data/                 # AppDbContext

# │       └── Migrations/           # EF Core migrations

# └── frontend/

# &#x20;   └── petrol-pump-ui/           # Angular 22 app

# &#x20;       └── src/app/

# &#x20;           ├── components/       # login, entry, listing

# &#x20;           ├── services/         # auth, dispensing

# &#x20;           └── guards/           # auth guard

# ```

# 

# \---

# 

# \## Prerequisites

# 

# \- \[.NET 10 SDK](https://dotnet.microsoft.com/download)

# \- \[Node.js v20+](https://nodejs.org)

# \- Angular CLI: `npm install -g @angular/cli`

# \- Microsoft SQL Server (any edition)

# \- SQL Server Management Studio (optional)

# 

# \---

# 

# \## Setup \& Run Locally

# 

# \### 1. Clone the repository

# 

# ```bash

# git clone https://github.com/Rishi10k/petrol-pump-dispensing-log.git

# cd petrol-pump-dispensing-log

# ```

# 

# \### 2. Backend Setup

# 

# ```bash

# cd backend/PetrolPump.Api

# ```

# 

# Update the connection string in `appsettings.json` to match your SQL Server instance:

# 

# ```json

# "ConnectionStrings": {

# &#x20; "DefaultConnection": "Server=YOUR\_SERVER\_NAME;Database=PetrolPumpDb;Trusted\_Connection=True;TrustServerCertificate=True"

# }

# ```

# 

# Replace `YOUR\_SERVER\_NAME` with your SQL Server instance name (e.g. `LAPTOP-XXXXX` or `localhost`).

# 

# Run migrations to create the database:

# 

# ```bash

# dotnet ef database update

# ```

# 

# Start the API:

# 

# ```bash

# dotnet run

# ```

# 

# API runs at: `https://localhost:7068`

# 

# \### 3. Frontend Setup

# 

# ```bash

# cd frontend/petrol-pump-ui

# npm install

# ng serve

# ```

# 

# Frontend runs at: `http://localhost:4200`

# 

# \---

# 

# \## Login Credentials

# 

# ```

# Username: admin

# Password: admin123

# ```

