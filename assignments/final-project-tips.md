layout: page
title: Final Project Tips
permalink: /assignments/final-project-tips/
nav_exclude: true
description: >-
    Code Snippets and References for the final project
markdown: kramdown
---

# Final Project Tips and Resources
{:.no_toc}

⚠️ The world of data engineering is vast. We don't have experience with all, or even most of these tools. Part of the goals of this are to help you learn how to learn new tools. This is not an exhaustive guide; but might serve as a useful set of pointers to other tools.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


## Installing Software Locally
We recommend everyone install Postgres locally, following their [documentation](https://www.postgresql.org/docs/).

### Using Homebrew
Homebrew (`brew`) is a package manager for macOS (and Linux) that simplifies the installation of software. You might find brew useful since it can install many different pieces of software.

Checkout [https://brew.sh](https://brew.sh)

However, if you're comfortable with Conda, you can also use that. Otherwise, we tend to find brew to be easier on macOS.

#### Postgres & Homebrew
To install PostgreSQL using Homebrew, run the following command in your terminal:

```sh
brew install postgresql
```

After installation, you can start the PostgreSQL service with:

```sh
brew services start postgresql
```

And stop it with:

```sh
brew services stop postgresql
```

## Non-Relational DBs
- **Cassandra**: A highly scalable, high-performance distributed database designed to handle large amounts of data across many commodity servers. [Documentation](https://cassandra.apache.org/doc/latest/)
- **Redis**: An in-memory key-value store known for its speed and versatility. [Documentation](https://redis.io/documentation)
- **CouchDB**: A database that uses JSON for documents, JavaScript for MapReduce queries, and regular HTTP for an API. [Documentation](https://docs.couchdb.org/en/stable/)
- **Neo4j**: A graph database that uses graph structures for semantic queries with nodes, edges, and properties. [Documentation](https://neo4j.com/docs/)
- **DynamoDB**: A fully managed proprietary NoSQL database service provided by AWS. [Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

## ER Diagrams
### Tools for Creating ER Diagrams

- **Lucidchart**: A web-based diagramming tool that allows you to create ER diagrams and other types of diagrams. [Website](https://www.lucidchart.com/)
- **Freeform App**: A (collaborative) iPad and Mac app which allows you to draw diagrams and take notes. It's not specific to ER diagrams, but there's a good chance you already have it. [Website](https://www.apple.com/freeform/)
- **dbdiagram.io**: An online tool for creating database diagrams by writing code. [Website](https://dbdiagram.io/)

## GitHub & JupyterHub

Because your repository is private, we recommend setting up [SSH][git_ssh] if you are working on JupyterHub.

[git_ssh]: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## Using SQL & Python

Using `psycopg3` to Connect to PostgreSQL, Create a Table, and Insert Data

To interact with PostgreSQL using Python, you can use the `psycopg3` library. Below is a short example demonstrating how to connect to a database, create a table, and insert some data.

First, install the `psycopg3` library if you haven't already:
For more information on `psycopg3`, you can refer to the following resources:

- **Official Documentation**: [psycopg3 Documentation](https://www.psycopg.org/psycopg3/docs/) (Start here!)
- **API Reference**: [psycopg3 API Reference](https://www.psycopg.org/psycopg3/docs/api/)
- **GitHub Repository**: [psycopg3 on GitHub](https://github.com/psycopg/psycopg)
<!-- - **Tutorials and Examples**: [Real Python - PostgreSQL with Python](https://realpython.com/python-postgresql/) -->

```sh
pip install psycopg[binary]
```

Then, use the following Python code:

```python
import psycopg

# Connect to your PostgreSQL database
# Make sure it is already running on your computer.
# (This is done by default on JupyterHub)
conn = psycopg.connect("localhost")

# Create a cursor object
cur = conn.cursor()

# Create a table
cur.execute("""
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INT
  )
""")

# Insert some data into the table
cur.execute("""
  INSERT INTO users (name, age) VALUES
  ('Alice', 30),
  ('Bob', 25),
  ('Charlie', 35)
""")

# Insert data using safe query interpolation
cur.execute(
  "INSERT INTO users (name, age) VALUES (%s, %s)",
  ('David', 28)
)

# Insert data using a prepared statement
# See https://www.postgresql.org/docs/8.1/sql-syntax.html#AEN1368
prepared_statement = "INSERT INTO users (name, age) VALUES ($1, $2)"
cur.execute(prepared_statement, ('Eve', 22))

# Insert data from a list
user_list = [
  ('Frank', 40),
  ('Grace', 29),
  ('Hannah', 33)
]

# Use executemany to insert multiple rows
# This properly escapes quotes, etc.
cur.executemany(
  "INSERT INTO users (name, age) VALUES (%s, %s)",
  user_list
)

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()
```
