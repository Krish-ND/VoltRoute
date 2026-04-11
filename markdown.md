# VoltRoute

### Smart EV Trip Billing, Route Planning & Charging Assistant

**Tagline:**
**Plan smarter EV journeys with accurate cost, battery, and charging intelligence.**

**One-Line Pitch:**
**VoltRoute is a web-based EV travel assistant that helps users plan routes, predict battery usage, discover charging stations, and generate accurate EV trip bills using maps, voice search, and Firebase-powered user workflows.**

---

# 1. Executive Summary

VoltRoute is a smart EV mobility platform designed to simplify electric vehicle travel planning for individual users and future fleet operators. The platform combines **route planning**, **battery estimation**, **charging station discovery**, **trip billing**, **state-wise charging cost logic**, and **voice-enabled interaction** into a single product experience.

The primary users are:

* EV car owners
* EV bike/scooter users
* urban commuters
* intercity travelers
* future delivery and fleet use cases

The platform addresses a critical gap in EV adoption: while EV ownership is increasing, users still face uncertainty around **trip feasibility**, **charging availability**, and **travel cost predictability**.

VoltRoute solves this by allowing users to:

* enter a trip source and destination
* calculate trip distance and energy usage
* predict if the battery is sufficient
* identify charging or battery swap stops
* compare EV travel cost with fuel alternatives
* generate a trip-level cost estimate or bill
* save trips, vehicles, and billing history securely

For a hackathon, VoltRoute is positioned as a **high-utility, high-visibility product** with a clear user problem, a strong technical story, and a credible path to scale.

---

# 2. Problem Statement

Electric vehicle users still face practical travel problems that reduce confidence and convenience, especially for unfamiliar or longer trips.

## Key Pain Points

### 2.1 Charging Uncertainty

Users often do not know:

* where the nearest charging stations are
* whether chargers are available on their route
* whether they need a recharge before reaching destination

### 2.2 Route Anxiety

Standard maps optimize for distance or time, but not necessarily for EV feasibility. Users need routes that also consider:

* battery range
* charger coverage
* safe energy margins

### 2.3 Unknown Travel Cost

Unlike fuel vehicles, EV users often do not know:

* how much charge a trip will consume
* how much a route will cost
* how state-wise unit rates impact charging cost

### 2.4 Poor Charging Visibility

Users need a unified way to discover:

* fast chargers
* standard chargers
* battery swap stations
* fallback fuel stations in city maps

### 2.5 Poor Trip Planning Experience

Most current tools are fragmented:

* one app for maps
* another for chargers
* another for cost calculations
* no consolidated trip bill or EV-focused planning experience

VoltRoute solves these gaps by creating a **single EV-first trip planning workflow**.

---

# 3. Proposed Solution

VoltRoute is designed as an integrated EV trip assistant that helps users make practical travel decisions before starting a journey.

## VoltRoute solves the problem by combining:

* route distance and ETA from map providers
* EV energy consumption calculations
* battery-based trip feasibility checks
* charging and battery swap station discovery
* state-wise cost estimation
* bill generation
* saved vehicles and trip history
* voice-based input for convenience

## Core Product Outcome

A user should be able to answer the following questions in under a minute:

* **Can I reach my destination with current charge?**
* **What route is best for my EV?**
* **Where should I charge on the way?**
* **How much will this trip cost?**
* **How does this compare to petrol or diesel travel?**

This makes VoltRoute useful not just as a calculator, but as a **decision-support platform for EV travel**.

---

# 4. Product Vision

VoltRoute begins as a **hackathon-ready consumer web application**, but it is designed with a larger product vision.

## Long-Term Vision

VoltRoute can evolve into a broader EV mobility intelligence platform for:

* consumers
* delivery networks
* fleet operators
* smart city mobility ecosystems
* charging infrastructure providers

## Long-Term Product Direction

In the future, VoltRoute can support:

* live charger availability
* route-aware charging slot booking
* battery health-aware trip recommendations
* EV fleet optimization
* AI-based travel suggestions
* usage analytics and sustainability reporting

The long-term goal is to become a **trusted EV trip planning and energy intelligence layer**.

---

# 5. Core Objectives

## Product Objectives

* Simplify EV route planning
* Reduce user uncertainty before travel
* Provide accurate trip-level cost estimation
* Improve charging visibility
* Create a user-friendly and reusable travel assistant experience

## Technical Objectives

* Build a scalable web application using modern frontend architecture
* Use Firebase for rapid MVP development and secure user management
* Support modular growth without redesigning the full system later
* Keep the application responsive, secure, and production-oriented
* Enable future integration with live APIs and operational data

---

# 6. Key Features

## 6.1 EV Bill Generation

VoltRoute should generate an estimated or final EV trip bill using:

* total trip distance
* vehicle efficiency
* energy required
* charging rate
* public or home charging mode
* optional station or service fees

### Outputs

* energy needed in kWh
* charging cost
* service charge
* total estimated bill

---

## 6.2 Route Planning

Users can enter:

* source
* destination
* selected vehicle
* current battery percentage

The system should provide:

* route distance
* ETA
* alternate routes
* route preference options:

  * fastest
  * cheapest
  * EV-friendly

---

## 6.3 Battery and Range Prediction

The platform should estimate:

* current usable range
* whether destination is reachable
* how much energy is needed
* whether charging is required en route

---

## 6.4 Charging Station Discovery

The platform should display:

* charging stations along route
* nearby charging stations
* fast chargers
* standard chargers
* battery swap stations
* optional fuel stations in supported city maps

### Filters

* charger type
* connector type
* battery swap availability
* route proximity
* city/state

---

## 6.5 State-Wise Charging Cost Logic

Charging cost should vary based on:

* selected state
* home charging rate
* public charging rate
* optional service surcharge

This improves realism and makes billing more relevant.

---

## 6.6 Metro City Explorer

Users should be able to explore selected city maps and identify:

* EV charging stations
* battery swap stations
* fuel stations

This feature is especially useful for urban travel and demos.

---

## 6.7 EV vs Fuel Comparison

Users should be able to compare:

* EV trip cost
* petrol trip cost
* diesel trip cost

### Outputs

* cost difference
* trip-level savings
* estimated monthly/yearly savings

---

## 6.8 Voice Search

Voice search should support:

* source input
* destination input
* charging station search
* city search
* quick route commands

This improves usability and creates a modern product experience.

---

## 6.9 Authentication

The system should support:

* email/password signup
* email/password login
* Google OAuth login
* forgot password
* email verification
* protected user sessions

---

## 6.10 User Features

Authenticated users should be able to:

* save vehicles
* save planned trips
* view trip history
* view generated bills
* manage account settings

---

## 6.11 Admin Features

Admins should be able to manage:

* charging station records
* state charging rates
* city-level metadata
* usage overview and basic analytics

---

# 7. User Roles

## 7.1 Guest User

A guest user can:

* view landing page and product information
* access login/signup pages
* optionally explore limited demo content
* not save trips or vehicles

---

## 7.2 Authenticated User

An authenticated user can:

* manage personal profile
* add and manage vehicles
* plan trips
* use voice search
* calculate cost and battery usage
* save trips and bills
* view trip history
* compare EV vs fuel costs

---

## 7.3 Admin

An admin can:

* access admin dashboard
* manage charging station data
* manage state charging rates
* manage supported cities
* monitor usage trends and basic system health

---

# 8. User Journeys / User Flow

## 8.1 User Signup / Login Flow

1. User visits the landing page.
2. User clicks **Sign Up** or **Login**.
3. User chooses:

   * email/password signup
   * Google Sign-In
4. Firebase Authentication validates the user.
5. On successful signup, the system creates a Firestore user profile.
6. User is redirected to the dashboard.

---

## 8.2 Add Vehicle Flow

1. User opens **Vehicle Management**.
2. User clicks **Add Vehicle**.
3. User enters:

   * vehicle name
   * type
   * battery capacity
   * efficiency
   * range
   * connector type
4. Vehicle data is saved to Firestore.
5. The vehicle becomes selectable in trip planning.

---

## 8.3 Plan Trip Flow

1. User opens **Trip Planner**.
2. User enters source and destination.
3. User selects a saved vehicle.
4. User enters current battery percentage.
5. User selects route preference.
6. The system fetches route options from map APIs.
7. VoltRoute calculates:

   * distance
   * ETA
   * energy needed
   * estimated cost
8. The user proceeds to route results.

---

## 8.4 Voice Search Flow

1. User taps the microphone icon.
2. Browser voice recognition starts.
3. User speaks a route or location command.
4. Recognized text is placed into the appropriate input field.
5. User confirms or edits the text.
6. The system proceeds with route or station search.

---

## 8.5 Charging Station Discovery Flow

1. User views route results or station explorer.
2. The system loads charging stations near the route or search area.
3. User applies filters:

   * fast charger
   * standard charger
   * battery swap
4. The map and station list update accordingly.

---

## 8.6 Bill Generation Flow

1. User completes route selection.
2. The system calculates energy and cost.
3. User chooses:

   * home charging
   * public charging
4. The bill is generated with breakdown.
5. User can save the bill for later access.

---

## 8.7 Trip History Flow

1. User opens **Trip History**.
2. System loads previous saved trips.
3. User can review:

   * route
   * distance
   * cost
   * bill
4. User can reuse or compare prior trips.

---

## 8.8 Admin Management Flow

1. Admin logs into the admin portal.
2. Admin accesses:

   * station management
   * state rate management
   * city management
3. Admin updates records.
4. Changes are saved to Firestore and reflected in the app.

---

# 9. Page / Screen Breakdown

# Public Pages

## 9.1 Landing Page

### Purpose

Introduce the product and convert visitors into users.

### Key UI Sections

* hero section
* product summary
* feature highlights
* EV vs fuel benefit section
* CTA buttons
* footer

### Key User Actions

* sign up
* log in
* learn more
* try the product

### Important Data Shown

* product capabilities
* value proposition
* simplified usage flow

---

## 9.2 Login Page

### Purpose

Authenticate returning users.

### Key UI Sections

* email/password form
* Google login button
* forgot password link

### Key User Actions

* login via email
* login via Google

### Important Data Shown

* authentication feedback
* error handling

---

## 9.3 Signup Page

### Purpose

Register new users.

### Key UI Sections

* signup form
* password rules
* Google signup option

### Key User Actions

* create account
* continue with Google

### Important Data Shown

* validation messages
* success/verification prompts

---

## 9.4 Forgot Password Page

### Purpose

Allow users to reset credentials securely.

### Key UI Sections

* email input
* reset request button

### Key User Actions

* request password reset email

### Important Data Shown

* confirmation message

---

# Protected User Pages

## 9.5 Dashboard

### Purpose

Serve as the primary user workspace.

### Key UI Sections

* quick trip planner
* saved vehicles summary
* recent trips
* recent bills
* cost summary cards

### Key User Actions

* start a new trip
* manage vehicles
* view saved data

### Important Data Shown

* battery-related quick info
* recent route metrics
* saved user activity

---

## 9.6 Trip Planner

### Purpose

Collect trip inputs and prepare route planning.

### Key UI Sections

* source input
* destination input
* voice search controls
* vehicle selector
* battery percentage input
* route preference selector

### Key User Actions

* enter trip details
* use voice input
* submit route request

### Important Data Shown

* selected vehicle info
* input validation
* route preference state

---

## 9.7 Route Results / Map View

### Purpose

Display route intelligence and trip feasibility.

### Key UI Sections

* route map
* alternate route cards
* route summary
* battery prediction card
* charging suggestions

### Key User Actions

* compare routes
* choose route
* proceed to billing
* explore charging stations

### Important Data Shown

* route distance
* ETA
* energy needed
* estimated cost
* battery sufficiency

---

## 9.8 Charging Stations Explorer

### Purpose

Allow users to discover chargers and swap stations.

### Key UI Sections

* interactive map
* station list
* filters
* search bar
* optional voice search

### Key User Actions

* search stations
* filter stations
* inspect nearby charging options

### Important Data Shown

* station name
* type
* location
* price per unit if available

---

## 9.9 Bill Generator

### Purpose

Present detailed EV trip billing.

### Key UI Sections

* trip summary
* energy calculation
* charging mode selector
* cost breakdown
* total bill summary

### Key User Actions

* generate bill
* save bill
* compare home vs public charging

### Important Data Shown

* unit rate
* kWh used
* service charges
* final total

---

## 9.10 Vehicle Management

### Purpose

Allow users to manage their EV profiles.

### Key UI Sections

* add vehicle form
* saved vehicle cards
* edit/delete controls

### Key User Actions

* add vehicle
* edit vehicle
* set default vehicle

### Important Data Shown

* battery capacity
* range
* efficiency
* connector type

---

## 9.11 Trip History

### Purpose

Allow users to review previous journeys.

### Key UI Sections

* trip cards/table
* filters
* route details preview
* bill links

### Key User Actions

* view previous trips
* inspect costs
* compare past travel

### Important Data Shown

* source/destination
* date
* distance
* cost
* status

---

## 9.12 EV vs Fuel Comparison

### Purpose

Provide comparative cost analysis.

### Key UI Sections

* comparison input form
* results summary
* savings panel

### Key User Actions

* compare trip costs
* simulate monthly/yearly savings

### Important Data Shown

* EV cost
* petrol cost
* diesel cost
* savings values

---

## 9.13 Metro City Explorer

### Purpose

Support city-specific mobility discovery.

### Key UI Sections

* city selector
* layered map
* station category toggles
* city station list

### Key User Actions

* select city
* explore EV stations
* explore fuel stations

### Important Data Shown

* city station density
* map overlays
* nearby infrastructure

---

## 9.14 Profile / Settings

### Purpose

Allow users to manage account preferences.

### Key UI Sections

* profile information
* preferred state
* default vehicle
* account controls

### Key User Actions

* update profile
* change preferences
* logout

### Important Data Shown

* account metadata
* user defaults

---

# Admin Pages

## 9.15 Admin Dashboard

### Purpose

Provide an operational overview.

### Key UI Sections

* metrics cards
* recent activity
* management shortcuts

### Key User Actions

* navigate to admin modules
* review system data

### Important Data Shown

* total users
* total trips
* total stations
* recent updates

---

## 9.16 Station Management

### Purpose

Manage charging station records.

### Key UI Sections

* station table
* add/edit station form
* search and filters

### Key User Actions

* add station
* update station
* deactivate station

### Important Data Shown

* station metadata
* connector types
* city/state

---

## 9.17 State Rate Management

### Purpose

Manage state-wise charging rates.

### Key UI Sections

* state rate list
* add/edit form

### Key User Actions

* update home/public unit rates

### Important Data Shown

* state name
* rate values
* last updated time

---

## 9.18 Analytics

### Purpose

Provide high-level product usage visibility.

### Key UI Sections

* trip statistics
* user activity summaries
* rate usage summaries

### Key User Actions

* review trends
* inspect growth metrics

### Important Data Shown

* usage volume
* route frequency
* charging trends

---

# 10. Functional Requirements

## 10.1 Authentication Module

* The system shall support email/password signup and login.
* The system shall support Google OAuth login.
* The system shall support password reset.
* The system shall support email verification.
* The system shall restrict protected pages to authenticated users.

## 10.2 Vehicle Module

* The system shall allow users to create, update, and delete vehicles.
* The system shall store battery capacity, efficiency, and connector details.
* The system shall allow one vehicle to be set as default.

## 10.3 Trip Planning Module

* The system shall accept source and destination inputs.
* The system shall fetch route distance and ETA.
* The system shall show alternate route options.
* The system shall allow route preference selection.

## 10.4 Battery Prediction Module

* The system shall estimate energy needed for the route.
* The system shall estimate remaining range based on battery input.
* The system shall determine whether the destination is reachable.

## 10.5 Station Discovery Module

* The system shall load charging stations based on location or route.
* The system shall support route-based and city-based station exploration.
* The system shall support charger filtering.

## 10.6 Billing Module

* The system shall generate trip cost estimates.
* The system shall support home and public charging modes.
* The system shall generate a bill record for a saved trip.

## 10.7 History Module

* The system shall save trips and bills.
* The system shall allow users to retrieve prior records.

## 10.8 Admin Module

* The system shall allow admins to manage stations, rates, and city metadata.
* The system shall prevent unauthorized admin access.

---

# 11. Non-Functional Requirements

## 11.1 Scalability

The system should support increasing users, trips, and station records without major redesign.

## 11.2 Reliability

Core user workflows such as authentication, trip planning, and billing should remain stable and recover gracefully from API failures.

## 11.3 Security

User data must be protected through Firebase Authentication, Firestore security rules, and controlled access patterns.

## 11.4 Usability

The interface should be clean, responsive, and intuitive for non-technical users.

## 11.5 Maintainability

The codebase should be modular, typed, and organized for rapid iteration.

## 11.6 Responsiveness

The application should function well across desktop and mobile layouts.

## 11.7 Performance

Common screens and calculations should respond quickly with minimal perceived delay.

---

# 12. Technical Architecture

VoltRoute is designed as a **modern web application** using a frontend-driven architecture with Firebase as the backend platform for identity and persistence.

## 12.1 Frontend Responsibilities

The Next.js frontend is responsible for:

* rendering all user interfaces
* managing page navigation
* collecting user inputs
* calling map and data services
* performing client-safe calculations
* handling protected route rendering
* integrating browser voice search

## 12.2 Firebase Responsibilities

Firebase is responsible for:

* user authentication
* secure session handling
* persistent data storage in Firestore
* optional asset storage
* future server-side task expansion via Cloud Functions

## 12.3 Firestore Usage

Firestore stores:

* user profiles
* saved vehicles
* trips
* trip stops
* charging station metadata
* state charging rates
* bills
* city metadata

## 12.4 Auth Flow

Authentication is handled through Firebase Auth.
After login, the frontend validates the user session and loads the corresponding user document and permissions.

## 12.5 Maps Integration

Google Maps API or Mapbox is used to:

* geocode source and destination
* calculate distance and ETA
* render route maps
* show alternate routes
* place charging and fuel station markers

## 12.6 Voice Search Integration

The browser’s speech recognition API is used to capture spoken location input and convert it to text for search and route planning.

## 12.7 Billing Logic

Billing logic uses:

* route distance
* vehicle efficiency
* battery and energy requirements
* state charging rates
* optional charging mode and service charges

## 12.8 Station Discovery Logic

Station discovery is based on:

* route coordinates
* city filters
* station metadata
* optional charger-type filtering

---

# 13. Firebase Integration Plan

## 13.1 Firebase Authentication

Used for:

* signup
* login
* session management
* Google OAuth
* password reset
* email verification

## 13.2 Firestore

Used for all core application data:

* user profile data
* vehicles
* trips
* charging stations
* rates
* bills

## 13.3 Firebase Storage

Used optionally for:

* user-uploaded profile images
* future invoice exports
* optional station media

## 13.4 Cloud Functions (Optional / Future)

Can be used later for:

* invoice generation
* analytics aggregation
* background notifications
* data validation tasks

## 13.5 Hosting / Deployment

The app can be deployed using:

* Firebase Hosting
* or Vercel for frontend-first deployment

---

# 14. Firestore Database Design

## 14.1 `users`

### Purpose

Stores authenticated user profile and role information.

### Important Fields

* `uid`
* `name`
* `email`
* `photoURL`
* `role`
* `preferredState`
* `defaultVehicleId`
* `createdAt`

### Relationships

* one user can own many vehicles
* one user can create many trips
* one user can have many bills

### Example

```json
{
  "uid": "user_001",
  "name": "Ganesh Raju",
  "email": "ganesh@example.com",
  "photoURL": "",
  "role": "user",
  "preferredState": "Kerala",
  "defaultVehicleId": "vehicle_001",
  "createdAt": "2026-04-08T10:30:00Z"
}
```

---

## 14.2 `vehicles`

### Purpose

Stores EV vehicle profiles per user.

### Important Fields

* `id`
* `userId`
* `vehicleName`
* `vehicleType`
* `batteryCapacity`
* `efficiencyKmPerKwh`
* `fullRangeKm`
* `connectorType`
* `chargingTime`
* `createdAt`

### Relationships

* many vehicles belong to one user
* one vehicle can be used in many trips

### Example

```json
{
  "id": "vehicle_001",
  "userId": "user_001",
  "vehicleName": "Ather 450X",
  "vehicleType": "EV Scooter",
  "batteryCapacity": 3.7,
  "efficiencyKmPerKwh": 32,
  "fullRangeKm": 118,
  "connectorType": "Type 2",
  "chargingTime": "4h",
  "createdAt": "2026-04-08T10:40:00Z"
}
```

---

## 14.3 `trips`

### Purpose

Stores user-planned or completed trips.

### Important Fields

* `id`
* `userId`
* `vehicleId`
* `source`
* `destination`
* `distanceKm`
* `durationMin`
* `batteryStartPercent`
* `batteryEndPercent`
* `energyNeededKwh`
* `estimatedCost`
* `routeType`
* `status`
* `createdAt`

### Relationships

* many trips belong to one user
* one trip can have multiple trip stops
* one trip can have one bill

### Example

```json
{
  "id": "trip_001",
  "userId": "user_001",
  "vehicleId": "vehicle_001",
  "source": "Kochi",
  "destination": "Trivandrum",
  "distanceKm": 210,
  "durationMin": 255,
  "batteryStartPercent": 68,
  "batteryEndPercent": 14,
  "energyNeededKwh": 6.56,
  "estimatedCost": 79,
  "routeType": "ev_friendly",
  "status": "planned",
  "createdAt": "2026-04-08T11:00:00Z"
}
```

---

## 14.4 `tripStops`

### Purpose

Stores charging or battery swap stops linked to trips.

### Important Fields

* `id`
* `tripId`
* `stationId`
* `stopType`
* `energyAddedKwh`
* `estimatedCost`
* `stopDurationMin`

### Relationships

* many trip stops belong to one trip
* one stop references one charging station

### Example

```json
{
  "id": "stop_001",
  "tripId": "trip_001",
  "stationId": "station_003",
  "stopType": "charging",
  "energyAddedKwh": 2.5,
  "estimatedCost": 30,
  "stopDurationMin": 25
}
```

---

## 14.5 `chargingStations`

### Purpose

Stores charging and battery swap station metadata.

### Important Fields

* `id`
* `name`
* `city`
* `state`
* `lat`
* `lng`
* `stationType`
* `connectorTypes`
* `pricePerUnit`
* `isBatterySwapAvailable`
* `isActive`

### Relationships

* one station can appear in many trip stops

### Example

```json
{
  "id": "station_003",
  "name": "ChargeHub Kochi East",
  "city": "Kochi",
  "state": "Kerala",
  "lat": 9.9816,
  "lng": 76.2999,
  "stationType": "Fast Charger",
  "connectorTypes": ["CCS2", "Type2"],
  "pricePerUnit": 12,
  "isBatterySwapAvailable": false,
  "isActive": true
}
```

---

## 14.6 `stateRates`

### Purpose

Stores state-wise electricity charging rates.

### Important Fields

* `id`
* `stateName`
* `homeRatePerUnit`
* `publicRatePerUnit`
* `updatedAt`

### Relationships

* referenced during bill and trip cost calculation

### Example

```json
{
  "id": "kerala",
  "stateName": "Kerala",
  "homeRatePerUnit": 7.5,
  "publicRatePerUnit": 12,
  "updatedAt": "2026-04-08T09:00:00Z"
}
```

---

## 14.7 `bills`

### Purpose

Stores generated trip billing records.

### Important Fields

* `id`
* `tripId`
* `userId`
* `energyUsedKwh`
* `unitRate`
* `chargingCost`
* `serviceFee`
* `totalAmount`
* `invoiceNumber`
* `createdAt`

### Relationships

* one bill belongs to one trip
* one bill belongs to one user

### Example

```json
{
  "id": "bill_001",
  "tripId": "trip_001",
  "userId": "user_001",
  "energyUsedKwh": 6.56,
  "unitRate": 12,
  "chargingCost": 78.72,
  "serviceFee": 10,
  "totalAmount": 88.72,
  "invoiceNumber": "VR-2026-0001",
  "createdAt": "2026-04-08T11:10:00Z"
}
```

---

## 14.8 `cities`

### Purpose

Stores supported metro city metadata for city exploration.

### Important Fields

* `id`
* `cityName`
* `state`
* `isMetroSupported`

### Relationships

* used for city explorer filtering and map support

### Example

```json
{
  "id": "kochi",
  "cityName": "Kochi",
  "state": "Kerala",
  "isMetroSupported": true
}
```

---

# 15. Authentication & Authorization Design

## 15.1 Email/Password Authentication

Users can create accounts and log in using email and password through Firebase Authentication.

## 15.2 Google OAuth Authentication

Users can sign in quickly using Google Sign-In. This improves usability and reduces signup friction.

## 15.3 Email Verification

New email/password users should receive a verification email before full account trust is established.

## 15.4 Forgot Password

Users can request a password reset securely through Firebase.

## 15.5 Protected Routes

Authenticated-only pages should be protected at the frontend route level and validated using the current user session.

## 15.6 Session Handling

The frontend should listen to Firebase auth state changes and load user data accordingly.

## 15.7 Role-Based Access Control

Users should have role-based access via Firestore user metadata.

### Supported Roles

* `user`
* `admin`

Admin routes should not be accessible to standard users.

---

# 16. Security Design

## 16.1 Firestore Security Rules Concept

Each user should only be able to access their own data.

### Examples

* users can read/write only their own profile
* users can manage only their own vehicles, trips, and bills
* admins only can update station and rate collections

## 16.2 Route Protection

Frontend routes must validate user authentication before rendering protected pages.

## 16.3 Input Validation

All major forms should validate:

* source/destination inputs
* battery percentage
* vehicle specs
* cost calculation parameters

Recommended validation libraries:

* Zod
* Yup

## 16.4 Secret / Environment Variable Management

Sensitive keys should be stored in environment variables, not hardcoded.

Examples:

* Firebase config
* Maps API keys
* OAuth configuration

## 16.5 Admin Access Control

Admin features should be protected both:

* in the UI
* in Firestore rules

## 16.6 Abuse Prevention

Recommended controls:

* rate limiting on expensive actions
* form validation
* query scoping
* restricted admin actions

## 16.7 Secure Deployment Practices

Use secure deployment with HTTPS and proper environment separation for development and production.

---

# 17. Voice Search Integration Design

## 17.1 Where Voice Search Will Be Used

Voice search should be available on:

* trip planner source input
* trip planner destination input
* station search
* city search

## 17.2 User Experience

The experience should be simple and predictable:

1. user clicks microphone icon
2. browser starts listening
3. speech is converted to text
4. text is inserted into input field
5. user can edit if needed

## 17.3 Browser Speech Recognition Integration

The app should use the browser’s speech recognition capability through the Web Speech API.

## 17.4 Voice-Based Quick Commands

Examples of supported commands:

* “Plan trip from Kochi to Trivandrum”
* “Find charging stations near Kochi”
* “Show EV stations in Bengaluru”

## 17.5 Limitations and Fallback Handling

Voice recognition can fail due to:

* browser support limitations
* microphone permissions
* noisy environments
* accent interpretation

Fallback behavior should always include manual text input.

---

# 18. Business Logic / Calculation Logic

## 18.1 Energy Needed

### Formula

```text
Energy Needed (kWh) = Distance (km) / Efficiency (km per kWh)
```

### Example

```text
Distance = 210 km
Efficiency = 32 km/kWh

Energy Needed = 210 / 32 = 6.56 kWh
```

---

## 18.2 Remaining Range

### Formula

```text
Remaining Range (km) = (Battery % / 100) × Full Range (km)
```

### Example

```text
Battery = 68%
Full Range = 118 km

Remaining Range = 0.68 × 118 = 80.24 km
```

---

## 18.3 Reachability Check

### Logic

```text
If Remaining Range >= Route Distance → Reachable
If Remaining Range < Route Distance → Charging Required
```

### Example

```text
Remaining Range = 80.24 km
Route Distance = 210 km

Result = Charging Required
```

---

## 18.4 Charging Cost

### Formula

```text
Charging Cost = Energy Needed × Unit Rate
```

### Example

```text
Energy Needed = 6.56 kWh
Unit Rate = ₹12

Charging Cost = 6.56 × 12 = ₹78.72
```

---

## 18.5 Final Bill Generation

### Formula

```text
Total Bill = Charging Cost + Service Fee
```

### Example

```text
Charging Cost = ₹78.72
Service Fee = ₹10

Total Bill = ₹88.72
```

---

## 18.6 EV vs Fuel Comparison

### Fuel Cost Formula

```text
Fuel Cost = Distance / Mileage × Fuel Price
```

### Example (Petrol)

```text
Distance = 210 km
Mileage = 40 km/l
Petrol Price = ₹105/l

Fuel Cost = 210 / 40 × 105 = ₹551.25
```

### Savings Formula

```text
Savings = Fuel Cost - EV Cost
```

### Example

```text
Petrol Cost = ₹551.25
EV Cost = ₹88.72

Savings = ₹462.53
```

---

# 19. API / Service Layer Plan

Even with Firebase, VoltRoute should be designed with a clean service layer.

## 19.1 Auth Service

Responsible for:

* signup
* login
* logout
* session state
* password reset
* Google OAuth
* role lookup

---

## 19.2 Vehicle Service

Responsible for:

* create vehicle
* update vehicle
* delete vehicle
* fetch user vehicles
* set default vehicle

---

## 19.3 Trip Service

Responsible for:

* create trip
* fetch route metadata
* save trip
* retrieve trip history
* fetch trip details

---

## 19.4 Billing Service

Responsible for:

* energy calculations
* cost estimation
* bill creation
* bill retrieval
* EV vs fuel comparisons

---

## 19.5 Station Service

Responsible for:

* route-based station discovery
* nearby station search
* city-based station loading
* charger filtering

---

## 19.6 Voice Search Handler

Responsible for:

* microphone start/stop
* speech recognition parsing
* transcript handling
* input autofill behavior

---

## 19.7 Admin Service

Responsible for:

* station management
* rate management
* city metadata management
* analytics retrieval

---

# 20. Recommended Folder Structure

```text
src/
  app/
    page.tsx
    login/page.tsx
    signup/page.tsx
    forgot-password/page.tsx
    dashboard/page.tsx
    trip-planner/page.tsx
    route-results/page.tsx
    stations/page.tsx
    bill-generator/page.tsx
    vehicles/page.tsx
    trip-history/page.tsx
    cost-comparison/page.tsx
    city-explorer/page.tsx
    profile/page.tsx
    admin/page.tsx
    admin/stations/page.tsx
    admin/rates/page.tsx
    admin/analytics/page.tsx

  components/
    auth/
    dashboard/
    trip/
    maps/
    billing/
    vehicles/
    voice/
    admin/
    ui/

  lib/
    firebase.ts
    auth.ts
    firestore.ts
    maps.ts
    calculations.ts
    voice.ts

  hooks/
    useAuth.ts
    useVoiceSearch.ts
    useTripPlanner.ts

  services/
    authService.ts
    vehicleService.ts
    tripService.ts
    billingService.ts
    stationService.ts
    adminService.ts

  types/
    user.ts
    vehicle.ts
    trip.ts
    bill.ts
    station.ts

  middleware.ts
```

---

# 21. Component Breakdown

## 21.1 Auth Components

* `LoginForm`
* `SignupForm`
* `OAuthButtons`
* `ProtectedRouteWrapper`

## 21.2 Dashboard Components

* `QuickTripCard`
* `RecentTripsCard`
* `VehicleSummaryCard`
* `BillingSummaryCard`

## 21.3 Trip Planning Components

* `SourceInput`
* `DestinationInput`
* `BatteryInput`
* `VehicleSelector`
* `RoutePreferenceSelector`
* `TripSummaryCard`

## 21.4 Map Components

* `RouteMap`
* `RouteAlternativesPanel`
* `ChargingMarkers`
* `FuelStationMarkers`
* `MapLegend`

## 21.5 Billing Components

* `BillSummaryCard`
* `CostBreakdownCard`
* `ChargingModeSelector`
* `ComparisonSummaryCard`

## 21.6 Vehicle Management Components

* `VehicleForm`
* `VehicleCard`
* `RangeEstimator`

## 21.7 Voice Search Components

* `VoiceSearchButton`
* `VoiceStatusIndicator`
* `TranscriptPreview`

## 21.8 Admin Components

* `AdminMetricCard`
* `StationTable`
* `RateTable`
* `AnalyticsSummaryPanel`

---

# 22. Scalability Strategy

VoltRoute should be designed to evolve across multiple stages without forcing a rewrite.

## 22.1 Hackathon MVP

At this stage, the system focuses on:

* single-user route planning
* saved vehicles
* basic charging station logic
* billing
* voice input
* Firebase-based persistence

## 22.2 Startup MVP

At this stage, the platform can add:

* more accurate station metadata
* expanded city support
* better analytics
* invoice exports
* richer trip history

## 22.3 Production System

At this stage, the system can introduce:

* stronger caching
* Cloud Functions for async tasks
* real-time station status integration
* observability and logging
* billing exports and notification systems

## 22.4 Enterprise / Fleet Product

At this stage, VoltRoute can support:

* multiple drivers
* fleet vehicle management
* operational route optimization
* centralized charging strategy
* usage reporting

## 22.5 Technical Scaling Ideas

### Caching

Use caching for:

* frequently accessed stations
* state rates
* repeated route metadata

### Modular Services

Keep logic separated by domain to allow future backend extraction if needed.

### Analytics

Track product usage for:

* trip volume
* route frequency
* charger usage patterns

### Real-Time Updates

Future support can include:

* live station availability
* charging queue estimates
* route disruption handling

### Future APIs

The system can later integrate:

* live charger network APIs
* pricing APIs
* fleet telematics APIs

---

# 23. Future Enhancements

VoltRoute has strong expansion potential.

## Recommended Future Features

* live charger availability
* charging slot booking
* AI-based route recommendation
* fleet management mode
* battery health prediction
* dynamic route optimization
* payment gateway integration
* push/email notifications
* downloadable invoice generation
* charging stop scheduling
* carbon footprint reporting
* smart city EV coverage analytics

---

# 24. Hackathon MVP Scope

This section defines what should actually be built for the hackathon.

## 24.1 Must-Have Features

These should be completed first:

* landing page
* email/password authentication
* Google OAuth login
* dashboard
* vehicle management
* trip planner
* route distance and ETA integration
* battery and energy estimation
* charging station discovery
* EV bill generation
* trip saving to Firestore
* voice search for source/destination

## 24.2 Nice-to-Have Features

These add polish but are not mandatory:

* alternate route comparison
* EV vs fuel comparison page
* metro city explorer
* admin dashboard
* trip history filters
* saved bill view
* station filters

## 24.3 Future Features

These should not block the hackathon build:

* live station availability
* charging booking
* AI assistant
* advanced analytics
* fleet support
* payment workflows
* invoice downloads

## Recommended MVP Principle

For the hackathon, the best strategy is to build **one polished end-to-end flow** instead of many incomplete modules.

### Recommended End-to-End Demo Flow

1. user signs in
2. user adds a vehicle
3. user plans a trip
4. system estimates battery and cost
5. system shows charging stations
6. system generates bill
7. user saves the trip

That is enough to make VoltRoute feel complete and credible.

---

### Step 9 — Save and Review

Show:

* trip saved in history
* bill saved to the user profile
