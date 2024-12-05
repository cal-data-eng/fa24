---
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

### Postgres & Homebrew
Homebrew (`brew`) is a package manager for macOS (and Linux) that simplifies the installation of software. You might find brew useful since it can install many different pieces of software.

Checkout [https://brew.sh](https://brew.sh)


However, if you're comfortable with Conda, you can also use that. Otherwise, we tend to find brew to be easier on macOS.
To install PostgreSQL using Homebrew:
* Run the following command in your terminal: `brew install postgresql`
* After installation, you can start the PostgreSQL service with: `brew services start postgresql`
* And stop it with: `brew services stop postgresql`

### Postgres (Mac OS X only)

If you are having trouble with database permissions using a `brew` installation of Postgres, we suggest installing [Postgres.App](https://postgresapp.com/) which is a full-featured application native to Mac OS X only. It installs a simple server (with GUI management) and `psql` program; we recommend uninstalling any existing versions of postgres if you decide to go this route.

### MongoDB

We recommend everyone install MongoDB locally, following their [documentation](https://www.mongodb.com/docs/). Some high-level steps:

Install the Community Edition of Mongo:
* [Install MongoDB CommunityEdition](https://www.mongodb.com/docs/manual/administration/install-community/)
* [Install `mongosh`, the MongoDB shell](https://www.mongodb.com/docs/mongodb-shell/install/)
* Once installed, follow the instructions to run a local Mongo server.
* Then verify that you can connect a Mongo client (e.g., `mongosh`).
* Finally, install needed Python packages (e.g., `pymongo`) if that's what you'll regularly use to execute mongo commands.

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
# Assuming the database mydb exists...
conn = psycopg.connect("postgresql://localhost/mydb")

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
# See also: https://www.postgresql.org/docs/8.1/sql-syntax.html#AEN1368
prepared_statement = "INSERT INTO users (name, age) VALUES (%s, %s)"
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

## Sharing SQL Databases

You will likely find that databases are hard to share among teammates. A few suggestions:
* To make data processing reproducible, maintain a separate notebook/set of scripts that teammates can use to reproduce the same SQL database. This ideally is a separate file from any EDA/task-writing that your team does. It may contain some data wrangling functions needed to load in the same data. You may assume that your teammates have already pre-downloaded in the raw files.
* If you are randomly sampling the data, set a random seed (e.g., in Python) so that anyone who follows the same steps will reproduce the identical set of rows across different tables.
* To make database export/import easy, use `pg_dump` to create a `.sql` file. The below takes a `yelp_db` database exists on your Postgres server and dumps the full database (schema + records) into a file called `yelp.sql`:

    ```
    pg_dump --encoding utf8 yelp_db -f yelp.sql
    ```

    You can then share the `.sql` binary file directly with your teammates. However, this method does not lead to good data provenance (and it also can assume specific features about a given Postgres server setup), so we generally recommend sharing both this binary AND the steps used to recreate the database from raw data files.

## Writing Tips and Compiling PDFs

You are welcome to generate your report PDF in any way you choose.
If you want to write collaboratively, we would personally recommend against
writing in a Jupyter Notebook. However, the very rough markdown file we've
provided should be easy enough to avoid git conflicts.

Otherwise, you are welcome to write in Google Docs or Overleaf / LaTeX if you'd like.

_Remember_: A particular format for your report is **not required**. You do not need to be extra fancy; simply focus on the clarify of your writing.

### Scientific Writing and markdown

So, you've got a Markdown document, how do you render it as a PDF? There's plenty of options! Each tool may be suited to more complex tasks in the long0ryb, but here's a few places to get started.

#### Rendering Markdown with Pandoc or Quarto

[Pandoc][pandoc] is a swiss army knife of document conversion tools, and it's already installed on DataHub.

[pandoc]: https://pandoc.org/getting-started.html#step-6-converting-a-file

* To install pandoc yourself: `brew install pandoc`
* Basic compilation with pandoc: `pandoc file.md -t [format] -o output-filename` where `[format]` is most likely `pdf` for your use cases.
* Don't forget to run `pandoc --help`.

[Quarto][quarto] is another useful tool designed for publishing scientific documents and websites. It can similarly render markdown files to PDFs, and has many themes and advanced styling options,
including the ability to run code in a markdown file and render its outputs in the final PDF.

[quarto]: https://quarto.org/docs/get-started/authoring/vscode.html

* Install quarto: `brew install quarto`
* render markdown to PDF: `quarto render file.md --to pdf`
* Likewise, run `quarto render --help`

### Markdown Guides

If you'd like to learn more about writing Markdown, you can checkout these guides:

* [GitHub Flavored Markdown](https://github.github.com/gfm/)
* [Pandoc's Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown)
* [Quarto's Markdown Guide](https://quarto.org/docs/authoring/markdown-basics.html)

The vast majority of the text you write in markdown will not vary by the tool you use. However, different tools may offer specific features.
