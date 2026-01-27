## Schema Design in Relational Databases
----------------------------------------------------
### 1. What schema design is and what a database schema represents?
Schema design is the process of planning how data will be stored in a relational database. It defines tables, columns, data types, relationships, and rules for the data.
A database schema is the blueprint or structure of the database. It tells us what kind of data we will store, how tables are connected, and what constraints apply.
Example:
A schema for an e-commerce system may include tables like users, orders, and products, and relationships between them.
-------------------------------------------------------------------------------------------------------------------
### 2. Why schema design is required before writing backend code?
Schema design should be done before backend development because backend code depends on how data is structured.
If the schema is unclear or keeps changing, backend logic like APIs, validations, and queries will also break or need rework.
Example:
If you decide later that email should be unique, you may need to rewrite login logic and clean existing data.
-----------------------------------------------------------------------------------------------------------------
### 3. How poor schema design impacts data consistency, maintenance, and scalability?
Poor schema design can cause many problems:
Data inconsistency: Same data stored in multiple places may not match
Difficult maintenance: Small changes require updates in many tables
Poor scalability: Database becomes slow and hard to extend as data grows
Example:
Storing user address inside every order row can lead to mismatched addresses and large tables.
--------------------------------------------------------------------------------------------------------
### 4. What validations are in schema design and why databases enforce them?
Validations are rules that ensure data correctness at the database level. Databases enforce them so invalid or incomplete data cannot be stored.
Common validations include:
NOT NULL: Column must have a value
UNIQUE: No duplicate values allowed
DEFAULT: Assigns a default value if none is provided
PRIMARY KEY: Uniquely identifies each record
Example:
email TEXT UNIQUE NOT NULL ensures every user has a unique email.
--------------------------------------------------------------------------------------------------------
### 5. Difference between a database schema and a database table
A schema is the overall structure of the database
A table is a single object inside the schema that stores data in rows and columns
Example:
Schema = design of a school system
Table = students table inside that schema
----------------------------------------------------------------------------------------------
### 6. Why a table should represent only one entity?
Each table should represent only one real-world entity to keep data clean and organized. Mixing multiple entities in one table creates confusion and redundancy.
Example:
A users table should not store order details. Orders should be in a separate orders table.
-----------------------------------------------------------------------------------------------------------
### 7. Why redundant or derived data should be avoided in table design?
Redundant data means storing the same information multiple times, which increases storage and causes inconsistencies.
Derived data can be calculated when needed and should not be stored.
Example:
Instead of storing total_price, calculate it from quantity × price.
------------------------------------------------------------------------------------------------------
### 8. Importance of choosing correct data types while designing tables
Choosing correct data types improves performance, accuracy, and storage efficiency.
Example:
Use INTEGER for age, not TEXT
Use TIMESTAMP for dates, not strings
Use BOOLEAN for true/false values
Correct data types also prevent invalid data from being inserted.