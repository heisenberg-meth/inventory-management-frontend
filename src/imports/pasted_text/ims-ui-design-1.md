Design a complete Inventory Management System (IMS) web app UI with the following exact specifications:

---

DESIGN SYSTEM:
- Color palette: Dark teal + mint green
- Primary background: #0a1f18
- Sidebar background: #0d2b1f
- Card/surface background: #0f3326
- Secondary surface: #123b2d
- Accent/mint: #1db97a
- Mint hover: #17a068
- Mint glow (transparent): rgba(29,185,122,0.15)
- Hero gradient: linear from #0f6644 to #1db97a
- Text primary: #e8f7f0
- Text secondary: #7ecfaa
- Text muted: #3d7a62
- Border: rgba(29,185,122,0.12)
- Amber warning: #f59e0b
- Red danger: #ef4444
- Blue info: #38bdf8
- Font: Inter (300, 400, 500, 600, 700)
- Border radius: 12px for cards, 8px for buttons/inputs, 20px for badges
- Card border: 1px solid rgba(29,185,122,0.12)

LIGHT MODE VARIANT:
- Background: #eaf7f2
- Sidebar: #ffffff
- Surface: #ffffff
- Text: #0a2318

---

GLOBAL LAYOUT (applies to all screens):
- Left sidebar: 228px wide, dark teal background #0d2b1f
- Sidebar logo area: "Inventory Management" with mint green box icon
- Sidebar nav sections with uppercase muted labels: HOME / INVENTORY / SALES / PURCHASES / REPORTS / SETTINGS
- Nav items: icon + label, active state = full mint #1db97a pill with white text and bullet dot on right
- Nav items: Home, Overview, AI Dashboard, Analytics | Products, Categories, Item Groups, Composite Items, Price Lists, Stock Adjustments, Warehouses, Stock Transfers, Low Stock Alerts (red badge) | Customers, Sales Orders, Shipments, Invoices, Payments Received | Suppliers, Purchase Orders, Bills | Reports, Activity Log | Users & Roles, Settings
- Bottom of sidebar: user avatar card with name, role
- Top navbar: global search bar (⌘K), tenant switcher pill with red "production" badge, notification bell with red dot, light/dark toggle, user avatar dropdown
- All screens share this sidebar + topbar shell

---

SCREEN 1 — HOME DASHBOARD (Tenant):
- Full-width hero banner with mint gradient, welcome message, 4 quick action buttons: New Product, New Order, New Invoice, New Customer
- Amber alert bar below hero: "7 products expiring within 30 days"
- 4 metric cards in a row: Total Products (1,284), Low Stock Items (23, amber), Today's Revenue (₹48,290), Pending Orders (6, red)
- Each metric card: colored icon box, large number, label, colored change indicator
- 2-column grid below: left = Weekly Sales bar chart (7 bars, mint colored, Mon–Sun), right = Stock Levels with 4 horizontal progress bars (mint/amber/red based on %)
- 2-column grid below: left = Recent Orders table (Order ID, Type badge, Amount, Status badge), right = Recent Activity list with colored dot indicators and timestamps

---

SCREEN 2 — PRODUCT MANAGEMENT:
- Page title + subtitle, "+ Add Product" and "Import CSV" buttons top right
- 4 stat chips: Total Products, Active, Low Stock, Expiring Soon
- Toolbar row: search input, Category filter dropdown, Status filter dropdown, Sort dropdown, Export button
- Full-width data table with columns: Checkbox, Product (icon + name + category), Batch No., Category, Price, Stock (mini progress bar + number), Expiry Date, Status badge, Actions (edit/view/delete icons)
- Status badges: Active (mint), Low Stock (amber), Out of Stock (red), Expiring (red)
- Table rows: 8 sample pharmacy products with realistic medicine names
- Pagination bar at bottom
- "+ Add Product" modal overlay: form fields for Product Name, Category, Price, Unit, Initial Stock, Low Stock Threshold, and a special "Pharmacy Domain Fields" section (mint tinted bg) with Batch Number + Expiry Date fields

---

SCREEN 3 — STOCK MANAGEMENT:
- Page title, "New Adjustment" and "Stock Transfer" buttons
- 4 metric chips: Total Stock Value, Items In Today, Items Out Today, Adjustments This Week
- Tabs: All Movements | Stock In | Stock Out | Adjustments | Transfers
- Data table: Date, Product, Type badge (IN/OUT/ADJUSTMENT), Quantity, Before/After stock, Reference, Done By, Actions
- Right sidebar panel (300px): Stock Summary card with donut chart (In Stock / Low Stock / Out of Stock), Top Low Stock Items list with progress bars, Quick Reorder button

---

SCREEN 4 — ORDERS & BILLING:
- Tabs across top: All Orders | Sales Orders | Purchase Orders | Invoices | Payments
- Summary metric row: Total Orders, Pending, Completed, Overdue (red)
- Large data table: Order ID, Type, Customer/Supplier, Date, Items count, Amount, Status badge, Actions
- "New Order" button opens a slide-in drawer panel from right: Order Type toggle (Sale/Purchase), Customer/Supplier search, Add Products section (search + quantity), Order summary with subtotal/tax/total, Generate Invoice button

---

SCREEN 5 — REPORTS:
- Page title "Reports", subtitle "Detailed analytics and insights"
- Filter tabs: All | Inventory | Sales | Purchases | Receivables | Payables
- 3-column card grid, each report card has: mint icon, Report name (bold), description, category badge, "Last run" timestamp, "Run Report" button
- Report cards: Inventory Valuation Summary, Stock Summary, Sales by Customer, Sales by Item, Purchase by Vendor, Inventory Aging, Receivables Summary, Payables Summary, Profit & Loss, Activity Log
- Featured Analytics section below: large area chart for Sales Trend (last 30 days, mint line), smaller bar chart for Top Products by Revenue

---

SCREEN 6 — RBAC / USER MANAGEMENT:
- Page title "Users & Roles", subtitle
- Two sections side by side: Users list (left, wider) and Roles panel (right)
- Users table: Avatar + Name + Email, Role badge, Status (Active/Inactive), Last Login, Actions
- Role badges color coded: Root (red), Platform Admin (amber), Tenant Admin (mint), Manager (blue), Staff (gray)
- Roles panel: list of all 6 roles (Root, Platform Admin, Support Admin, Tenant Admin, Manager, Staff) with description and permission count, "+ Add Role" button
- "Invite User" modal: Email input, Role selector dropdown with role descriptions, Send Invite button

---

SCREEN 7 — SUPER ADMIN PLATFORM DASHBOARD:
- Different sidebar label: "PLATFORM ADMIN" in mint
- Metrics: Total Tenants, Active Tenants, Total Revenue (MRR), Support Tickets
- Tenants table: Tenant name, Business Type badge (Pharmacy/Supermarket/Warehouse/Retail), Plan badge (Free/Pro/Enterprise), Status, Users count, Last Active, Actions (View/Suspend)
- Platform Activity chart: line graph showing tenant signups over last 6 months
- Right panel: Plan distribution donut chart, Recent Support Tickets list

---

SCREEN 8 — LOGIN SCREEN:
- Dark teal full-page background #0a1f18 with subtle radial mint glow behind the card
- Center card: "Inventory Management" title + "Secure Identity Gateway" subtitle
- "Online" status pill with mint dot
- Auth method tabs: Biometric | Password | 2FA
- Form fields: Email, Password, Role selector dropdown
- "Remember me" toggle + "Forgot password?" link in mint
- Large mint CTA button "Sign In" full width
- Footer: "Secured by multi-factor authentication"

---

DESIGN RULES:
- Every screen uses the same sidebar + topbar shell
- Dark teal depth: bg → sidebar → cards (3 levels of darkness)
- All interactive elements use mint #1db97a as accent
- Badges always use pill shape (border-radius 20px)
- Tables have alternating hover state using surface2 #123b2d
- All modals/drawers have dark teal background with mint border
- Icons are minimal line-style, mint colored
- Use Inter font throughout
- Maintain 8px grid spacing system
- Card padding: 16px, Section gap: 14px
- Deliver each screen as a separate frame at 1440x900
- Also create a component library frame with: color swatches, typography scale, button variants, badge variants, input states, nav item states, metric card variants