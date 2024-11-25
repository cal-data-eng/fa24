---
layout: page
title: Assignment Tips
permalink: /assignment-tips/
nav_exclude: false
nav_order: 5
description: >-
    PostgreSQL and jupysql tips
markdown: kramdown
---

<!-- TODO: The Ed URL should be a site variable. -->
[pg_current]: https://www.postgresql.org/docs/current/index.html
[pg_v14]: https://www.postgresql.org/docs/14/index.html
[jupysql_docs]: https://jupysql.ploomber.io/en/latest/
[psql_docs]: https://www.postgresql.org/docs/14/app-psql.html
[ed_url]: https://edstem.org/us/courses/43068/discussion/

# {{page.title}}

{:.no_toc .text-delta}
Author: Lisa Yan, Michael Ball, Rebecca Dang
Last updated: October 25, 2024 (Fall 2024)

Quick links:
* [Final Project Tips]({{site.baseurl}}/assignments/final-project-tips)

Jump to:
1. TOC
{:toc}

<br>

In most of this course, you will use DataHub to work on projects. PostgreSQL has a few quirks with DataHub that will be covered in this document. However, we strongly encourage you to check out the documentation as you work:
* The official [PostgreSQL v14 documentation][pg_v14]{:target="\_blank"} is great and can even be read cover-to-cover.
* The `jupysql` [documentation][jupysql_docs]{:target="\_blank"} is the primary way you will be writing SQL commands for homework submission.

Please see our policies on [collaboration]({{ site.baseurl }}/syllabus/#collaboration-and-integrity) before working with any study groups.

## DataHub

### Working with Jupyter Notebooks

If you are new to using Jupyter Notebooks, please see the first lab assignment of Data 100 ([course website](https://ds100.org/){:target="\_blank"}). Data 101 assignments work very similarly;
there are local and hidden autograder tests, the latter of which are run after you submit your assignment through Gradescope.

**Reminder about adding new cells**:
If you would like to add new cells, always do so **before** the cell in which you end up writing your answer. Failure to do so may break the auto-grader.

###  JupyterHub Keyboard Shortcuts

First, to enter shortcut mode/exit editing mode, press `Esc`. This will then enable you to use any of the below keyboard shortcuts.

|Operation|Keys|
|---|---|
|To enter shortcut mode/exit editing mode|`Esc`|
|Enter edit mode | `Enter`|
|Insert cell above|`A`|
|Insert cell below|`B`|
|Delete selected cell|`D` + `D` (Press `D` twice)|
|Undo cell operation|`Z`|
|Copy cell|`C`|
|Paste cell|`V`|
|Paste cell above|`Shift` + `V`|
|Redo|`Ctrl` + `Shift` + `Z`|
|Undo|`Ctrl` + `Z`|

### Navigating Long Notebooks

JupyterLab includes an automatic table of contents on the left-hand controls that you can use to quickly jump to different sections of a notebook.

<img src="{{ site.baseurl }}/assets/images/notebook-toc.png" width="300px" alt="Click on the 3 lines to show the table of contents" />

### Split-screen Setup

**Want to splitscreen your JupyterHub?** Simply drag a tab over to a different side of your JupyterHub. We recommend splitting your screen with your Jupyter notebook in one window, and a psql terminal in another window, like so (note these are two separate connections to the database!):

<img src="{{ site.baseurl }}/assets/images/splitscreen.png"
     alt="Split Screen of DataHub"
     style="float: center; margin-right: 10px; width: 800px" />

### Help! Why is my DataHub so slow?

If you are encountering any of the following issues:

* Your SQL queries are taking a long time to run
* Your SQL queries fail with `No space left on device`
* Your DataHub is slow or unresponsive
* Your browser window becomes slow or laggy

Then, you may have *run out of disk or memory space* on your DataHub server. Here is a list of things you can do to fix this:

1. **Restart your current Jupyter kernel**. To do so, go to Kernel -> Restart Kernel and clear outputs of all cells. Then, refresh the page or navigate back to [https://data101.datahub.berkeley.edu](https://data101.datahub.berkeley.edu/){:target="\_blank"}.

1. **Check your display limits**. If your row display limit is unbounded, then your notebook will crash. Clear all cell output and insert a cell close to the top of the notebook that sets the display limit to a more reasonable size, like `%config SqlMagic.displaylimit = 50`

1. **Clear (all) cell outputs** to reduce the amount of text your browser needs to load/render. In general, the total amount of content in a notebook can contribute to it feeling slow to navigate. If you see a lot of log output, for example, you can right click on the cell and clear just that cell's output.

  1. **Close Unneeded Files & Notebooks**. Even files that aren't actively displayed can have an impact on your current session. If you find yourself needing to jump between two tabs within JupyterLab, it may be more stable to open two _browser_ tabs. (The best experience depends highly on the specifics of your browser, computer's memory and other settings.)

1. **Close all Jupyter kernels** other than the one that you are currently working on. To do so, go to the left sidebar and click on the stop button (dark circle with a light inscribed square). Go to Kernels, hover over each item, and hit the X button. Or, click "Shut Down All" with all notebooks still open, then manually start your kernel in the desired notebook.

1. **Run [`VACUUM FULL`](https://www.postgresql.org/docs/current/sql-vacuum.html).** This command will instruct PostgreSQL to try to reclaim some space. To do so, run `!psql postgresql://jovyan@127.0.0.1:5432/imdb -c 'VACUUM FULL'`
  * If your notebook is already unresponsive, you can run this command in a terminal window instead. To do so, go to File -> New -> Terminal. Then, run type `psql postgresql://jovyan@127.0.0.1:5432/imdb -c 'VACUUM FULL'` (notice that we don't need to type `!` in the terminal).

1.  **Drop and re-create your database.** To do so, run the database setup commands in the beginning of your project notebook that includes the `DROP DATABASE` and `CREATE DATABASE` commands.

    To find out the **size of all current databases**, run

      * In Jupyter notebook: `!psql postgresql://jovyan@127.0.0.1:5432/ -c '\l+'`
      * In a Terminal outside of a psql session: `!psql postgresql://jovyan@127.0.0.1:5432/ -c '\l+'`
      * In an active psql session: `\l+`

    If you are unable to drop the database, it might be because you have other open connections to the database. Run the below to **terminate all other connections** (replace `imdb` with your database name):

      * In Jupyter Notebook, make a new cell. Make sure you replace the syntax with the desired database (e.g., below it is `imdb`) `!psql postgresql://jovyan@127.0.0.1:5432/imdb -c 'SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE datname = current_database()  AND pid <> pg_backend_pid();'`
      * In `psql`, run the following command. Make sure you are conneted to the target database first.
        * To connect to `imdb` and delete all other `imdb` connections, use the meta-command `\c imdb`.
        * Then, run `SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE datname = current_database()  AND pid <> pg_backend_pid();`

1. **Restart your DataHub server.** To do so, go to File -> Hub Control Panel -> Stop My Server. Then, refresh the page or navigate back to [https://data101.datahub.berkeley.edu](https://data101.datahub.berkeley.edu/){:target="\_blank"}.

1. **Restart your Web Browser**. Sometimes, simply refreshing a browser tab can improve performance. However, completely quitting your browser can force it to clear up memory and release additional resources. If you don't wish to close all tabs, then closing a tab (or window) and making a new one can also help with performance problems.

1. If none of the above work, please post on [Ed][ed_url]{:target="\_blank"} with the following information:
  * Your DataHub username (your @berkeley.edu name)
  * The project you are working on
  * The output of the following commands:
    * `!df -h`
    * `!free -h`
    * `!psql -c 'SELECT pg_size_pretty(pg_database_size(current_database()))'`

### Help! I can't export my notebook to a PDF

If you are running the `grader.export(...)` cell and you receive an error that looks similar to `LatexFailed: PDF creating failed, captured latex output` which is preventing you from exporting your Jupyter notebook to a PDF, this is likely because there are unescaped LaTeX special characters (such as `\`, `{`, `}`, `_`) in your notebook. Things you can do to troubleshoot:

- Read the *entire* error message carefully. It is probably very long, but somewhere in the message it will say which text in your notebook is causing the error. Here is an example excerpt from an error message:
```
! Undefined control sequence.
l.349 ...r materialized view is much smaller\faster
                                                   than for
?
! Emergency stop.
l.349 ...r materialized view is much smaller\faster
                                                   than for
```
  - The special character `\` is reserved in LaTeX and caused the issue in this case. To fix this, use `/` instead.
- Make sure that the cells you made or modified are Markdown or Code cells, rather than Raw cells. You can change the type of your cell by clicking on the cell to select it, and then clicking on the dropdown at the top of your notebook to change the cell type.

## Jupysql: PostgreSQL via ipython magic

### What is line/cell magic?

Before getting started, read about line magic (``%``) and cell magic (``%%``) [on TutorialsPoint](https://www.tutorialspoint.com/jupyter/ipython_magic_commands.htm){: target="\_blank"}. These commands will be used extensively in this project and future projects to aid us in running SQL queries.

In Jupyter Notebooks, a [cell 'magic' command](https://ipython.readthedocs.io/en/stable/interactive/magics.html) is a special command that is preceded by two percentage signs (%%). Cell magics operate on entire cells and are used to change the behavior of the entire cell. They are not part of the Python language itself but are specific to the Jupyter environment. They help us do a lot of cool things, like run SQL commands directly within Jupyter! For some questions with cell magic, we will be saving the literal query string with [query snippets](https://jupysql.ploomber.io/en/latest/api/magic-snippets.html) using `--save`, as illustrated below:

```
%%sql --save query_result <<
SELECT * FROM table ...
```

To call SQL commands, we use the Python package `jupysql`. We strongly recommend you check out the [`jupysql` documentation][jupysql_docs]{:target="\_blank"}. It has a lot of hidden gems!

To load jupysql, run:

``%load_ext sql``

You will often seen this written as the following, which lets you reload the extension multiple times if there is an issue.

``%reload_ext sql``

### Making SQL queries in jupysql

Here are the two ways of writing a SQL query and storing the query result into a Python variable `result`:
- Single-line magic: `result = %sql SELECT * FROM table ...`
- Multi-line cell magic:

```sql
%%sql result <<
SELECT *
FROM table ...
```

<!--
For some questions with multi-line cell magic, we will also be saving the literal query string with [query snippets](https://jupysql.ploomber.io/en/latest/api/magic-snippets.html) using `--save`:

``%%sql --save query result << select * FROM table ...``
-->

### Opening a database connection

Before running any SQL queries, you must have a working connection to a database on a Postgres server. It usually looks something like this, which connects to the Postgres server (at the local IP address, using the user `jovyan`) and the database `imdb`.

  ``%sql postgresql://jovyan@127.0.0.1:5432/imdb``

### Closing a database connection

You may sometimes wnat to close the database connection, in case you want to delete your database and start from a new copy. To close the connection, you can either restart your kernel or explicitly run the following in its own cell:

  ``%sql --close postgresql://jovyan@127.0.0.1:5432/imdb``

  If that's not working, see the bottom of this page for how to relaunch your DataHub instance.

## `psql`, The PostgresSQL Interactive CLI

The `psql` program is the PostgreSQL _interpreter_ and CLI, or Command-Line Interface. Knowing `psql` is very useful to understand what your database looks like, execute meta-commands, and explore quick queries.

Just like when you type `python` in a Terminal, `psql`'s primary use is interactively run queries and commands against a database.

### Open a Terminal in DataHub

To open a Terminal in DataHub, Navigate to Data101's DataHub, then go to File → New → Terminal. **Note**: Do not open a Terminal on your local machine; it does not know how to connect to DataHub's server, much less your DataHub's Postgres server!

### Opening a database connection

Use either command to connect to the `imdb` database, if it has been created:

```bash
psql postgresql://127.0.0.1:5432/imdb
```
```
psql -h localhost -d imdb
```

If no database has been created:
* You will likely get this error:
`psql: error: connection to server at '127.0.0.1', port 5432 failed: FATAL:  database "imdb" does not exist"`
* In this case, you can still connect to the server and list databases, etc., as follows:

  ```bash
  psql -h localhost
  ```
* However, you won't be able to see any relations, because this default connection cannot access what's in `imdb`.
* To create the `imdb` database, see the corresponding Jupyter notebook and run the cells that contain commands such as `CREATE DATABASE`. For Fall 2024, `imdb` is created in the Project 1 notebook. You may which to run `createdb -h localhost [dbname]` to make a new, empty database.

### Closing a database connection
`\q`: This exits out of the `psql` program and also closes your current connections.

`\c <databasename>`: This keeps your `psql` client open, closes your current database conection, and opens a connection to `<databasename>`.

### `psql` Meta-commands

psql meta-commands doc: [list][psql_docs]

|Meta-Command| Description|
|---|---|
| `\?`		| Help |
| `\l`|  Lists databases |
| `\d` | Lists relations |
| `\d tablename`			| List schema of the relation `tablename`. |
| `\q`		| Quit psql |
| `\x auto` | Expanded view of records. To toggle off, `\x off`. |

**Making queries**: You can write queries in `psql`! To write queries that span multiple lines, simply use the newline key (i.e., `<Return>`). However, to execute a query in `psql`, you must use the **semicolon**. This is generally good style, anyway!

**Display screen**: If a query's result will span more than the available display screen, `psql` will launch a different display screen. You can navigate this screen by pressing `<space>`, `<return>` to display more, up/down arrows to scroll up and down, or use the `page up`/`page down` keys, and `q` to exit the query view.

### Terminal commands

Here are some Terminal shortcuts to help you better navigate `psql`. (These commands are standard across all Unix terminal envrionments, including macOS.)

{: .table }
| **Keys** | Description |
|:---:|:---|
| <kbd>^ c</kbd> | Cancel current operation |
| <kbd>^ a</kbd> | Jump to beginning of line |
| <kbd>^ e</kbd> | Jump to end of line |
| <kbd>^ left</kbd> | Jump to previous word |
| <kbd>^ right</kbd> | Jump to next word |
| <kbd>space</kbd> | If currently exploring a query result, see more of the result. |
| <kbd>q</kbd> | If currently exploring a query result, exit from the result. |

<kbd>^</kbd> is the symbol for the `control` key.

## PostgreSQL details

### Postgres Connection URLs

Throughout this course you will see a number of ways to connect to a database server. These connection strings are like URLs, but won't work in a web browser. Instead tools like SQLAlchemy in Python (and others in Ruby, Java, etc.) use the same URL format to establish a connection to a database server, whether it's on a local machine or connected to the internet.

[uri]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier

Consider the following:

```
postgresql://jovyan@127.0.0.1:5432/imdb
```

This has the following components:

```
[db driver]://[username][:password]@[server address][:port]/[database name]
```

In many cases, parts of these connection URIs, like the port, username, or database can ommitted if using the defaults.

#### CLI Connection Arguments

All of the default tools like `psql`, `createdb`, `dropdb`, that come with a PostgreSQL installation, and many other tools allow you to specify the connection more explicitly, which can be convenient when using the command line.

This is the equivalent to the previous URL method:

```bash
psql -h localhost -d imdb
```

{: .note }
> * `psql -h localhost -d imdb -U jovyan -p 5432` would be equivalent to passing all of the arguments in the connection URL.
> * On DataHub, you will always need to specify `-h localhost` to connect to the locally running server.
> * Passing `-d` is usually done for convenience, but is not required. In this case you will not be connected to a specific database.
> * `-U` will default to `joyvan` on DataHub, but is otherwise the current user.
> * `-p` has a default value of 5432 for Postgres.

Try running `psql --help` for more explanation. (Outside of this class, you may find the need to provide a password, especially when connecting to a remote server.)

### DataHub's local PostgreSQL Server

Every time you want to work with a database, you need to connect to a _database server_. On the Data101 DataHub, a Postgres server is automatically started in the background:

```
postgresql://jovyan@127.0.0.1:5432/imdb
```

* connect using `postgresql` as the database driver
* connect using JupyterHub username `joyvan` (why is the default username? see here [Jupyter](https://github.com/jupyter/docker-stacks/issues/358), [JupyterHub](https://github.com/jupyterhub/repo2docker/issues/366))
* `127.0.0.1` is a ["loopback" IP][loopback_ip] address representing the current machine, which is also mapped to hostname `localhost`.
* connect to the database `imdb` on this server. Note that if the `imdb` database has not yet been created, this connection may fail.

[loopback_ip]: https://datatracker.ietf.org/doc/html/rfc6890#section-2.2.2

### Catalog, Schema, Relation/Table, etc.

* StackOverflow: [Catalog, Schema, Relation/Table differences](https://stackoverflow.com/questions/7022755/whats-the-difference-between-a-catalog-and-a-schema-in-a-relational-database)

* `pg_toast`: TOAST storage schema [documentation 73.2](https://www.postgresql.org/docs/current/storage-toast.html)
* `pg_catalog`: System catalog schema [documentation 5.9.5](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-CATALOG)

## Local Setup

While you are welcome to set up everything locally, when grading we will assume that your submission was developed on DataHub. If you would like to develop locally, please make sure you have the following installed:

* `otter-grader==5.1.3`
* `jupysql==0.10.0`
* `pgspecial=1.13.1`
* `psycopg==3.2.1`
* `mongodb`
* PostgreSQL server. For Mac, you can use [Postgres.app](https://postgresapp.com/){: target=\_blank}, or [homebrow][brew_pg] (`brew install postgresql`).

[brew_pg]: https://formulae.brew.sh/formula/postgresql@16

Either way, we recommend you always work on DataHub, as staff will not be able to debug/support local setup issues.

## MongoDB debugging

To prevent bracket mismatches while creating your queries, it is recommended to turn on "Auto Close Brackets" via Settings in JupyterHub. Furthermore, since we are using Python dictionaries as our query filter, make sure to wrap all keys and values inside quotes.
